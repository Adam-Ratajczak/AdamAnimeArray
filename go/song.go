package main

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func song(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	row := db.QueryRow("SELECT * FROM Songs WHERE SongID = ?", id)
	song := Song{}
	err = row.Scan(&song.SongID, &song.AnimeID, &song.Title, &song.Artist, &song.Type, &song.SpotifyURL)
	if err != nil {
		if err == sql.ErrNoRows {
			return c.NoContent(http.StatusBadRequest)
		}
		return err
	}
	return c.JSON(http.StatusOK, song)
}
