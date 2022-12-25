package main

import (
	"database/sql"
	"log"
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
	rows, err := db.Query("SELECT * FROM Songs Where AnimeID = ?", id)
	songs := []Song{}
	if err != nil {
		return err
	}
	for rows.Next() {
		song := Song{}
		err := rows.Scan(&song.SongID, &song.AnimeID, &song.Title, &song.Artist, &song.Type, &song.SpotifyURL)
		if err != nil {
			return err
		}
		songs = append(songs, song)
	}
	return c.JSON(http.StatusOK, songs)
}

func animeEpisodes(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	rows, err := db.Query("SELECT * FROM Episodes Where AnimeID = ?", id)
	episodes := []Episode{}
	if err != nil {
		return err
	}
	for rows.Next() {
		episode := Episode{}
		err := rows.Scan(&episode.EpisodeID, &episode.AnimeID, &episode.EpisodeNr, &episode.Title, &episode.Aired, &episode.PlayerUrl)
		if err != nil {
			return err
		}
		episodes = append(episodes, episode)
	}
	return c.JSON(http.StatusOK, episodes)
}

func animeEpisode(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	ep, err := strconv.Atoi(c.Param("ep"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	episode := Episode{}
	row := db.QueryRow("SELECT * FROM Episodes WHERE AnimeID = ? AND EpisodeNr = ?", id, ep)
	err = row.Scan(&episode.EpisodeID, &episode.AnimeID, &episode.EpisodeNr, &episode.Title, &episode.Aired, &episode.PlayerUrl)
	if err != nil {
		if err == sql.ErrNoRows {
			return c.NoContent(http.StatusBadRequest)
		}
		return err
	}
	return c.JSON(http.StatusOK, episode)
}

func animeGenres(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	genres := []int{}
	rows, err := db.Query("SELECT GenreID FROM AnimeGenres WHERE AnimeID = ?", id)
	if err != nil {
		return err
	}
	for rows.Next() {
		genre := 0
		err := rows.Scan(&genre)
		if err != nil {
			return err
		}
		genres = append(genres, genre)
	}
	return c.JSON(http.StatusOK, genres)
}

func animeProducers(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	producers := []int{}
	rows, err := db.Query("SELECT ProducerID FROM AnimeProducers WHERE AnimeID = ?", id)
	if err != nil {
		return err
	}
	for rows.Next() {
		producer := 0
		err := rows.Scan(&producer)
		if err != nil {
			return err
		}
		producers = append(producers, producer)
	}
	return c.JSON(http.StatusOK, producers)
}

func animeDemographics(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	demographics := []int{}
	rows, err := db.Query("SELECT GroupID FROM AnimeDemographics WHERE AnimeID = ?", id)
	if err != nil {
		log.Println(err)
		return err
	}
	for rows.Next() {
		demographic := 0
		err := rows.Scan(&demographic)
		if err != nil {
			log.Println(err)
			return err
		}
		demographics = append(demographics, demographic)
	}
	return c.JSON(http.StatusOK, demographics)
}
