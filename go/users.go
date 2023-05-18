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

type ErrorResponse struct {
	Message string `json:"message"`
}

func CreateUser(c echo.Context) error {
	rq := CreateUserRequest{}

	err := c.Bind(&rq)
	if err != nil {
		return c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Bad request"})
	}

	row := db.QueryRow("SELECT UserID FROM Users WHERE UserName = ?", rq.UserName)
	id := 0

	err = row.Scan(&id)

	if err == nil {
		return c.JSON(http.StatusNotAcceptable, ErrorResponse{Message: "Username is taken"})
	}

	password := hashPassword(rq.UserPassword)
	row2, err2 := db.Exec("INSERT INTO Users(UserName, UserEmail, UserPassword) VALUES (?, ?, ?);", rq.UserName, rq.UserEmail, password)

	if err2 != nil {
		fmt.Println("INSERT INTO Users failed:", err2)
		return c.NoContent(http.StatusInternalServerError)
	}

	user, err := row2.LastInsertId()
	if err != nil {
		return err
	}

	_, err2 = db.Exec("INSERT INTO UserPrivileges(UserID, PrivilegeID) VALUES (?, 1);", user)
	if err2 != nil {
		fmt.Println("INSERT INTO UserPrivileges failed:", err2)
		return c.NoContent(http.StatusInternalServerError)
	}

	_, err2 = db.Exec("INSERT INTO UserDokiThemes(UserID, ThemeID) VALUES (?, 1);", user)
	if err2 != nil {
		fmt.Println("INSERT INTO UserDokiThemes failed:", err2)
		return c.NoContent(http.StatusInternalServerError)
	}

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

func UserFinished(c echo.Context) error {
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

	rows, err := db.Query("SELECT e.AnimeID, MAX(p.Seen) FROM UserAnimeProgress p JOIN Episodes e ON p.EpisodeID = e.EpisodeID WHERE p.UserID = ? AND p.Progress = 2 GROUP BY e.AnimeID HAVING COUNT(e.EpisodeID) = (SELECT COUNT(EpisodeID) FROM Episodes e2 WHERE e2.AnimeID = e.AnimeID) ORDER BY 2 DESC;", id)
	animes := []AnimeWached{}
	for rows.Next() {
		AnimeID := 0
		Watched := AnimeWached{}
		err = rows.Scan(&AnimeID, &Watched.Watched)
		if err != nil {
			return err
		}

		Watched.WatchedAnime, err = GetAnime(AnimeID)
		if err != nil {
			return err
		}

		animes = append(animes, Watched)
	}

	return c.JSON(http.StatusOK, animes)
}

func UserWatched(c echo.Context) error {
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

	rows, err := db.Query("WITH cte AS ( SELECT AnimeID, EpisodeNr, EpisodeID, (SELECT p.EntryID FROM UserAnimeProgress p WHERE p.UserID = ? AND p.EpisodeID = e1.EpisodeID LIMIT 1) AS 'EntryID', (SELECT p.Progress FROM UserAnimeProgress p WHERE p.UserID = ? AND p.EpisodeID = e1.EpisodeID LIMIT 1) AS 'AnimeProgress' FROM Episodes e1 WHERE (SELECT COUNT(e2.EpisodeID) FROM UserAnimeProgress p2 JOIN Episodes e2 ON p2.EpisodeID = e2.EpisodeID WHERE p2.UserID = ? AND p2.Progress = 2 AND e1.AnimeID = e2.AnimeID) > 0 HAVING AnimeProgress = 1 OR AnimeProgress IS NULL ORDER BY e1.AnimeID, e1.EpisodeNr) SELECT AnimeID, EpisodeNr, Seen FROM cte c LEFT JOIN UserAnimeProgress p ON c.EpisodeID = p.EpisodeID WHERE p.EntryID = c.EntryID OR c.EntryID IS NULL GROUP BY AnimeID ORDER BY Seen DESC;", id, id, id)
	animes := []AnimeWached{}
	for rows.Next() {
		Watched := AnimeWached{}
		AnimeID := 0
		err = rows.Scan(&AnimeID, &Watched.WatchedEp, &Watched.Watched)
		if err != nil {
			return err
		}

		Watched.WatchedAnime, err = GetAnime(AnimeID)
		if err != nil {
			return err
		}

		animes = append(animes, Watched)
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
		_, err = db.Exec("DELETE FROM UserReactions WHERE EntryID = ?;", id)
		if err != nil {
			return err
		}

		_, err = db.Exec("DELETE FROM ChatEntry WHERE EntryID = ?;", id)
		if err != nil {
			return err
		}
	}

	return c.NoContent(http.StatusOK)
}

func UserCommentReact(c echo.Context) error {
	rq := UserCommentReactRequest{}

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
	_, err = db.Exec("DELETE FROM UserReactions WHERE UserID = ? AND EntryID = ?;", id, rq.CommentID)
	if err != nil {
		return err
	}

	if rq.Reaction == -1 {
		_, err = db.Exec("INSERT INTO UserReactions(UserID, EntryID, ReactionType) VALUES (?, ?, 1);", id, rq.CommentID)
		if err != nil {
			return err
		}
	} else if rq.Reaction == 0 {
	} else if rq.Reaction == 1 {
		_, err = db.Exec("INSERT INTO UserReactions(UserID, EntryID, ReactionType) VALUES (?, ?, 0);", id, rq.CommentID)
		if err != nil {
			return err
		}
	} else {
		c.NoContent(http.StatusBadRequest)
	}

	return c.NoContent(http.StatusOK)
}

func UserCommentGetReactions(c echo.Context) error {
	rq := UserAuth{}

	err := c.Bind(&rq)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	row := db.QueryRow("SELECT UserID FROM UserAuth WHERE Token = ?;", rq.Token)
	id := 0

	err = row.Scan(&id)
	if err != nil {
		return c.JSON(http.StatusOK, []CommentReaction{})
	}

	res := []CommentReaction{}

	rows, err := db.Query("SELECT EntryID, ReactionType FROM UserReactions WHERE UserID = ?;", id)
	if err != nil {
		return err
	}

	for rows.Next() {
		entry := CommentReaction{}
		err = rows.Scan(&entry.CommentID, &entry.Reaction)
		if err != nil {
			return err
		}

		res = append(res, entry)
	}

	return c.JSON(http.StatusOK, res)
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

		reaction_rows, err := db.Query("SELECT COUNT(ReactionID), ReactionType FROM UserReactions WHERE EntryID = ? GROUP BY ReactionType;", entry.EntryID)
		if err != nil {
			return comments, err
		}
		for reaction_rows.Next() {
			votes := 0
			votetype := 0
			err = reaction_rows.Scan(&votes, &votetype)
			if err != nil {
				return comments, err
			}

			if votetype == 1 {
				entry.Downvotes = votes
			} else {
				entry.Upvotes = votes
			}
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
			_, err = db.Exec("INSERT INTO UserAnimeProgress(UserID, EpisodeID, Progress, Seen) VALUES (?, ?, 1, ?);", id, ep_id, time.Now())
			if err != nil {
				return err
			}
		} else if rq.Mode == 1 && progress == 1 {
			_, err = db.Exec("UPDATE UserAnimeProgress SET Progress = 2, Seen = ? WHERE UserID = ? AND EpisodeID = ?;", time.Now(), id, ep_id)
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

func GetUserTheme(c echo.Context) error {
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

	res := UserTheme{}
	theme_id := 0

	row = db.QueryRow("SELECT ThemeID, BgPosterLeft, BgPosterRight FROM UserDokiThemes WHERE UserID = ?;", id)
	err = row.Scan(&theme_id, &res.LeftImgUrl, &res.RightImgUrl)
	if err != nil {
		return err
	}

	row = db.QueryRow("SELECT * FROM DokiThemes WHERE ThemeID = ?;", theme_id)
	err = row.Scan(&theme_id, &res.BaseColor, &res.BgColor, &res.BgColorDark, &res.BgColorTheme, &res.BgColorTilted, &res.BtnHoverColor, &res.BtnHoverTextColor, &res.FgColor, &res.FgColorDark, &res.TextColor, &res.TextColorDark, &res.TextColorTilted)
	if err != nil {
		return err
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
