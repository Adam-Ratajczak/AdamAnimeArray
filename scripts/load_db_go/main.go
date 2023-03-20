package main

import (
	"database/sql"
	"log"
	"os"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
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
	sqlFromFile("../sql_files/Tables/YeetTables.sql")
	sqlFromFile("../sql_files/Tables/UserTables.sql")
	sqlFromFile("../sql_files/Tables/AnimeTables.sql")
	sqlFromFile("../sql_files/Tables/Last.sql")
	tablesFromSQLsINPATHS("../sql_files/StructuralData")
	tablesFromSQLsINPATHS("../sql_files/AnimeData")
}

<<<<<<< HEAD
	tablesFromSQLsINPATHS("../sql_files/Tables")
	tablesFromSQLsINPATHS("../sql_files/StructuralData")
	tablesFromSQLsINPATHS("../sql_files/AnimeData")
=======
func sqlFromFile(path string) {
	b, err := os.ReadFile(path)
	if err != nil {
		log.Fatal(err)
	}
	querys := strings.Split(string(b), ";\n")
	for _, query := range querys {
		if query != "" && query != "\n" {
			log.Println(query)
			db.Exec(query)
		}
	}
>>>>>>> 8eb6c38 (fix go load_db)
}

func tablesFromSQLsINPATHS(path string) {
	dir, err := os.ReadDir(path)
	if err != nil {
		log.Fatal(err)
	}
	for _, file := range dir {
		sqlFromFile(path + "/" + file.Name())
	}
}
