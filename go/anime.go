package main

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func anime(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	anime := Anime{}
	row := db.QueryRow("SELECT * FROM Animes WHERE AnimeID = ?", id)
	err = row.Scan(&anime.AnimeID, &anime.AnimeTitle, &anime.AnimeDesc, &anime.TypeID, &anime.AiredBegin, &anime.AiredEnd, &anime.Premiered, &anime.Duration, &anime.PosterURL)
	if err != nil {
		if err == sql.ErrNoRows {
			return c.NoContent(http.StatusBadRequest)
		}
		return err
	}
	return c.JSON(http.StatusOK, anime)
}
func animeSongs(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	rows, err := db.Query("SELECT * FROM Songs s JOIN Animes a on ?", id)
	songs := []Song{}
	if err != nil {
		return err
	}
	for rows.Next() {
		song := Song{}
		err := rows.Scan()
		if err != nil {
			return err
		}
		songs = append(songs, song)
	}
	return c.JSON(http.StatusOK, songs)
}

func animeGenres(c echo.Context) error {
	panic("TODO!!!!!")

}

func animeProducers(c echo.Context) error {
	panic("TODO!!!!!")

}

func animeDemographics(c echo.Context) error {
	panic("TODO!!!!!")
}
