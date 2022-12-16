package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

var db *sql.DB

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	db, err = sql.Open("mysql", os.Getenv("MARIADB_CONN"))
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	e := echo.New()

	e.GET("/tst", func(c echo.Context) error {
		db.Query(`Select Anime`)

		return nil
	})

	e.GET("/animes", func(c echo.Context) error {
		var animes []anime
		var rq animeRequest
		err := c.Bind(&rq)
		if err != nil {
			c.NoContent(http.StatusBadRequest)
			return nil
		}
		rows, err := db.Query(`
		SELECT DISTINCT a.AnimeID, a.AnimeTitle, a.AnimeDesc, a.AiredBegin, a.AiredEnd, a.Premiered, a.Duration, a.PosterUrl FROM ((((
			Animes a LEFT JOIN (
				SELECT AnimeID FROM AnimeGenres WHERE GenreID IN((
					SELECT GenreID FROM Genres WHERE ?
				))
			) ag ON a.AnimeID = ag.AnimeID) LEFT JOIN (
				SELECT AnimeID FROM AnimeThemes WHERE ThemeID IN((
					SELECT ThemeID FROM Themes WHERE ?
				))
			) ath ON a.AnimeID = ath.AnimeID) LEFT JOIN (
				SELECT AnimeID FROM AnimeDemographics WHERE GroupID IN((
					SELECT GroupID FROM Demographics WHERE ?
				))
			) ad ON a.AnimeID = ad.AnimeID) LEFT JOIN (
				SELECT AnimeID FROM AnimeProducers WHERE ProducerID IN((
					SELECT ProducerID FROM Producers WHERE ?
				))
			) ast ON a.AnimeID = ast.AnimeID) WHERE ? ORDER BY a.AnimeTitle ASC;`, rq.Genre, rq.Theme, rq.Age, rq.Studio, rq.Title)
		if err != nil {
			c.NoContent(http.StatusInternalServerError)
			log.Println(err)
			return nil
		}
		for rows.Next() {
			var a anime
			rows.Scan(&a.AnimeID, &a.AnimeTitle, &a.AnimeDesc, &a.AiredBegin, &a.AiredEnd, &a.Premiered, &a.Duration, &a.PosterUrl)
			animes = append(animes, a)
		}
		return c.JSON(http.StatusOK, animes)
	})
	err = e.Start(":2137")
	if err != nil {
		log.Fatal(err)
	}
}

// func tablesFromSQLsINPATHS(path string) {
// 	dir, err := os.ReadDir(path)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	for _, file := range dir {
// 		b, err := os.ReadFile(path + "/" + file.Name())
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 		lines := strings.Split(string(b), "\n")
// 		var sqls []string
// 		var buf string
// 		for _, line := range lines {
// 			if strings.HasPrefix(line, "--") || line == "" || line == "\n" {
// 				continue
// 			}
// 			buf += line
// 			if strings.HasSuffix(line, ";") {
// 				sqls = append(sqls, buf)
// 				buf = ""
// 			}
// 		}
// 		for _, sql := range sqls {
// 			fmt.Printf("BEGIN\n %v \nEND\n", sql)
// 			_, err = db.Exec(sql)
// 			if err != nil {
// 				continue
// 			}
// 		}
// 	}
// }
