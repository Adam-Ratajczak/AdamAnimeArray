package main

import (
	"database/sql"
	"fmt"
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

	tablesFromSQLsINPATHS("../sql_files/Tables")
	tablesFromSQLsINPATHS("../sql_files/StructuralData")
	tablesFromSQLsINPATHS("../sql_files/AnimeData")
}

func tablesFromSQLsINPATHS(path string) {
	dir, err := os.ReadDir(path)
	if err != nil {
		log.Fatal(err)
	}
	for _, file := range dir {
		b, err := os.ReadFile(path + "/" + file.Name())
		if err != nil {
			log.Fatal(err)
		}
		lines := strings.Split(string(b), "\n")
		var sqls []string
		var buf string
		for _, line := range lines {
			if strings.HasPrefix(line, "--") || line == "" || line == "\n" {
				continue
			}
			buf += line
			if strings.HasSuffix(line, ";") {
				sqls = append(sqls, buf)
				buf = ""
			}
		}
		for _, sql := range sqls {
			fmt.Printf("BEGIN\n %v \nEND\n", sql)
			_, err = db.Exec(sql)
			if err != nil {
				continue
			}
		}
	}
}
