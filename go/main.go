package main

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
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
	e.Use(middleware.Recover(), middleware.Logger(), middleware.CORS())
	animes := e.Group("/animes")
	{
		animes.GET("/", all)

		animes.GET("/filter", filter)
		animes.POST("/filter", filter)

		animes.GET("/songs/:id", song)

		animes.GET("/:id", anime)
		animes.GET("/:id/songs", animeSongs)
		animes.GET("/:id/episodes", animeEpisodes)
		animes.GET("/:id/episodes/:ep", animeEpisode)
		animes.GET("/:id/genres", animeGenres)
		animes.GET("/:id/themes", animeThemes)
		animes.GET("/:id/producers", animeProducers)
		animes.GET("/:id/demographics", animeDemographics)
		animes.GET("/:id/type", animeType)
		animes.GET("/:id/filterentry", animeGetFilterEntry)

		filters := animes.Group("/filters")
		{
			filters.GET("/types", filterGetAll("Types"))
			filters.GET("/types/:id", filterGetByID("Types"))
			filters.GET("/themes", filterGetAll("Themes"))
			filters.GET("/themes/:id", filterGetByID("Themes"))
			filters.GET("/genres", filterGetAll("Genres"))
			filters.GET("/genres/:id", filterGetByID("Genres"))
			filters.GET("/producers", filterGetAll("Producers"))
			filters.GET("/producers/:id", filterGetByID("Producers"))
			filters.GET("/demographics", filterGetAll("Demographics"))
			filters.GET("/demographics/:id", filterGetByID("Demographics"))
		}
	}
	err = e.Start(":2138")
	if err != nil {
		log.Fatal(err)
	}
}
