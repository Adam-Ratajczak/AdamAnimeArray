package main

import (
	"fmt"
	"net/http"
	"sort"
	"strconv"
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
	rq := AnimeRequest{}
	err := c.Bind(&rq)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	keyword := strings.Split(rq.Mode, ":")[0]

	mode, err := strconv.ParseInt(strings.Split(rq.Mode, ":")[1], 10, 32)
	if err != nil {
		return err
	}

	order_by := ""

	res := Range{}
	res.Animes = []AnimeShort{}

	if keyword == "sample" {
		if mode == 0 {
			res.Header = "Top Ranked Animes"
			order_by = "WHERE MalRank != 0 ORDER BY MalRank ASC"
		} else if mode == 1 {
			res.Header = "Recently Added Animes"
			order_by = "WHERE AiredBegin != '0000-00-00' ORDER BY AiredBegin DESC"
		} else if mode == 2 {
			res.Header = "Recomended Animes"
			order_by = "ORDER BY RAND()"
		}

		res.Code = rq.Mode
	} else if keyword == "genre" {
		GenreName := ""
		if mode == 0 {
			row := db.QueryRow("SELECT GenreID, GenreName FROM Genres ORDER BY RAND() LIMIT 1")

			err = row.Scan(&mode, &GenreName)
			if err != nil {
				return err
			}
		} else {
			row := db.QueryRow("SELECT GenreName FROM Genres WHERE GenreID = ? LIMIT 1", mode)

			err = row.Scan(&GenreName)
			if err != nil {
				return err
			}
		}

		res.Header = GenreName + " Animes"
		order_by = "WHERE AnimeID IN ((SELECT AnimeID FROM AnimeGenres WHERE GenreID = " + strconv.FormatInt(mode, 10) + ")) ORDER BY MalRank ASC"

		res.Code = "genre:" + strconv.FormatInt(mode, 10)
	} else if keyword == "theme" {
		ThemeName := ""
		if mode == 0 {
			row := db.QueryRow("SELECT ThemeID, ThemeName FROM Themes ORDER BY RAND() LIMIT 1")

			err = row.Scan(&mode, &ThemeName)
			if err != nil {
				return err
			}
		} else {
			row := db.QueryRow("SELECT ThemeName FROM Themes WHERE ThemeID = ? LIMIT 1", mode)

			err = row.Scan(&ThemeName)
			if err != nil {
				return err
			}
		}

		res.Header = ThemeName + " Animes"
		order_by = "WHERE AnimeID IN ((SELECT AnimeID FROM AnimeThemes WHERE ThemeID = " + strconv.FormatInt(mode, 10) + ")) ORDER BY MalRank ASC"

		res.Code = "theme:" + strconv.FormatInt(mode, 10)
	}

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
		short := AnimeShort{}
		short.AnimeID = anime.AnimeID
		short.AnimeTitle = anime.AnimeTitle
		short.PosterURL = anime.PosterURL
		short.Type = anime.Type
		short.Premiered = anime.Premiered
		short.EpisodeNum = anime.EpisodeNum

		res.Animes = append(res.Animes, short)
	}

	row := db.QueryRow("SELECT COUNT(AnimeID) FROM Animes " + order_by)
	err = row.Scan(&res.AnimeCount)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, res)
}

func filter(c echo.Context) error {
	rq := FilterRequest{}
	err := c.Bind(&rq)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	sql := sqlBuilder(rq)
	res := FilterRange{}
	res.Animes = []Anime{}
	rows, err := db.Query("SELECT DISTINCT a.AnimeID "+sql+" LIMIT ?, ?;", rq.ABegin, rq.AEnd)
	// fmt.Println("SELECT DISTINCT a.AnimeID " + sql)
	if err != nil {
		return err
	}
	for rows.Next() {
		id := 0
		rows.Scan(&id)

		anime, err := GetAnime(id)
		if err != nil {
			return err
		}

		res.Animes = append(res.Animes, anime)
	}

	row := db.QueryRow("SELECT COUNT(a.AnimeID) " + sql + ";")
	err = row.Scan(&res.AnimeCount)

	return c.JSON(http.StatusOK, res)
}

func filterSqlBuilder(table string, filter []int) string {
	sort.Ints(filter)
	coll := table[:len(table)-1]
	result := ""
	if len(filter) != 0 {
		f := []string{}
		for _, i := range filter {
			f = append(f, fmt.Sprint(i))
		}
		i := strings.Join(f, ",")

		if table == "Types" {
			result = fmt.Sprintf(" a.TypeID IN(%v)", i)
		} else {
			result = fmt.Sprintf(" (SELECT GROUP_CONCAT(%vID) FROM Anime%v WHERE %vID IN (%v) AND AnimeID = a.AnimeID ORDER BY %vID) LIKE '%v' ", coll, table, coll, i, coll, i)
		}
	}
	return result
}

func sqlBuilder(filter FilterRequest) string {
	wheres := []string{}
	sqlAppend := func(w string) {
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
	if where != "" {
		where = fmt.Sprintf(" WHERE %v ", where)
	}

	return " FROM Animes a " + where
}
