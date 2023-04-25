package main

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

func all(c echo.Context) error {
	animes := []Anime{}
	rows, err := db.Query("SELECT AnimeID FROM Animes;")
	if err != nil {
		return err
	}
	for rows.Next() {
		id := 0
		rows.Scan(&id)

		anime, err := GetAnime(id)
		if err != nil {
			continue
		}

		animes = append(animes, anime)
	}
	return c.JSON(http.StatusOK, animes)
}
func animeRange(c echo.Context) error {
	animes := []Anime{}
	rq := AnimeRequest{}
	err := c.Bind(&rq)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	order_by := ""

	if rq.Mode == 0 {
		order_by = "WHERE MalRank != 0 ORDER BY MalRank ASC"
	} else if rq.Mode == 1 {
		order_by = "WHERE AiredBegin != '0000-00-00' ORDER BY AiredBegin DESC"
	} else if rq.Mode == 2 {
		order_by = "ORDER BY RAND()"
	}

	AniRange := Range{}

	rows, err := db.Query("SELECT AnimeID FROM Animes "+order_by+" LIMIT ?, ?;", rq.AnimeBegin, rq.AnimeEnd)
	if err != nil {
		return err
	}
	for rows.Next() {
		id := 0
		rows.Scan(&id)

		anime, err := GetAnime(id)
		if err != nil {
			continue
		}

		animes = append(animes, anime)
	}
	AniRange.Animes = animes

	row := db.QueryRow("SELECT COUNT(AnimeID) FROM Animes " + order_by)
	err = row.Scan(&AniRange.AnimeCount)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, AniRange)
}

func filter(c echo.Context) error {
	rq := FilterRequest{}
	err := c.Bind(&rq)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	sql := sqlBuilder(rq)
	res := Range{}
	res.Animes = []Anime{}
	rows, err := db.Query("SELECT DISTINCT a.AnimeID "+sql+" LIMIT ?, ?;", rq.ABegin, rq.AEnd)
	if err != nil {
		return err
	}
	for rows.Next() {
		id := 0
		rows.Scan(&id)

		anime, err := GetAnime(id)
		if err != nil {
			continue
		}

		res.Animes = append(res.Animes, anime)
	}

	row := db.QueryRow("SELECT COUNT(a.AnimeID) " + sql + ";")
	err = row.Scan(&res.AnimeCount)

	return c.JSON(http.StatusOK, res)
}

func filterSqlBuilder(table string, filter []int) (string, string) {
	coll := table[:len(table)-1]
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
	sql := "FROM Animes a %v %v"
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
	sqlAppend(filterSqlBuilder("Studios", filter.Studios))
	sqlAppend(filterSqlBuilder("Producers", filter.Producers))
	sqlAppend(filterSqlBuilder("Demographics", filter.Demographics))
	wheres = append(wheres, fmt.Sprintf(` (a.AnimeTitle LIKE "%%%v%%" OR a.EnglishTitle LIKE "%%%v%%") ORDER BY a.AnimeTitle`, filter.Title, filter.Title))
	where := strings.Join(wheres, " AND ")
	join := strings.Join(joins, " ")
	if where != "" {
		where = fmt.Sprintf(" WHERE %v ", where)
	}

	return fmt.Sprintf(sql, join, where)
}
