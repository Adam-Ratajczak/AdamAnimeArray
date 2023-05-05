package main

import (
	// "database/sql"

	"fmt"
	"net/http"
	"strconv"
	"time"

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

func UserWatchlist(c echo.Context) error {
	rq := UserAuth{}

	err := c.Bind(&rq)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	row := db.QueryRow("SELECT UserID FROM UserAuth WHERE Token = ?;", rq.Token)
	id := 0

	err = row.Scan(&id)
	if err != nil {
		return c.NoContent(http.StatusNotAcceptable)
	}

	rows, err := db.Query("SELECT AnimeID FROM UserSavedAnimes WHERE UserID = ?;", id)
	animes := []Anime{}
	for rows.Next() {
		AnimeID := 0
		err = rows.Scan(&AnimeID)
		if err != nil {
			return err
		}

		anime, err := GetAnime(AnimeID)
		if err != nil {
			return err
		}

		animes = append(animes, anime)
	}

	return c.JSON(http.StatusOK, animes)
}

func UserWatchlistAdd(c echo.Context) error {
	rq := AnimeUserRequest{}

	err := c.Bind(&rq)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	row := db.QueryRow("SELECT UserID FROM UserAuth WHERE Token = ?;", rq.Token)
	id := 0

	err = row.Scan(&id)
	if err != nil {
		return c.NoContent(http.StatusNotAcceptable)
	}

	row = db.QueryRow("SELECT AnimeID FROM UserSavedAnimes WHERE UserID = ? AND AnimeID = ?;", id, rq.AnimeID)
	AnimeID := 0

	err = row.Scan(&AnimeID)
	if err == nil {
		return c.NoContent(http.StatusConflict)
	}

	_, err = db.Exec("INSERT INTO UserSavedAnimes(UserID, AnimeID) VALUES (?, ?);", id, rq.AnimeID)
	if err != nil {
		return err
	}

	return c.NoContent(http.StatusOK)
}

func UserWatchlistRem(c echo.Context) error {
	rq := AnimeUserRequest{}

	err := c.Bind(&rq)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	row := db.QueryRow("SELECT UserID FROM UserAuth WHERE Token = ?;", rq.Token)
	id := 0

	err = row.Scan(&id)
	if err != nil {
		return c.NoContent(http.StatusNotAcceptable)
	}

	_, err = db.Exec("DELETE FROM UserSavedAnimes WHERE USERID = ? AND AnimeID = ?;", id, rq.AnimeID)
	if err != nil {
		return err
	}

	return c.NoContent(http.StatusOK)
}

func UserCommentAnime(c echo.Context) error {
	rq := UserCommentRequest{}

	err := c.Bind(&rq)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	row := db.QueryRow("SELECT UserID FROM UserAuth WHERE Token = ?;", rq.Token)
	id := 0

	err = row.Scan(&id)
	if err != nil {
		return c.NoContent(http.StatusNotAcceptable)
	}

	_, err = db.Exec("INSERT INTO ChatEntry(UserID, AnimeID, OtherID, CommentText, Submitted) VALUES (?, ?, ?, ?, ?);", id, rq.AnimeID, rq.OtherID, rq.CommentText, time.Now())
	if err != nil {
		return err
	}

	return c.NoContent(http.StatusOK)
}

func delComments(anime_id int, ids []int) ([]int, error) {
	rows, err := db.Query("SELECT EntryID FROM ChatEntry WHERE AnimeID = ? AND OtherID = ?;", anime_id, ids[len(ids)-1])
	if err != nil {
		return ids, err
	}

	for rows.Next() {
		id := 0
		err = rows.Scan(&id)
		ids = append(ids, id)
		ids, err = delComments(anime_id, ids)
		if err != nil {
			return ids, err
		}
	}

	return ids, nil
}

func UserCommentDel(c echo.Context) error {
	rq := UserCommentDelRequest{}

	err := c.Bind(&rq)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	row := db.QueryRow("SELECT UserID FROM UserAuth WHERE Token = ?;", rq.Token)
	id := 0

	err = row.Scan(&id)
	if err != nil {
		return c.NoContent(http.StatusNotAcceptable)
	}

	row = db.QueryRow("SELECT EntryID FROM ChatEntry WHERE UserID = ?;", id)
	err = row.Scan(&id)
	if err != nil {
		return c.NoContent(http.StatusNotAcceptable)
	}

	ids, err := delComments(rq.AnimeID, []int{rq.CommentID})
	if err != nil {
		return err
	}

	for _, id := range ids {
		_, err := db.Exec("DELETE FROM ChatEntry WHERE EntryID = ?;", id)
		if err != nil {
			return err
		}
	}

	return c.NoContent(http.StatusOK)
}

func getComments(id, reply int) ([]UserComment, error) {
	comments := []UserComment{}
	rows, err := db.Query("SELECT EntryID, UserID, AnimeID, CommentText, Submitted FROM ChatEntry WHERE AnimeID = ? AND OtherID = ? ORDER BY Submitted DESC;", id, reply)
	if err != nil {
		return comments, err
	}

	for rows.Next() {
		entry := UserComment{}
		err = rows.Scan(&entry.EntryID, &entry.User.UserID, &entry.AnimeID, &entry.CommentText, &entry.Submitted)
		entry.Replies, err = getComments(id, entry.EntryID)
		if err != nil {
			return comments, err
		}

		row := db.QueryRow("SELECT UserName, UserProfileImageUrl FROM Users WHERE UserID = ?;", entry.User.UserID)
		err = row.Scan(&entry.User.UserName, &entry.User.UserProfileImageUrl)
		if err != nil {
			return comments, err
		}

		comments = append(comments, entry)
	}

	return comments, nil
}

func UserCommentList(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	comments, err := getComments(id, 0)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, comments)
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
		return c.NoContent(http.StatusNotAcceptable)
	}

	return c.JSON(http.StatusAccepted, res)
}

func UserProgress(c echo.Context) error {
	rq := UserProgressRequest{}
	err := c.Bind(&rq)
	if err != nil {
		return err
	}
	row := db.QueryRow("SELECT UserID FROM UserAuth WHERE Token = ?;", rq.Token)
	id := 0

	err = row.Scan(&id)
	if err != nil {
		return c.NoContent(http.StatusNotAcceptable)
	}

	row = db.QueryRow("SELECT EpisodeID FROM Episodes WHERE AnimeID = ? AND EpisodeNr = ?;", rq.AnimeID, rq.EpNum)
	ep_id := 0

	err = row.Scan(&ep_id)
	if err != nil {
		return err
	}

	row = db.QueryRow("SELECT Progress FROM UserAnimeProgress WHERE UserID = ? AND EpisodeID = ?;", id, ep_id)
	progress := 0
	err = row.Scan(&progress)
	if err != nil {
		progress = 0
	}

	if rq.Mode > 1 {
		return c.NoContent(http.StatusBadRequest)
	}

	if rq.Mode == progress {
		if rq.Mode == 0 && progress == 0 {
			_, err = db.Exec("INSERT INTO UserAnimeProgress(UserID, EpisodeID, Progress) VALUES (?, ?, 1);", id, ep_id)
			if err != nil {
				return err
			}
		} else if rq.Mode == 1 && progress == 1 {
			_, err = db.Exec("UPDATE UserAnimeProgress SET Progress = 2 WHERE UserID = ? AND EpisodeID = ?;", id, ep_id)
			if err != nil {
				return err
			}
		}
	} else {
		return c.NoContent(http.StatusAlreadyReported)
	}

	return c.NoContent(http.StatusOK)
}

func DeleteAnimeProgress(c echo.Context) error {
	rq := AnimeUserRequest{}
	err := c.Bind(&rq)
	if err != nil {
		return err
	}
	row := db.QueryRow("SELECT UserID FROM UserAuth WHERE Token = ?;", rq.Token)
	id := 0

	err = row.Scan(&id)
	if err != nil {
		return c.NoContent(http.StatusNotAcceptable)
	}

	_, err = db.Exec("DELETE FROM UserAnimeProgress WHERE EpisodeID IN (SELECT EpisodeID FROM Episodes WHERE AnimeID = ?);", rq.AnimeID)
	if err != nil {
		return err
	}

	return c.NoContent(http.StatusOK)
}

func GetAnimeProgress(c echo.Context) error {
	rq := AnimeUserRequest{}
	err := c.Bind(&rq)
	if err != nil {
		return err
	}
	row := db.QueryRow("SELECT UserID FROM UserAuth WHERE Token = ?;", rq.Token)
	id := 0

	err = row.Scan(&id)
	if err != nil {
		return c.NoContent(http.StatusNotAcceptable)
	}

	rows, err := db.Query("SELECT EpisodeID FROM Episodes WHERE AnimeID = ? ORDER BY EpisodeNr;", rq.AnimeID)
	if err != nil {
		return err
	}

	res := []int{}

	for rows.Next() {
		ep_id := 0

		err = rows.Scan(&ep_id)

		row = db.QueryRow("SELECT Progress FROM UserAnimeProgress WHERE UserID = ? AND EpisodeID = ?;", id, ep_id)
		progress := 0
		err = row.Scan(&progress)
		if err != nil {
			progress = 0
		}

		res = append(res, progress)
	}

	return c.JSON(http.StatusOK, res)
}

func UserBasicInfo(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	row := db.QueryRow("SELECT UserID, UserName, UserProfileImageUrl FROM Users WHERE UserID = ?;", id)

	res := BasicUserInfo{}

	err = row.Scan(&res.UserID, &res.UserName, &res.UserProfileImageUrl)

	if err != nil {
		fmt.Println(err)
		return c.NoContent(http.StatusNoContent)
	}

	return c.JSON(http.StatusOK, res)
}

func UsersBasicInfo(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	rows, err := db.Query("SELECT UserID, UserName, UserProfileImageUrl FROM Users WHERE UserID = ?;", id)
	if err != nil {
		return err
	}

	res := []BasicUserInfo{}

	for rows.Next() {

	}

	return c.JSON(http.StatusOK, res)
}
