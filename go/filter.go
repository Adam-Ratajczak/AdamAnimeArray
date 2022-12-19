package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func all(c echo.Context) error {
	animes := []Anime{}
	rows, err := db.Query("Select * FROM Animes")
	if err != nil {
		return err
	}
	for rows.Next() {
		anime := Anime{}
		rows.Scan(&anime.AnimeID, &anime.AnimeTitle, &anime.AnimeDesc, &anime.TypeID, &anime.AiredBegin, &anime.AiredEnd, &anime.Premiered, &anime.Duration, &anime.PosterURL)
		animes = append(animes, anime)
	}
	return c.JSON(http.StatusOK, animes)
}

func filter(c echo.Context) error {
	filterSqlBuilder()
	panic("TODO!!!!!")
	// return nil
}

func filterSqlBuilder() {}
