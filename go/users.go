package main

import (
	// "database/sql"

	"fmt"
	"net/http"

	cryptorand "crypto/rand"
	"crypto/sha256"
	"encoding/hex"

	"github.com/labstack/echo/v4"
)

// Convert password to hex sha256
func hashPassword(password string) string {
	hashed_passwd := sha256.Sum256([]byte(password))
	return hex.EncodeToString(hashed_passwd[:])
}

// Generate a 255-char (127B) authentication token
func generateToken() string {
	buffer := [127]byte{}
	cryptorand.Read(buffer[:])
	return hex.EncodeToString(buffer[:])
}

func CreateUser(c echo.Context) error {
	rq := CreateUserRequest{}

	err := c.Bind(&rq)
	if err != nil {
		fmt.Println("Bad request")
		return c.NoContent(http.StatusBadRequest)
	}

	row := db.QueryRow("SELECT UserID FROM Users WHERE UserName = ?", rq.UserName)
	id := 0

	err = row.Scan(&id)

	if err == nil {
		fmt.Println("User exists")
		return c.NoContent(http.StatusNotAcceptable)
	}

	password := hashPassword(rq.UserPassword)
	row2, err2 := db.Exec("INSERT INTO Users(UserName, UserEmail, UserPassword) VALUES (?, ?, ?);", rq.UserName, rq.UserEmail, password)

	if err2 != nil {
		fmt.Println("User cannot be created:", err2)
		return c.NoContent(http.StatusInternalServerError)
	}
	row2.RowsAffected()

	user := db.QueryRow("SELECT UserID FROM Users ORDER BY UserID DESC LIMIT 1")

	user.Scan(&id)

	row2, err2 = db.Exec("INSERT INTO UserPrivileges(UserID, PrivilegeID) VALUES (?, 1);", id)

	return c.NoContent(http.StatusAccepted)
}

func LoginUser(c echo.Context) error {
	rq := LoginUserRequest{}

	err := c.Bind(&rq)
	if err != nil {
		fmt.Println("Bad request")
		return c.NoContent(http.StatusBadRequest)
	}

	password := hashPassword(rq.UserPassword)
	row := db.QueryRow("SELECT UserID FROM Users WHERE UserName = ? AND UserPassword = ?", rq.UserName, password)

	id := 0

	err = row.Scan(&id)
	if err != nil {
		fmt.Println("Can't find valid user:", password, err)
		return c.NoContent(http.StatusNotAcceptable)
	}

	// Doing insert first because it's not possible to fail this statement
	// when run from a GUI.
	auth := UserAuth{id, generateToken()}
	_, err = db.Exec("INSERT INTO UserAuth(UserID, Token) VALUES (?, ?);", id, auth.Token)
	if err != nil {
		// Row probably exists, try select it
		// FIXME: TOCTOU here, because user may logout already (small chance, and
		// 		  shouldn't be exploitable)
		fmt.Println("Session already exists, getting its token")
		row = db.QueryRow("SELECT UserID, Token FROM UserAuth WHERE UserID = ?;", id)
		err = row.Scan(&auth.UserID, &auth.Token)
		if err != nil {
			fmt.Println("Failed to auth user:", err)
			return c.NoContent(http.StatusInternalServerError)
		}
	}
	return c.JSON(http.StatusAccepted, auth)
}

func AuthUser(c echo.Context) error {
	rq := UserAuthRequest{}

	err := c.Bind(&rq)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	row := db.QueryRow("SELECT UserID FROM UserAuth WHERE Token = ?", rq.Token)
	id := 0

	err = row.Scan(&id)
	if err != nil {
		return c.NoContent(http.StatusNotAcceptable)
	}

	rows, err := db.Query("SELECT PrivilegeID FROM UserPrivileges WHERE UserID = ?", id)
	if err != nil {
		return c.NoContent(http.StatusNotAcceptable)
	}

	for rows.Next() {
		privID := 0
		err := rows.Scan(&privID)
		if err != nil {
			return c.NoContent(http.StatusNotAcceptable)
		}

		row = db.QueryRow("SELECT PrivilegeName FROM Privileges WHERE Privileges = ?", privID)

		privilege := ""
		row.Scan(&privilege)

		if privilege == rq.Privilege {
			return c.NoContent(http.StatusAccepted)
		}
	}

	return c.NoContent(http.StatusNotAcceptable)
}

func ChangeUserInfo(c echo.Context) error {
	rq := ChangeUserRequest{}

	err := c.Bind(&rq)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	row := db.QueryRow("SELECT UserID FROM UserAuth WHERE Token = ?", rq.Token)
	id := 0

	err = row.Scan(&id)
	if err != nil {
		return c.NoContent(http.StatusNotAcceptable)
	}

	if rq.UserPassword != "" {
		password := hashPassword(rq.UserPassword)
		res, err := db.Exec("UPDATE Users SET UserName = ?, UserEmail = ?, UserPassword = ?, UserProfileImageUrl = ?, UserProfileImagePoster = ? WHERE UserID = ?;", rq.UserName, rq.UserEmail, password, rq.UserProfileImageUrl, rq.UserProfileImagePoster, id)

		if err != nil {
			return c.NoContent(http.StatusNotAcceptable)
		}

		res.RowsAffected()
	} else {
		res, err := db.Exec("UPDATE Users SET UserName = ?, UserEmail = ?, UserProfileImageUrl = ?, UserProfileImagePoster = ? WHERE UserID = ?;", rq.UserName, rq.UserEmail, rq.UserProfileImageUrl, rq.UserProfileImagePoster, id)

		if err != nil {
			return c.NoContent(http.StatusNotAcceptable)
		}

		res.RowsAffected()
	}

	return c.NoContent(http.StatusNotAcceptable)
}

func LogoutUser(c echo.Context) error {
	rq := UserAuth{}

	err := c.Bind(&rq)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	_, err = db.Exec("DELETE FROM UserAuth WHERE UserID = ? AND Token = ?;", rq.UserID, rq.Token)

	if err != nil {
		return c.NoContent(http.StatusNotAcceptable)
	}

	return c.NoContent(http.StatusAccepted)
}

func ClearTokens() error {
	row, err := db.Exec("DELETE FROM UserAuth WHERE 1;")
	row.RowsAffected()
	return err
}

func UserInfo(c echo.Context) error {
	rq := UserAuth{}
	err := c.Bind(&rq)
	if err != nil {
		return err
	}

	row := db.QueryRow("SELECT UserName, UserEmail, UserProfileImageUrl, UserProfileImagePoster FROM Users WHERE UserID = ?;", rq.UserID)

	res := UserRequest{}

	err = row.Scan(&res.UserName, &res.UserEmail, &res.UserProfileImageUrl, &res.UserProfileImagePoster)

	if err != nil {
		fmt.Printf("Failed to get user info for UserID=%d: %s\n", rq.UserID, err)
		return c.NoContent(http.StatusNotAcceptable)
	}

	return c.JSON(http.StatusAccepted, res)
}
