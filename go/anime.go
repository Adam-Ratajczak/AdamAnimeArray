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

func getType(id int, column string, table string) []int {
	result := []int{}

	rows, err := db.Query("SELECT "+column+" FROM "+table+" WHERE AnimeID = ?", id)
	if err != nil {
		log.Println(err)
		return result
	}
	for rows.Next() {
		res := 0
		err := rows.Scan(&res)
		if err != nil {
			log.Println(err)
			return []int{}
		}
		result = append(result, res)
	}

	return result
}

func animeGenres(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	genres := []Filter{}
	rows, err := db.Query("SELECT GenreID, (SELECT GenreName FROM Genres g WHERE g.GenreID = ag.GenreID) FROM AnimeGenres ag WHERE AnimeID = ?", id)
	if err != nil {
		return err
	}
	for rows.Next() {
		genre := Filter{}
		err := rows.Scan(&genre.ID, &genre.Name)
		if err != nil {
			return err
		}
		genres = append(genres, genre)
	}
	return c.JSON(http.StatusOK, genres)
}

func animeThemes(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	themes := []Filter{}
	rows, err := db.Query("SELECT ThemeID, (SELECT ThemeName FROM Themes t WHERE t.ThemeID = at.ThemeID) FROM AnimeThemes at WHERE AnimeID = ?", id)
	if err != nil {
		return err
	}
	for rows.Next() {
		theme := Filter{}
		err := rows.Scan(&theme.ID, &theme.Name)
		if err != nil {
			return err
		}
		themes = append(themes, theme)
	}
	return c.JSON(http.StatusOK, themes)
}

func animeProducers(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	producers := []Filter{}
	rows, err := db.Query("SELECT ProducerID, (SELECT ProducerName FROM Producers p WHERE p.ProducerID = ap.ProducerID) FROM AnimeProducers ap WHERE AnimeID = ?", id)
	if err != nil {
		return err
	}
	for rows.Next() {
		producer := Filter{}
		err := rows.Scan(&producer.ID, &producer.Name)
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
	demographics := []Filter{}
	rows, err := db.Query("SELECT GroupID, (SELECT GroupName FROM Demographics d WHERE d.GroupID = ad.GroupID) FROM AnimeDemographics ad WHERE AnimeID = ?", id)
	if err != nil {
		log.Println(err)
		return err
	}
	for rows.Next() {
		demographic := Filter{}
		err := rows.Scan(&demographic.ID, &demographic.Name)
		if err != nil {
			log.Println(err)
			return err
		}
		demographics = append(demographics, demographic)
	}
	return c.JSON(http.StatusOK, demographics)
}

func animeGetFilterEntry(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	filter := FilterRequest{}
	row := db.QueryRow("SELECT AnimeTitle, TypeID FROM Animes WHERE AnimeID = ?", id)
	err = row.Scan(&filter.Title, &filter.Type)
	if err != nil {
		if err == sql.ErrNoRows {
			return c.NoContent(http.StatusBadRequest)
		}
		return err
	}

	filter.Genres = getType(id, "GenreID", "AnimeGenres")
	filter.Themes = getType(id, "ThemeID", "AnimeThemes")
	filter.Producers = getType(id, "ProducerID", "AnimeProducers")
	filter.Demographics = getType(id, "GroupID", "AnimeDemographics")

	return c.JSON(http.StatusOK, filter)
}
