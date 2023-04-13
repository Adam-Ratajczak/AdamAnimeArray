package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gocolly/colly"
	"github.com/joho/godotenv"
)

var db *sql.DB

const MODE = 0
const MAX_CONCURRENT_JOBS = 15

func loadSQLFile(path string) error {
	file, err := os.ReadFile(path)
	if err != nil {
		return err
	}
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	defer func() {
		tx.Rollback()
	}()
	for _, q := range strings.Split(string(file), ";") {
		q := strings.TrimSpace(q)
		if q == "" {
			continue
		}
		if _, err := tx.Exec(q); err != nil {
			log.Fatal(err)
		}
	}
	return tx.Commit()
}

func fill_relations(url, name string) {
	anime_id := find_anime_in_db(name)
	if anime_id == -1 {
		return
	}

	c := colly.NewCollector()
	c.SetRequestTimeout(120 * time.Second)
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL)
	})

	c.OnResponse(func(r *colly.Response) {
		fmt.Println("Got a response from", r.Request.URL)
	})

	c.OnError(func(r *colly.Response, e error) {
		fmt.Println("Got this error:", e)
	})

	c.OnHTML("table.anime_detail_related_anime", func(e *colly.HTMLElement) {
		e.ForEach("tr", func(i int, h *colly.HTMLElement) {
			relation := h.ChildText("td.ar")
			relation = strings.Split(relation, ":")[0]
			h.ForEach("a", func(j int, a *colly.HTMLElement) {
				link := a.Attr("href")

				if !strings.Contains(link, "anime") {
					return
				}
				other_anime_id := find_anime_in_db(a.Text)

				if other_anime_id == -1 {
					return
				}

				if relation_exists(anime_id, other_anime_id) {
					return
				}

				relation_id := get_relation_in_db(relation)

				write_relation_to_db(anime_id, other_anime_id, relation_id)
			})
		})
	})

	c.Visit(url)
}

type Block struct {
	Try     func(string, string)
	Catch   func(Exception)
	Finally func()
}

var ErrBlock = Block{
	Try: func(url, name string) {
		if MODE == 0 {
			if find_anime_in_db(name) == -1 {
				steal_anime(url)
			} else {
				fmt.Println("Skipping!")
			}
		} else if MODE == 1 {
			fill_relations(url, name)
		}
	},
	Catch: func(e Exception) {
		fmt.Printf("Caught %v\n", e)
	},
	Finally: func() {
	},
}

type Exception interface{}

func (tcf Block) Do(url, name string) {
	if tcf.Finally != nil {
		defer tcf.Finally()
	}
	if tcf.Catch != nil {
		defer func() {
			if r := recover(); r != nil {
				tcf.Catch(r)
			}
		}()
	}
	tcf.Try(url, name)
}

func steal_series(a, b int) {
	c := colly.NewCollector()
	c.SetRequestTimeout(120 * time.Second)
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL)
	})

	c.OnResponse(func(r *colly.Response) {
		fmt.Println("Got a response from", r.Request.URL)
	})

	c.OnError(func(r *colly.Response, e error) {
		fmt.Println("Got this error:", e)
	})

	waitChan := make(chan struct{}, MAX_CONCURRENT_JOBS)
	count := 0

	c.OnHTML("tr.ranking-list", func(e *colly.HTMLElement) {
		link := e.ChildAttr("h3 > a", "href")
		title := e.ChildText("h3 > a")

		waitChan <- struct{}{}
		count++
		go func(count int) {
			ErrBlock.Do(link, title)
			<-waitChan
		}(count)
	})

	for i := a; i < b; i += 50 {
		c.Visit("https://myanimelist.net/topanime.php?limit=" + strconv.FormatInt(int64(i), 10))
	}
}

func steal_alpha(url string) {
	c := colly.NewCollector()
	c.SetRequestTimeout(120 * time.Second)
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL)
	})

	c.OnResponse(func(r *colly.Response) {
		fmt.Println("Got a response from", r.Request.URL)
	})

	valid := true

	c.OnError(func(r *colly.Response, e error) {
		fmt.Println("Got this error:", e)
		valid = false
	})

	waitChan := make(chan struct{}, MAX_CONCURRENT_JOBS)
	count := 0

	c.OnHTML("div.list tr", func(e *colly.HTMLElement) {
		link := e.ChildAttr("div.title a:first-of-type", "href")
		title := strings.Trim(strings.Replace(e.ChildText("div.title a:first-of-type"), "\n", "", -1), " ")

		waitChan <- struct{}{}
		count++
		go func(count int) {
			ErrBlock.Do(link, title)
			<-waitChan
		}(count)
	})

	for i := 0; valid; i += 50 {
		c.Visit(url + "&show=" + strconv.FormatInt(int64(i), 10))
	}
}

func steal_genre(url string, a, b int) {
	c := colly.NewCollector()
	c.SetRequestTimeout(120 * time.Second)
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL)
	})

	c.OnResponse(func(r *colly.Response) {
		fmt.Println("Got a response from", r.Request.URL)
	})

	c.OnError(func(r *colly.Response, e error) {
		fmt.Println("Got this error:", e)
	})

	waitChan := make(chan struct{}, MAX_CONCURRENT_JOBS)
	count := 0

	c.OnHTML("div.seasonal-anime", func(e *colly.HTMLElement) {
		link := e.ChildAttr("a.link-title", "href")
		title := strings.Trim(strings.Replace(e.ChildText("a.link-title"), "\n", "", -1), " ")

		waitChan <- struct{}{}
		count++
		go func(count int) {
			ErrBlock.Do(link, title)
			<-waitChan
		}(count)
	})

	for i := a; i <= b; i++ {
		c.Visit(url + "?page=" + strconv.FormatInt(int64(i), 10))
	}
}

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

	// loadSQLFile("sql_files/YeetTables.sql")
	// loadSQLFile("sql_files/AnimeTables.sql")
	// loadSQLFile("sql_files/UserTables.sql")
	// loadSQLFile("sql_files/Last.sql")

	arr := []string{".", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"}

	for _, key := range arr {
		steal_alpha("https://myanimelist.net/anime.php?letter=" + key)
		fmt.Println(key + ": waiting")
		time.Sleep(5000)
	}
}
