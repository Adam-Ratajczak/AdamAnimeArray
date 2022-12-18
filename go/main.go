package main

import (
	"database/sql"
	"log"
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
	animes := e.Group("/animes")
	{
		animes.GET("/", all)
		animes.GET("/filter", filter)
		animes.GET("/song/:id", song)
		animes.GET("/anime/:id", anime)
		animes.GET("/anime/:id/songs", animeSongs)
		filters := e.Group("/filters")
		{
			filters.GET("/types", filterGetAll("Types"))
			filters.GET("/types/:id", filterGetByID("Types"))
			filters.GET("/genres", filterGetAll("Genres"))
			filters.GET("/genres/:id", filterGetByID("Genres"))
			filters.GET("/producers", filterGetAll("Producers"))
			filters.GET("/producers/:id", filterGetByID("Producers"))
			filters.GET("/demographics", filterGetAll("Demographics"))
			filters.GET("/demographics/:id", filterGetByID("Demographics"))
		}
	}
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
