package main

import (
	"fmt"
	"net/http"
	"strings"

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
	rq := FilterRequest{}
	err := c.Bind(&rq)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	sql := sqlBuilder(rq)
	animes := []Anime{}
	rows, err := db.Query(sql)
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

func filterSqlBuilder(table string, filter []int) (string, string) {
	coll := table[:len(table)-1]
	if table == "Demographics" {
		coll = "Group"
	}
	join := ""
	where := ""
	if len(filter) != 0 {
		f := []string{}
		for _, i := range filter {
			f = append(f, fmt.Sprint(i))
		}
		i := strings.Join(f, ",")
		p := string(table[0])
		join = fmt.Sprintf(" JOIN Anime%v a%vxd ON a.AnimeID = a%vxd.AnimeID ", table, p, p)
		where = fmt.Sprintf(" a%vxd.%vID IN (%v) ", p, coll, i)
		if table == "Types" {
			join = ""
			where = fmt.Sprintf(" a.TypeID IN (%v)", i)
		}
	}
	return join, where
}

func sqlBuilder(filter FilterRequest) string {
	sql := "SELECT DISTINCT a.AnimeID, a.AnimeTitle, a.AnimeDesc, a.TypeID, a.AiredBegin, a.AiredEnd, a.Premiered, a.Duration, a.PosterUrl FROM Animes a %v %v"
	joins := []string{}
	wheres := []string{}
	sqlAppend := func(j, w string) {
		joins = append(joins, j)
		if w != "" {
			wheres = append(wheres, w)
		}
	}
	sqlAppend(filterSqlBuilder("Types", filter.Types))
	sqlAppend(filterSqlBuilder("Themes", filter.Themes))
	sqlAppend(filterSqlBuilder("Genres", filter.Genres))
	sqlAppend(filterSqlBuilder("Producers", filter.Producers))
	sqlAppend(filterSqlBuilder("Demographics", filter.Demographics))
	wheres = append(wheres, fmt.Sprintf(` a.AnimeTitle LIKE "%%%v%%" ORDER BY a.AnimeTitle`, filter.Title))
	where := strings.Join(wheres, " AND ")
	join := strings.Join(joins, " ")
	if where != "" {
		where = fmt.Sprintf(" WHERE %v ", where)
	}
	return fmt.Sprintf(sql, join, where)
}
