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
			relation := h.ChildText("td")
			relation = strings.Split(relation, ":")[0]
			e.ForEach("a", func(j int, a *colly.HTMLElement) {
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

				write_relation_to_db(anime_id, other_anime_id, relation)
			})
		})
	})

	c.Visit(url)
}

func fix_posters(url, name string) {
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

	c.OnHTML("body", func(e *colly.HTMLElement) {
		url := e.ChildAttr("img[itemprop=\"image\"]", "data-src")

		_, err := db.Exec("UPDATE Animes SET PosterUrl = ? WHERE AnimeID = ?;", url, anime_id)
		if err != nil {
			fmt.Println(err)
		}
	})

	c.Visit(url)
}

func fix_songs(url, name string) {
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

	c.OnHTML("body", func(e *colly.HTMLElement) {
		e.ForEach("div.opnening", func(i int, h *colly.HTMLElement) {
			h.ForEach("tr", func(j int, s *colly.HTMLElement) {
				if strings.Trim(s.ChildText("span.theme-song-title"), " ") == "" {
					return
				}
				song := Song{}
				song.AnimeID = anime_id
				song.Title = strings.Replace(s.ChildText("span.theme-song-title"), "\"", "", -1)
				song.Artist = strings.Replace(s.ChildText("span.theme-song-artist"), "by ", "", -1)
				song.Type = "opening"

				s.ForEach("input", func(k int, link *colly.HTMLElement) {
					if strings.Contains(link.Attr("value"), "spotify") {
						song.SpotifyURL = link.Attr("value")
						return
					}
				})

				write_song_to_db(song)
			})
		})
		e.ForEach("div.ending", func(i int, h *colly.HTMLElement) {
			h.ForEach("tr", func(j int, s *colly.HTMLElement) {
				if strings.Trim(s.ChildText("span.theme-song-title"), " ") == "" {
					return
				}
				song := Song{}
				song.AnimeID = anime_id
				song.Title = strings.Replace(s.ChildText("span.theme-song-title"), "\"", "", -1)
				song.Artist = strings.Replace(s.ChildText("span.theme-song-artist"), "by ", "", -1)
				song.Type = "ending"

				s.ForEach("input", func(k int, link *colly.HTMLElement) {
					if strings.Contains(link.Attr("value"), "spotify") {
						song.SpotifyURL = link.Attr("value")
						return
					}
				})

				write_song_to_db(song)
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

const MAX_CONCURRENT_JOBS = 40

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
			Block{
				Try: func(url, name string) {
					// if find_anime_in_db(name) == -1 {
					// 	steal_anime(url)
					// } else {
					// 	fmt.Println("Skipping!")
					// }
					// fill_relations(url, name)
					// fix_posters(url, name)
					fix_songs(url, name)
				},
				Catch: func(e Exception) {
					fmt.Printf("Caught %v\n", e)
				},
				Finally: func() {
				},
			}.Do(link, title)
			<-waitChan
		}(count)
	})

	for i := a; i < b; i += 50 {
		c.Visit("https://myanimelist.net/topanime.php?limit=" + strconv.FormatInt(int64(i), 10))
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
	// loadSQLFile("sql_files/UserTables.sql")
	// loadSQLFile("sql_files/AnimeTables.sql")
	// loadSQLFile("sql_files/Last.sql")

	steal_series(0, 15000)

	// steal_anime("https://myanimelist.net/anime/32615/Youjo_Senki")
	// steal_anime("https://myanimelist.net/anime/38524/Shingeki_no_Kyojin_Season_3_Part_2")
}
