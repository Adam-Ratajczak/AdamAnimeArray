package main

import (
	"fmt"
	"log"
	"strings"
)

func searching_sql_builder(table string, id_field string, field string, value string) int {
	row := db.QueryRow("SELECT "+id_field+" FROM "+table+" WHERE "+field+" = ?", value)
	id := -1

	err := row.Scan(&id)

	if err != nil {
		return -1
	}

	return id
}

func getting_sql_builder(table string, id_field string, field string, value string) int {
	row := db.QueryRow("SELECT "+id_field+" FROM "+table+" WHERE "+field+" = ?", value)
	id := -1

	err := row.Scan(&id)

	if err != nil {
		row2, err2 := db.Exec("INSERT INTO "+table+"("+field+") VALUES (?);", value)

		if err2 != nil {
			return -1
		} else {
			id, err2 := row2.LastInsertId()
			if err2 != nil {
				return -1
			}

			return int(id)
		}
	}

	return id
}

func find_anime_in_db(name string) int {
	return searching_sql_builder("Animes", "AnimeID", "AnimeTitle", name)
}

func find_anime_name_in_db(id int) string {
	row := db.QueryRow("SELECT AnimeTitle FROM Animes WHERE AnimeID = ?", id)
	name := ""

	err := row.Scan(&name)

	if err != nil {
		return ""
	}

	return name
}

func relation_exists(lhs, rhs int) bool {
	row := db.QueryRow("SELECT RelationID FROM AnimeRelations WHERE AnimeID = ? AND OtherID = ?;", lhs, rhs)
	id := 0

	err := row.Scan(&id)

	if err != nil {
		return false
	}

	return true
}

func find_episode_names_in_db(id int) []Episode {
	rows, err := db.Query("SELECT AnimeID, EpisodeNr, Title, Aired FROM Episodes WHERE AnimeID = ? ORDER BY EpisodeNr;", id)
	result := []Episode{}

	if err != nil {
		fmt.Println(err)
		return nil
	}

	for rows.Next() {
		ep := Episode{}
		rows.Scan(&ep.AnimeID, &ep.EpisodeNr, &ep.Title, &ep.Aired)
		result = append(result, ep)
	}

	return result
}

func find_ep_num_in_db(id int) int {
	row := db.QueryRow("SELECT COUNT(EpisodeID) FROM Episodes WHERE AnimeID = ?", id)
	num := 0

	err := row.Scan(&num)

	if err != nil {
		return 0
	}

	return num
}

func find_ep_nr_in_db(id int) int {
	row := db.QueryRow("SELECT EpisodeNr FROM Episodes WHERE EpisodeID = ?", id)
	num := 0

	err := row.Scan(&num)

	if err != nil {
		return 0
	}

	return num
}

func find_ep_in_db(AnimeID, EpNr int) int {
	row := db.QueryRow("SELECT EpisodeID FROM Episodes WHERE AnimeID = ? AND EpisodeNr = ?;", AnimeID, EpNr)
	id := -1

	err := row.Scan(&id)

	if err != nil {
		fmt.Println("Anime ID: ", id, err)
		return -1
	}

	return id
}

func find_ep_name_in_db(AnimeID, EpNr int) string {
	row := db.QueryRow("SELECT Title FROM Episodes WHERE AnimeID = ? AND EpisodeNr = ?;", AnimeID, EpNr)
	result := ""

	err := row.Scan(&result)

	if err != nil {
		fmt.Println(err)
		return ""
	}

	return result
}

func find_anime_ep_in_db(EpID int) int {
	row := db.QueryRow("SELECT AnimeID FROM Episodes WHERE EpisodeID = ?;", EpID)
	id := -1

	err := row.Scan(&id)

	if err != nil {
		fmt.Println(err)
		return -1
	}

	return id
}

func write_anime_to_db(a Animes) int {
	id := find_anime_in_db(a.AnimeTitle)

	if id != -1 {
		return -1
	}

	row, err := db.Exec("INSERT INTO Animes(AnimeTitle, EnglishTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);", a.AnimeTitle, a.EnglishTitle, a.AnimeDesc, a.TypeID, a.AiredBegin, a.AiredEnd, a.Premiered, a.Duration, a.PosterURL)

	if err != nil {
		fmt.Println(err)
		return -1
	} else {
		id, err := row.LastInsertId()
		if err != nil {
			return -1
		}

		return int(id)
	}
}

func delete_anime(id int) {
	fmt.Println("Deleting Anime with id:", id)
	row, err := db.Exec("DELETE FROM EpisodePlayers WHERE EpisodeID IN (SELECT EpisodeID FROM Episodes WHERE AnimeID = ?);", id)
	if err != nil {
		log.Fatal(err)
	}
	row, err = db.Exec("DELETE FROM Episodes WHERE AnimeID = ?;", id)
	if err != nil {
		log.Fatal(err)
	}
	row, err = db.Exec("DELETE FROM Songs WHERE AnimeID = ?;", id)
	if err != nil {
		log.Fatal(err)
	}
	row, err = db.Exec("DELETE FROM AnimeGenres WHERE AnimeID = ?;", id)
	if err != nil {
		log.Fatal(err)
	}
	row, err = db.Exec("DELETE FROM AnimeThemes WHERE AnimeID = ?;", id)
	if err != nil {
		log.Fatal(err)
	}
	row, err = db.Exec("DELETE FROM AnimeStudios WHERE AnimeID = ?;", id)
	if err != nil {
		log.Fatal(err)
	}
	row, err = db.Exec("DELETE FROM AnimeProducers WHERE AnimeID = ?;", id)
	if err != nil {
		log.Fatal(err)
	}
	row, err = db.Exec("DELETE FROM AnimeDemographics WHERE AnimeID = ?;", id)
	if err != nil {
		log.Fatal(err)
	}
	row, err = db.Exec("DELETE FROM AnimeRelations WHERE AnimeID = ? OR OtherID = ?;", id, id)
	if err != nil {
		log.Fatal(err)
	}
	row, err = db.Exec("DELETE FROM Animes WHERE AnimeID = ?;", id)
	if err != nil {
		log.Fatal(err)
	}

	row.RowsAffected()
}

func write_episode_to_db(e Episode) int {
	row, err := db.Exec("INSERT INTO Episodes(AnimeID, EpisodeNr, Title, Aired) VALUES (?, ?, ?, ?);", e.AnimeID, e.EpisodeNr, e.Title, e.Aired)

	if err != nil {
		return -1
	} else {
		id, err := row.LastInsertId()
		if err != nil {
			return -1
		}

		return int(id)
	}
}

func write_relation_to_db(lhs, rhs, relation_type int) int {
	row, err := db.Exec("INSERT INTO AnimeRelations(AnimeID, OtherID, RelationID) VALUES (?, ?, ?);", lhs, rhs, relation_type)

	if err != nil {
		return -1
	} else {
		id, err := row.LastInsertId()
		if err != nil {
			return -1
		}

		return int(id)
	}
}

func write_player_to_db(p Player) int {
	row := db.QueryRow("SELECT PlayerID FROM EpisodePlayers WHERE PlayerUrl = ?", p.Url)
	id := 0

	err := row.Scan(&id)

	if err == nil {
		return id
	}

	if !strings.Contains(p.Url, "http") {
		return -1
	}

	ep_num := find_ep_nr_in_db(p.EpisodeID)
	anime_id := find_anime_ep_in_db(p.EpisodeID)
	anime_name := find_anime_name_in_db(anime_id)
	ep_name := find_ep_name_in_db(anime_id, ep_num)

	fmt.Println("Saved ep. ", ep_num, " of Anime ", anime_name, " with title ", ep_name, ". Language: ", p.Lang, ", player: ", p.Source)

	res, err := db.Exec("INSERT INTO EpisodePlayers(EpisodeID, LangCode, Source, Quality, PlayerUrl) VALUES (?, ?, ?, ?, ?);", p.EpisodeID, p.Lang, p.Source, p.Quality, p.Url)

	if err != nil {
		return -1
	} else {
		id, err := res.LastInsertId()
		if err != nil {
			return -1
		}

		return int(id)
	}
}

func write_song_to_db(s Song) int {
	row := db.QueryRow("SELECT SongID FROM Songs WHERE Title LIKE ? AND Artist LIKE ?", s.Title, s.Artist)
	id := 0

	err := row.Scan(&id)

	if err == nil {
		return id
	}
	res, err := db.Exec("INSERT INTO Songs(Title, Artist, SongType) VALUES (?, ?, ?);", s.Title, s.Artist, s.Type)

	if err != nil {
		fmt.Println(err)
		return -1
	} else {
		id, err := res.LastInsertId()
		if err != nil {
			return -1
		}

		fmt.Println("Written song \"", s.Title+"\" of Author ", s.Artist)

		return int(id)
	}
}

func write_song_player_to_db(p SongPlayer) int {
	res, err := db.Exec("INSERT INTO SongPlayers(SongID, Source, PlayerUrl) VALUES (?, ?, ?);", p.SongID, p.Source, p.Player)

	if err != nil {
		fmt.Println(err)
		return -1
	} else {
		id, err := res.LastInsertId()
		if err != nil {
			return -1
		}
		return int(id)
	}
}

func write_song_episode_binding_to_db(AnimeID, EpBegin, EpEnd, SongID int) {
	for i := EpBegin; i <= EpEnd; i++ {
		id := find_ep_in_db(AnimeID, i)

		if id == -1 {
			continue
		}

		_, err := db.Exec("INSERT INTO EpisodeSongs(EpisodeID, SongID) VALUES (?, ?);", id, SongID)

		if err != nil {
			fmt.Println(err)
			continue
		}
	}
}

func get_type_in_db(name string) int {
	return getting_sql_builder("Types", "TypeID", "TypeName", name)
}

func get_genres_in_db(name string) int {
	return getting_sql_builder("Genres", "GenreID", "GenreName", name)
}

func get_themes_in_db(name string) int {
	return getting_sql_builder("Themes", "ThemeID", "ThemeName", name)
}

func get_producers_in_db(name string) int {
	return getting_sql_builder("Producers", "ProducerID", "ProducerName", name)
}

func get_studios_in_db(name string) int {
	return getting_sql_builder("Studios", "StudioID", "StudioName", name)
}

func get_demographics_in_db(name string) int {
	return getting_sql_builder("Demographics", "DemographicID", "DemographicName", name)
}

func get_relation_in_db(name string) int {
	return getting_sql_builder("Relations", "RelationID", "RelationType", name)
}

func write_binding_to_db(binding string, anime_id int, binding_id int) int {
	row, err := db.Exec("INSERT INTO Anime"+binding+"s(AnimeID, "+binding+"ID) VALUES (?, ?);", anime_id, binding_id)

	if err != nil {
		return -1
	} else {
		id, err := row.LastInsertId()
		if err != nil {
			return -1
		}

		return int(id)
	}
}
