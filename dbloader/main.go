package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var db *sql.DB

func loadSQLFile(path string) error {
	file, err := os.ReadFile(path)
	if err != nil {
		log.Fatal(err)
	}
	tx, err := db.Begin()
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		tx.Rollback()
	}()

	split_str := ""
	if strings.Contains(string(file), string(rune(13))) {
		split_str = ";" + string(rune(13)) + string(rune(10))
	} else {
		split_str = ";" + string(rune(10))
	}

	for _, q := range strings.Split(string(file), split_str) {
		q = strings.TrimSpace(q)
		if q == "" {
			continue
		}
		if _, err := tx.Exec(q); err != nil {
			fmt.Println(q)
			log.Fatal(err)
		}
	}

	fmt.Println("Successfully imported:", path)
	return tx.Commit()
}

func formatStr(str string) string {
	return strings.Replace(strings.Replace(strings.Replace(strings.Replace(str, "\\", "\\\\", -1), "\n", "\\n", -1), "\"", "\\\"", -1), "'", "\\'", -1)
}

func exportStructuralData(path, shortname string) {
	content := ""
	rows, err := db.Query("SELECT * FROM " + shortname + "s;")
	if err != nil {
		log.Panic(err)
	}

	for rows.Next() {
		id := 0
		name := ""

		err := rows.Scan(&id, &name)
		if err != nil {
			log.Panic(err)
		}

		name = formatStr(name)

		id_str := strconv.FormatInt(int64(id), 10)
		content += "INSERT INTO " + shortname + "s(" + shortname + "ID, " + shortname + "Name) VALUES (" + id_str + ", '" + formatStr(name) + "');\n"
	}

	os.WriteFile(path+"/structure/"+shortname+"sTable.sql", []byte(content), os.ModeAppend)
}

func exportSongs(path string) {
	content := ""
	rows, err := db.Query("SELECT * FROM Songs;")
	if err != nil {
		log.Fatal(err)
	}

	for rows.Next() {
		SongID := 0
		Title := ""
		Artist := ""
		SongType := ""

		err = rows.Scan(&SongID, &Title, &Artist, &SongType)
		if err != nil {
			log.Fatal(err)
		}

		content += fmt.Sprintf("-- Song with ID %v\n", SongID)
		content += fmt.Sprintf("INSERT INTO Songs(SongID, Title, Artist, SongType) VALUES (%v, '%s', '%s', '%s');\n", SongID, formatStr(Title), formatStr(Artist), formatStr(SongType))

		player_rows, err := db.Query("SELECT * FROM SongPlayers WHERE SongID = ?;", SongID)
		if err != nil {
			log.Fatal(err)
		}
		for player_rows.Next() {
			PlayerID := 0
			id := 0
			Source := ""
			PlayerUrl := ""

			err = player_rows.Scan(&PlayerID, &id, &Source, &PlayerUrl)
			if err != nil {
				log.Fatal(err)
			}

			content += fmt.Sprintf("INSERT INTO SongPlayers(PlayerID, SongID, Source, PlayerUrl) VALUES (%v, %v, '%s', '%s');\n", PlayerID, SongID, formatStr(Source), formatStr(PlayerUrl))
		}

		content += "\n"
	}

	os.WriteFile(path+"/structure/Songs.sql", []byte(content), os.ModeAppend)
}

func exportRelations(path string) {
	content := ""
	rows, err := db.Query("SELECT AnimeID, OtherID, RelationID FROM AnimeRelations;")
	if err != nil {
		log.Fatal(err)
	}

	for rows.Next() {
		AnimeID := 0
		OtherID := 0
		RelationID := 0

		err = rows.Scan(&AnimeID, &OtherID, &RelationID)
		if err != nil {
			log.Fatal(err)
		}

		content += fmt.Sprintf("INSERT INTO AnimeRelations(AnimeID, OtherID, RelationID) VALUES (%v, %v, %v);\n", AnimeID, OtherID, RelationID)
	}

	os.WriteFile(path+"/structure/AnimeRelations.sql", []byte(content), os.ModeAppend)
}

func exportBindingData(id int, shortname string) string {
	content := ""
	rows, err := db.Query("SELECT "+shortname+"ID FROM Anime"+shortname+"s WHERE AnimeID = ?", id)
	if err != nil {
		log.Panic(err)
	}

	for rows.Next() {
		group_id := 0

		err := rows.Scan(&group_id)
		if err != nil {
			log.Panic(err)
		}

		id_str := strconv.FormatInt(int64(id), 10)
		group_id_str := strconv.FormatInt(int64(group_id), 10)

		content += "INSERT INTO Anime" + shortname + "s(AnimeID, " + shortname + "ID) VALUES (" + id_str + ", " + group_id_str + ");\n"
	}

	return content
}

func exportAnimeData(id int, path string) {
	content := ""
	row := db.QueryRow("SELECT * FROM Animes WHERE AnimeID = ?", id)
	AnimeID := 0
	AnimeTitle := ""
	EnglishTitle := ""
	AnimeDesc := ""
	TypeID := 0
	AiredBegin := ""
	AiredEnd := ""
	Premiered := ""
	Duration := ""
	PosterUrl := ""
	MalUrl := ""
	MalRank := 0

	err := row.Scan(&AnimeID, &AnimeTitle, &EnglishTitle, &AnimeDesc, &TypeID, &AiredBegin, &AiredEnd, &Premiered, &Duration, &PosterUrl, &MalUrl, &MalRank)
	if err != nil {
		log.Fatal(err)
	}

	content += fmt.Sprintf("-- anime with ID %v\n", AnimeID)
	content += fmt.Sprintf("INSERT INTO Animes(AnimeID, AnimeTitle, EnglishTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl, MalUrl, MalRank) VALUES (%v, '%s', '%s', '%s', %v, '%s', '%s', '%s', '%s', '%s', '%s', %v);\n\n", AnimeID, formatStr(AnimeTitle), formatStr(EnglishTitle), formatStr(AnimeDesc), TypeID, formatStr(AiredBegin), formatStr(AiredEnd), formatStr(Premiered), formatStr(Duration), formatStr(PosterUrl), formatStr(MalUrl), MalRank)
	content += "-- anime bindings\n"
	content += exportBindingData(id, "Demographic")
	content += exportBindingData(id, "Genre")
	content += exportBindingData(id, "Producer")
	content += exportBindingData(id, "Studio")
	content += exportBindingData(id, "Theme")
	content += "\n-- Anime episodes\n"

	rows, err := db.Query("SELECT * FROM Episodes WHERE AnimeID = ?;", id)
	if err != nil {
		log.Fatal(err)
	}

	for rows.Next() {
		EpisodeID := 0
		AnimeID := 0
		EpisodeNr := 0
		Title := ""
		Aired := ""

		err = rows.Scan(&EpisodeID, &AnimeID, &EpisodeNr, &Title, &Aired)
		if err != nil {
			log.Fatal(err)
		}

		content += fmt.Sprintf("-- episode #%v with ID %v\n", EpisodeNr, EpisodeID)
		content += fmt.Sprintf("INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired) VALUES (%v, %v, %v, '%s', '%s');\n", EpisodeID, AnimeID, EpisodeNr, formatStr(Title), formatStr(Aired))

		players, err := db.Query("SELECT * FROM EpisodePlayers WHERE EpisodeID = ?;", EpisodeID)
		if err != nil {
			log.Fatal(err)
		}

		for players.Next() {
			PlayerID := 0
			epid := 0
			LangCode := ""
			Source := ""
			Quality := ""
			PlayerUrl := ""

			err = players.Scan(&PlayerID, &epid, &LangCode, &Source, &Quality, &PlayerUrl)
			if err != nil {
				log.Fatal(err)
			}

			content += fmt.Sprintf("INSERT INTO EpisodePlayers(PlayerID, EpisodeID, LangCode, Source, Quality, PlayerUrl) VALUES (%v, %v, '%s', '%s', '%s', '%s');\n", PlayerID, epid, formatStr(LangCode), formatStr(Source), formatStr(Quality), formatStr(PlayerUrl))
		}

		songs, err := db.Query("SELECT * FROM EpisodeSongs WHERE EpisodeID = ?;", EpisodeID)
		if err != nil {
			log.Fatal(err)
		}

		for songs.Next() {
			EntryID := 0
			epid := 0
			SongID := 0

			err = songs.Scan(&EntryID, &epid, &SongID)
			if err != nil {
				log.Fatal(err)
			}

			content += fmt.Sprintf("INSERT INTO EpisodeSongs(EpisodeID, SongID) VALUES (%v, %v);\n", epid, SongID)
		}

		content += "\n"
	}

	os.WriteFile(path+"/animes/anime_"+strconv.FormatInt(int64(id), 10)+".sql", []byte(content), os.ModeAppend)

	fmt.Println("Exported anime with id: ", id)
}

func main() {
	args := os.Args[1:]
	mode := 0
	path := ""

	if len(args) == 0 || args[0] == "--help" || args[0] == "-h" {
		fmt.Println("-h\t--help\t\t\t\t\tDisplays help")
		fmt.Println("-i\t--import <path_to_sql_file>\t\tImports database from specified path")
		fmt.Println("-e\t--export <sql_export_path>\t\tExports database to sql files")
		fmt.Println("\nMySQL connection string pattern: \"user:password@(host:port)/database_name\"")
		return
	} else if args[0] == "--import" || args[0] == "-i" {
		mode = 0
		if len(args) == 1 {
			log.Fatal("Expected: directory")
		}

		path = args[1]

		if _, err := os.Stat(path); os.IsNotExist(err) {
			log.Fatal("Directory doesn't exist or you have insufficient permissions to it")
		}
	} else if args[0] == "--export" || args[0] == "-e" {
		mode = 1
		if len(args) == 1 {
			log.Fatal("Expected: directory")
		}

		path = args[1]

		if _, err := os.Stat(path); os.IsNotExist(err) {
			log.Fatal("Directory doesn't exist or you have insufficient permissions to it")
		}
	}

	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	db, err = sql.Open("mysql", os.Getenv("MARIADB_CONN"))
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	if mode == 0 {
		loadSQLFile("sql_files/YeetTables.sql")
		loadSQLFile("sql_files/AnimeTables.sql")
		loadSQLFile("sql_files/UserTables.sql")
		loadSQLFile("sql_files/Last.sql")
		loadSQLFile("sql_files/Images.sql")

		loadSQLFile(path + "/structure/DemographicsTable.sql")
		loadSQLFile(path + "/structure/GenresTable.sql")
		loadSQLFile(path + "/structure/ProducersTable.sql")
		loadSQLFile(path + "/structure/RelationsTable.sql")
		loadSQLFile(path + "/structure/StudiosTable.sql")
		loadSQLFile(path + "/structure/ThemesTable.sql")
		loadSQLFile(path + "/structure/TypesTable.sql")
		loadSQLFile(path + "/structure/Songs.sql")

		filepath.Walk(path+"/animes", func(path string, info os.FileInfo, err error) error {
			if err != nil {
				log.Fatal(err)
			}
			if info.Name() == "animes" {
				return nil
			}

			loadSQLFile(path)
			return nil
		})
		loadSQLFile(path + "/structure/AnimeRelations.sql")
	} else {
		path += "/" + strings.Split(os.Getenv("MARIADB_CONN"), "/")[1]
		os.Mkdir(path, os.ModeDir)
		os.Mkdir(path+"/structure", os.ModeDir)
		exportStructuralData(path, "Demographic")
		exportStructuralData(path, "Genre")
		exportStructuralData(path, "Producer")
		exportStructuralData(path, "Relation")
		exportStructuralData(path, "Studio")
		exportStructuralData(path, "Theme")
		exportStructuralData(path, "Type")
		fmt.Println("Exported database structure...")

		exportSongs(path)
		fmt.Println("Exported songs...")

		os.Mkdir(path+"/animes", os.ModeDir)

		rows, err := db.Query("SELECT AnimeID FROM Animes ORDER BY AnimeID;")
		if err != nil {
			log.Fatal(err)
		}

		for rows.Next() {
			id := 0
			err = rows.Scan(&id)
			if err != nil {
				log.Fatal(err)
			}

			exportAnimeData(id, path)
		}

		exportRelations(path)
		fmt.Println("Exported anime relations...")

		fmt.Println("Database exported successfully!")
	}
}
