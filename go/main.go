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
	e.GET("info", DatabaseInfo)
	animes := e.Group("/animes")
	{
		animes.GET("/", all)
		animes.POST("/", animeRange)

		animes.GET("/filter", filter)
		animes.POST("/filter", filter)

		animes.GET("/songs/:id", song)

		animes.GET("/:id", anime)
		animes.GET("/:id/songs", animeSongs)
		animes.GET("/:id/episodes", animeEpisodes)
		animes.GET("/:id/episodes/:ep", animeEpisode)
		animes.GET("/:id/episodes/:ep/players", animePlayers)
		animes.GET("/:id/episodes/:ep/players/:lang", animePlayersFromLanguage)
		animes.GET("/:id/episodes/:ep/languages", episodeLanguages)
		animes.GET("/:id/genres", getAnimeGroup("Genres"))
		animes.GET("/:id/themes", getAnimeGroup("Themes"))
		animes.GET("/:id/studios", getAnimeGroup("Studios"))
		animes.GET("/:id/producers", getAnimeGroup("Producers"))
		animes.GET("/:id/demographics", getAnimeGroup("Demographics"))
		animes.GET("/:id/type", animeType)
		animes.GET("/:id/relations", animeRelations)
		animes.GET("/:id/relations/:rel", animeRelation)
		animes.GET("/:id/filterentry", animeGetFilterEntry)

		filters := animes.Group("/filters")
		{
			filters.GET("/types", filterGetAll("Types"))
			filters.GET("/types/:id", filterGetByID("Types"))
			filters.GET("/themes", filterGetAll("Themes"))
			filters.GET("/themes/:id", filterGetByID("Themes"))
			filters.GET("/genres", filterGetAll("Genres"))
			filters.GET("/genres/:id", filterGetByID("Genres"))
			filters.GET("/studios", filterGetAll("Studios"))
			filters.GET("/studios/:id", filterGetByID("Studios"))
			filters.GET("/producers", filterGetAll("Producers"))
			filters.GET("/producers/:id", filterGetByID("Producers"))
			filters.GET("/demographics", filterGetAll("Demographics"))
			filters.GET("/demographics/:id", filterGetByID("Demographics"))
		}

		animes.GET("/relations", filterGetAll("Relations"))
		animes.GET("/relations/:id", filterGetByID("Relations"))
	}
	e.POST("/auth", AuthUser)
	auth := e.Group("/auth")
	{
		auth.POST("/signup", CreateUser)
		auth.POST("/login", LoginUser)
		auth.POST("/logout", LogoutUser)
		auth.POST("/user", UserInfo)
		auth.POST("/changeinfo", ChangeUserInfo)
	}
	err = e.Start(":2137")
	if err != nil {
		log.Fatal(err)
	}

	ClearTokens()
}
