package main

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func get_song(id int) (Song, error) {
	row := db.QueryRow("SELECT * FROM Songs WHERE SongID = ?", id)
	song := Song{}
	song.Players = []SongPlayer{}
	err := row.Scan(&song.SongID, &song.Title, &song.Artist, &song.Type)
	if err != nil {
		return song, err
	}

	rows, err := db.Query("SELECT Source, PlayerUrl FROM SongPlayers WHERE SongID = ?", id)
	if err != nil {
		return song, err
	}

	for rows.Next() {
		p := SongPlayer{}
		err = rows.Scan(&p.Source, &p.PlayerUrl)

		if err != nil {
			return song, err
		}

		song.Players = append(song.Players, p)
	}

	return song, nil
}

func song(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	song, err := get_song(id)
	if err != nil {
		if err == sql.ErrNoRows {
			return c.NoContent(http.StatusBadRequest)
		}
		return err
	}
	return c.JSON(http.StatusOK, song)
}

func songs(c echo.Context) error {
	songs := []Song{}
	rows, err := db.Query("SELECT SongID FROM Songs")
	if err != nil {
		return err
	}

	for rows.Next() {
		id := 0
		err = rows.Scan(&id)
		if err != nil {
			return err
		}

		song, err := get_song(id)

		if err != nil {
			return err
		}

		songs = append(songs, song)
	}
	return c.JSON(http.StatusOK, songs)
}
