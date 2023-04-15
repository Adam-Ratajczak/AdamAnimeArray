package main

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func GetAnime(id int) (Anime, error) {
	anime := Anime{}
	row := db.QueryRow("SELECT AnimeID, AnimeTitle, EnglishTitle, AnimeDesc, TypeID, (SELECT TypeName FROM Types t WHERE t.TypeID = a.TypeID), AiredBegin, AiredEnd, Premiered, Duration, PosterUrl, (SELECT COUNT(EpisodeID) FROM Episodes e WHERE e.AnimeID = a.AnimeID) FROM Animes a WHERE AnimeID = ?", id)
	err := row.Scan(&anime.AnimeID, &anime.AnimeTitle, &anime.EnglishTitle, &anime.AnimeDesc, &anime.Type.ID, &anime.Type.Name, &anime.AiredBegin, &anime.AiredEnd, &anime.Premiered, &anime.Duration, &anime.PosterURL, &anime.EpisodeNum)
	if err != nil {
		return Anime{}, err
	}

	anime.Genres, err = getAnimeGroupArr(id, "Genres")
	if err != nil {
		return Anime{}, err
	}

	anime.Themes, err = getAnimeGroupArr(id, "Themes")
	if err != nil {
		return Anime{}, err
	}

	anime.Demographics, err = getAnimeGroupArr(id, "Demographics")
	if err != nil {
		return Anime{}, err
	}

	anime.Studios, err = getAnimeGroupArr(id, "Studios")
	if err != nil {
		return Anime{}, err
	}

	anime.Producers, err = getAnimeGroupArr(id, "Producers")
	if err != nil {
		return Anime{}, err
	}

	return anime, nil
}

func DatabaseInfo(c echo.Context) error {
	info := DBInfo{}
	row := db.QueryRow("SELECT COUNT(AnimeID) FROM Animes;")
	err := row.Scan(&info.AnimeCount)
	if err != nil {
		return err
	}

	info.Types, err = filterGetAllArr("Types")
	if err != nil {
		return err
	}

	info.Genres, err = filterGetAllArr("Genres")
	if err != nil {
		return err
	}

	info.Themes, err = filterGetAllArr("Themes")
	if err != nil {
		return err
	}

	info.Studios, err = filterGetAllArr("Studios")
	if err != nil {
		return err
	}

	info.Producers, err = filterGetAllArr("Producers")
	if err != nil {
		return err
	}

	info.Demographics, err = filterGetAllArr("Demographics")
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, info)
}

func anime(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	anime, err := GetAnime(id)
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
		err := rows.Scan(&episode.EpisodeID, &episode.AnimeID, &episode.EpisodeNr, &episode.Title, &episode.Aired)
		if err != nil {
			return err
		}
		episodes = append(episodes, episode)
	}
	return c.JSON(http.StatusOK, episodes)
}

func animePlayers(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	ep, err := strconv.Atoi(c.Param("ep"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	rows, err := db.Query("SELECT * FROM episodeplayers WHERE EpisodeID IN (SELECT EpisodeID FROM episodes WHERE AnimeID = ? AND EpisodeNr = ?) GROUP BY PlayerUrl;", id, ep)
	players := []Player{}
	if err != nil {
		return err
	}

	for rows.Next() {
		player := Player{}
		err := rows.Scan(&player.PlayerID, &player.EpisodeID, &player.LangCode, &player.Source, &player.Quality, &player.PlayerUrl)
		if err != nil {
			return err
		}
		players = append(players, player)
	}
	return c.JSON(http.StatusOK, players)
}

func animePlayersFromLanguage(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	ep, err := strconv.Atoi(c.Param("ep"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	lang := c.Param("lang")

	rows, err := db.Query("SELECT * FROM episodeplayers WHERE EpisodeID IN (SELECT EpisodeID FROM episodes WHERE AnimeID = ? AND EpisodeNr = ? AND LangCode = ?) GROUP BY PlayerUrl;", id, ep, lang)
	players := []Player{}
	if err != nil {
		return err
	}

	for rows.Next() {
		player := Player{}
		err := rows.Scan(&player.PlayerID, &player.EpisodeID, &player.LangCode, &player.Source, &player.Quality, &player.PlayerUrl)
		if err != nil {
			return err
		}
		players = append(players, player)
	}
	return c.JSON(http.StatusOK, players)
}

func episodeLanguages(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	ep, err := strconv.Atoi(c.Param("ep"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	rows, err := db.Query("SELECT l.LangCode, l.LanguageName, l.LanguageFlag FROM Languages l INNER JOIN episodeplayers ep ON l.LangCode = ep.LangCode WHERE EpisodeID IN (SELECT EpisodeID FROM episodes WHERE AnimeID = ? AND EpisodeNr = ?) GROUP BY LangCode", id, ep)
	languages := []Lang{}
	if err != nil {
		return err
	}

	for rows.Next() {
		l := Lang{}
		err := rows.Scan(&l.Code, &l.Name, &l.FlagUrl)
		if err != nil {
			return err
		}
		languages = append(languages, l)
	}
	return c.JSON(http.StatusOK, languages)
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
	err = row.Scan(&episode.EpisodeID, &episode.AnimeID, &episode.EpisodeNr, &episode.Title, &episode.Aired)
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

func getAnimeGroup(group string) func(c echo.Context) error {
	table := group[:len(group)-1]
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			return c.NoContent(http.StatusBadRequest)
		}
		arr := []Filter{}
		rows, err := db.Query("SELECT "+table+"ID, (SELECT "+table+"Name FROM "+table+"s g WHERE g."+table+"ID = ag."+table+"ID) FROM Anime"+table+"s ag WHERE AnimeID = ?", id)
		if err != nil {
			return err
		}
		for rows.Next() {
			genre := Filter{}
			err := rows.Scan(&genre.ID, &genre.Name)
			if err != nil {
				return err
			}
			arr = append(arr, genre)
		}
		return c.JSON(http.StatusOK, arr)
	}
}

func getAnimeGroupArr(id int, group string) ([]Filter, error) {
	table := group[:len(group)-1]
	arr := []Filter{}
	rows, err := db.Query("SELECT "+table+"ID, (SELECT "+table+"Name FROM "+table+"s g WHERE g."+table+"ID = ag."+table+"ID) FROM Anime"+table+"s ag WHERE AnimeID = ?", id)
	if err != nil {
		return arr, err
	}
	for rows.Next() {
		genre := Filter{}
		err := rows.Scan(&genre.ID, &genre.Name)
		if err != nil {
			return arr, err
		}
		arr = append(arr, genre)
	}
	return arr, nil
}

func animeType(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	res := Filter{}
	row := db.QueryRow("SELECT t.TypeID, t.TypeName FROM Types t WHERE TypeID = (SELECT a.TypeID FROM Animes a WHERE AnimeID = ?);", id)
	err = row.Scan(&res.ID, &res.Name)
	if err != nil {
		if err == sql.ErrNoRows {
			return c.NoContent(http.StatusBadRequest)
		}
		return err
	}
	return c.JSON(http.StatusOK, res)
}

func animeRelations(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	rows, err := db.Query("SELECT ar.AnimeID, ar.OtherID, ar.RelationID, (SELECT AnimeTitle FROM Animes a WHERE a.AnimeID = ar.OtherID), (SELECT RelationType FROM Relations r WHERE r.RelationID = ar.RelationID) FROM AnimeRelations ar WHERE ar.AnimeID = ?;", id)
	if err != nil {
		return err
	}
	result := []Relation{}

	for rows.Next() {
		res := Relation{}
		err = rows.Scan(&res.AnimeID, &res.OtherID, &res.Relation.ID, &res.OtherName, &res.Relation.Name)
		if err != nil {
			return err
		}

		result = append(result, res)
	}

	if err != nil {
		if err == sql.ErrNoRows {
			return c.NoContent(http.StatusBadRequest)
		}
		return err
	}
	return c.JSON(http.StatusOK, result)
}

func animeRelation(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	rel, err := strconv.Atoi(c.Param("rel"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	rows, err := db.Query("SELECT ar.AnimeID, ar.OtherID, ar.RelationID, (SELECT AnimeTitle FROM Animes a WHERE a.AnimeID = ar.OtherID), (SELECT RelationType FROM Relations r WHERE r.RelationID = ar.RelationID) FROM AnimeRelations ar WHERE ar.AnimeID = ? AND ar.RelationID = ?;", id, rel)
	if err != nil {
		return err
	}
	result := []Relation{}

	for rows.Next() {
		res := Relation{}
		err = rows.Scan(&res.AnimeID, &res.OtherID, &res.Relation.ID, &res.OtherName, &res.Relation.Name)
		if err != nil {
			return err
		}

		result = append(result, res)
	}

	if err != nil {
		if err == sql.ErrNoRows {
			return c.NoContent(http.StatusBadRequest)
		}
		return err
	}
	return c.JSON(http.StatusOK, result)
}

func animeGetFilterEntry(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}
	filter := FilterRequest{}
	row := db.QueryRow("SELECT AnimeTitle, TypeID FROM Animes WHERE AnimeID = ?", id)
	anime_type := 0
	err = row.Scan(&filter.Title, &anime_type)
	filter.Types = append(filter.Types, anime_type)
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
