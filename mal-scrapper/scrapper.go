package main

import (
	"encoding/json"
	"fmt"
	"math"
	"sort"
	"strconv"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/go-zoox/fetch"

	"github.com/gocolly/colly"
)

func get_french_anime_link(anime_title, url_to_json string) string {
	response, _ := fetch.Get(url_to_json)

	res, err := response.JSON()
	if err != nil {
		fmt.Println(err)
	}

	content := []NekoSamaEp{}
	err = json.Unmarshal([]byte(res), &content)
	if err != nil {
		fmt.Println(err)
	}

	AnimeJSON := NekoSamaEp{}
	max_val := 0.0

	for _, ep := range content {
		val := CompareTwoStrings(anime_title, ep.Title)

		if val > max_val {
			max_val = val
			AnimeJSON = ep
		}
	}

	if max_val > 0.8 {
		return "https://neko-sama.fr/" + AnimeJSON.Url
	}

	return ""
}

func steal_anime(url string) int {
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

	anime_id := -1
	worthit := false
	movie := false
	episodes := make(map[int]Episode)
	ogladajanime_ep_id := make(map[int]string)
	gogoanime_ep_links := make(map[int]string)
	gogoanime_ep_sources := make(map[int]string)
	link := ""
	a := Animes{}

	link_stealing_flags := make(map[string]bool)
	link_stealing_flags["pl"] = true
	link_stealing_flags["en"] = true
	link_stealing_flags["de"] = true
	link_stealing_flags["fr"] = true
	link_stealing_flags["it"] = true

	c.OnHTML("body > #myanimelist", func(e *colly.HTMLElement) {
		if strings.Contains(e.Request.URL.Path, "episode") {
			return
		}

		a.AnimeTitle = strings.Trim(strings.Replace(e.ChildText("h1.title-name"), "\n", "", -1), " ")
		if a.AnimeTitle == "" {
			return
		}

		a.EnglishTitle = e.ChildText("p.title-english")
		a.PosterURL = e.ChildAttr("img[itemprop=\"image\"]", "data-src")
		a.AnimeDesc = e.ChildText("p[itemprop=\"description\"]")

		e.ForEach("div.spaceit_pad", func(n int, pad *colly.HTMLElement) {
			pad_type := pad.ChildText("span.dark_text")
			if pad_type == "" {
				return
			}

			if pad_type == "Type:" {
				anime_type := pad.ChildText("a")
				a.TypeID = get_type_in_db(anime_type)
			} else if pad_type == "Aired:" {
				anime_aired := strings.Trim(strings.Split(pad.Text, "\n")[2], " ")
				arr := strings.Split(anime_aired, " to ")
				if len(arr) < 2 {
					movie = true
					a.AiredBegin = conv_date(anime_aired)
					a.AiredEnd = conv_date(anime_aired)
				} else {
					a.AiredBegin = conv_date(arr[0])
					a.AiredEnd = conv_date(arr[1])
				}
			} else if pad_type == "Premiered:" {
				a.Premiered = pad.ChildText("a")
			} else if pad_type == "Duration:" {
				a.Duration = strings.Trim(strings.Split(pad.Text, "\n")[2], " ")
			}
		})
		fake_link := "https://ogladajanime.pl/search/name/"

		response, _ := fetch.Post("https://ogladajanime.pl/command_manager.php?action=search_anime", &fetch.Config{
			Headers: map[string]string{
				"authority":    "ogladajanime.pl",
				"origin":       "https://ogladajanime.pl",
				"referer":      fake_link,
				"user-agent":   "Mozilla/5.0",
				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
			},
			Body: map[string]string{
				"search":      a.AnimeTitle,
				"search_type": "name",
			},
		})

		res, err := response.JSON()
		if err != nil {
			fmt.Println(err)
		}
		js_code := OgladajAnimePlayer{}
		err = json.Unmarshal([]byte(res), &js_code)
		if err != nil {
			fmt.Println(err)
			return
		}

		marker := "chujwdupiepsa"

		js_code.Data = strings.Replace(js_code.Data, "\\n", "\n", -1)
		js_code.Data = strings.Replace(js_code.Data, "\\t", "\t", -1)
		js_code.Data = strings.Replace(js_code.Data, "<h5 class=\"card-title text-dark\">", marker, -1)
		js_code.Data = strings.Replace(js_code.Data, "</h5>", marker, -1)
		arr := strings.Split(js_code.Data, marker)

		link = ""

		max_val := 0.0

		for key, header := range arr {
			if key%2 == 0 {
				continue
			}

			header = strings.Replace(header, "\t", "", -1)
			header = strings.Replace(header, "\n", "", -1)
			header = strings.Replace(header, "<a href=\"", "", -1)
			header = strings.Replace(header, " onClick=\"", "", -1)
			header = strings.Replace(header, "</a>", "", -1)
			header = strings.Replace(header, ">", "", -1)
			header = strings.Replace(header, ":", "", -1)
			header = strings.Replace(header, ";", "", -1)

			content := strings.Split(header, "\"")

			value := math.Max(CompareTwoStrings(a.AnimeTitle, content[2]), CompareTwoStrings(a.EnglishTitle, content[2]))
			if value < 0.8 {
				continue
			}

			if value > max_val {
				max_val = value
				link = "https://ogladajanime.pl" + content[0]
			}
		}

		if link == "" {
			return
		}

		c.Visit(link)

		keySlice := make([]int, 0)
		for key, _ := range ogladajanime_ep_id {
			keySlice = append(keySlice, key)
		}

		// Now sort the slice
		sort.Ints(keySlice)

		if movie {
			ep := Episode{}
			ep.Title = a.EnglishTitle
			ep.Aired = a.AiredBegin
			ep.EpisodeNr = 1
			episodes[1] = ep
		} else {
			c.Visit(url + "/episode")
		}

		if len(episodes) == 0 {
			for _, key := range keySlice {
				ep := Episode{}
				ep.EpisodeNr = key
				ep.Title = a.AnimeTitle + " Ep. " + strconv.FormatInt(int64(ep.EpisodeNr), 10)
				episodes[key] = ep
			}
		}

		if !worthit {
			fmt.Println(a.AnimeTitle, "Not worth it!")
			return
		}

		anime_id = write_anime_to_db(a)

		if anime_id == -1 {
			fmt.Println(a.AnimeTitle, "Something went wrong!")
			return
		}

		for _, ep := range episodes {
			ep.AnimeID = anime_id

			write_episode_to_db(ep)
		}

		e.ForEach("div.opnening", func(i int, h *colly.HTMLElement) {
			h.ForEach("tr", func(j int, s *colly.HTMLElement) {
				title := s.ChildText("td:nth-of-type(2)")
				if title == "" {
					return
				}
				if strings.Contains(title, "Music") {
					return
				}

				title = strings.Split(title, "\"")[1]
				song := Song{}
				song.AnimeID = anime_id
				song.Title = title
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
				title := s.ChildText("td:nth-of-type(2)")
				if title == "" {
					return
				}
				if strings.Contains(title, "Music") {
					return
				}

				title = strings.Split(title, "\"")[1]
				song := Song{}
				song.AnimeID = anime_id
				song.Title = title
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

		e.ForEach("div.spaceit_pad", func(n int, pad *colly.HTMLElement) {
			pad_type := pad.ChildText("span.dark_text")
			if pad_type == "" {
				return
			}

			if pad_type == "Studios:" {
				pad.ForEach("a", func(i int, h *colly.HTMLElement) {
					id := get_studios_in_db(h.Text)
					write_binding_to_db("Studio", anime_id, id)
				})
			} else if pad_type == "Producers:" {
				pad.ForEach("a", func(i int, h *colly.HTMLElement) {
					id := get_producers_in_db(h.Text)
					write_binding_to_db("Producer", anime_id, id)
				})
			} else if pad_type == "Genres:" {
				pad.ForEach("a", func(i int, h *colly.HTMLElement) {
					id := get_genres_in_db(h.Text)
					write_binding_to_db("Genre", anime_id, id)
				})
			} else if pad_type == "Themes:" {
				pad.ForEach("a", func(i int, h *colly.HTMLElement) {
					id := get_themes_in_db(h.Text)
					write_binding_to_db("Theme", anime_id, id)
				})
			} else if pad_type == "Demographic:" {
				pad.ForEach("a", func(i int, h *colly.HTMLElement) {
					id := get_demographics_in_db(h.Text)
					write_binding_to_db("Demographic", anime_id, id)
				})
			}
		})

		for _, key := range keySlice {
			if !link_stealing_flags["pl"] {
				break
			}
			EpisodeID := find_ep_in_db(anime_id, key)
			if EpisodeID == -1 {
				continue
			}

			fake_link := link + "/" + strconv.FormatInt(int64(key), 10)

			response, _ := fetch.Post("https://ogladajanime.pl/command_manager.php?action=get_player_list", &fetch.Config{
				Headers: map[string]string{
					"authority":    "ogladajanime.pl",
					"origin":       "https://ogladajanime.pl",
					"referer":      fake_link,
					"user-agent":   "Mozilla/5.0",
					"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
				},
				Body: map[string]string{
					"id": ogladajanime_ep_id[key],
				},
			})

			res, err := response.JSON()
			if err != nil {
				fmt.Println(err)
				continue
			}

			res = strings.Split(res, "\\\"players\\\":[")[1]
			res = strings.Split(res, "],\\\"ad\\\":")[0]
			res = strings.Replace(res, "\\\"", "\"", -1)
			res = strings.Replace(res, "\":\"", "\": \"", -1)
			res = strings.Replace(res, "},{", "}[]{", -1)
			players := strings.Split(res, "[]")

			for _, player_str := range players {
				player_json := OgladajAnimeEp{}

				err = json.Unmarshal([]byte(player_str), &player_json)
				if err != nil {
					fmt.Println(err)
					continue
				}

				if player_json.Sub == "" {
					player_json.Sub = player_json.Audio
				}

				response, _ = fetch.Post("https://ogladajanime.pl/command_manager.php?action=change_player_url", &fetch.Config{
					Headers: map[string]string{
						"authority":    "ogladajanime.pl",
						"origin":       "https://ogladajanime.pl",
						"referer":      fake_link,
						"user-agent":   "Mozilla/5.0",
						"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
					},
					Body: map[string]string{
						"id": player_json.ID,
					},
				})

				res, err = response.JSON()
				if err != nil {
					fmt.Println(err)
					continue
				}
				player := OgladajAnimePlayer{}

				err = json.Unmarshal([]byte(res), &player)
				if err != nil {
					fmt.Println(err)
					continue
				}

				p := Player{}
				p.EpisodeID = EpisodeID
				p.Lang = player_json.Sub
				p.Quality = player_json.Quality
				p.Source = player_json.Url
				p.Url = player.Data

				write_player_to_db(p)
			}
		}

		if link_stealing_flags["en"] {
			link = "https://www3.gogoanimes.fi/search.html?keyword=" + strings.Replace(a.AnimeTitle, " ", "-", -1)
			fmt.Println(link)
			c.Visit(link)
		}

		if link_stealing_flags["de"] {
			c.Visit("https://aniworld.to/animes")
		}

		if link_stealing_flags["fr"] {
			vostfr_link := get_french_anime_link(a.AnimeTitle, "https://neko-sama.fr/animes-search-vostfr.json?4f0132ead4638d44be1bde76eedfdcec")
			if vostfr_link != "" {
				c.Visit(vostfr_link)
			}

			vf_link := get_french_anime_link(a.AnimeTitle, "https://neko-sama.fr/animes-search-vf.json?4f0132ead4638d44be1bde76eedfdcec")
			if vf_link != "" {
				c.Visit(vf_link)
			}
		}

		if link_stealing_flags["it"] {
			c.Visit("https://www.animeworld.tv/search?keyword=" + strings.Replace(a.AnimeTitle, " ", "+", -1))
		}
	})

	c.OnHTML("table.episode_list", func(e *colly.HTMLElement) {
		e.ForEach("tr.episode-list-data", func(i int, h *colly.HTMLElement) {
			ep_num, err := strconv.Atoi(h.ChildText("td.episode-number"))
			if err != nil {
				return
			}

			ep := Episode{}

			ep.EpisodeNr = ep_num
			ep.Title = h.ChildText("td.episode-title a")
			ep.Aired = conv_date(h.ChildText("td.episode-aired"))

			episodes[ep_num] = ep
		})
	})

	c.OnHTML("body #site-content", func(e *colly.HTMLElement) {
		if !strings.Contains(e.Request.URL.Path, "search") {
			return
		}

		link = ""

		max_val := 0.0

		e.ForEach("h5.card-title > a", func(i int, h *colly.HTMLElement) {
			value := math.Max(CompareTwoStrings(a.AnimeTitle, h.Text), CompareTwoStrings(a.EnglishTitle, h.Text))
			if value < 0.8 {
				return
			}

			if value > max_val {
				max_val = value
				link = "https://ogladajanime.pl" + h.Attr("href")
			}
		})

		if link == "" {
			return
		}

		c.Visit(link)
	})

	c.OnHTML("div #ep_list", func(e *colly.HTMLElement) {
		e.ForEach("li", func(i int, h *colly.HTMLElement) {
			ep_num, err := strconv.ParseInt(h.ChildText("span"), 10, 32)
			if err != nil {
				fmt.Println(err)
				ogladajanime_ep_id[i+1] = h.Attr("ep_id")
			} else {
				if ep_num == 0 {
					return
				}

				ogladajanime_ep_id[int(ep_num)] = h.Attr("ep_id")
			}
		})

		fake_link := link + "/1"

		response, _ := fetch.Post("https://ogladajanime.pl/command_manager.php?action=get_player_list", &fetch.Config{
			Headers: map[string]string{
				"authority":    "ogladajanime.pl",
				"origin":       "https://ogladajanime.pl",
				"referer":      fake_link,
				"user-agent":   "Mozilla/5.0",
				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
			},
			Body: map[string]string{
				"id": ogladajanime_ep_id[1],
			},
		})

		res, err := response.JSON()
		if err != nil {
			fmt.Println(err)
			return
		}

		res = strings.Split(res, "\\\"players\\\":[")[1]
		res = strings.Split(res, "],\\\"ad\\\":")[0]
		res = strings.Replace(res, "\\\"", "\"", -1)
		res = strings.Replace(res, "\":\"", "\": \"", -1)
		res = strings.Replace(res, "},{", "}[]{", -1)
		players := strings.Split(res, "[]")

		if players[0] != "" {
			worthit = true
		}
	})

	c.OnHTML("ul.items", func(e *colly.HTMLElement) {
		max_val := 0.0

		e.ForEach("p.name > a", func(i int, h *colly.HTMLElement) {
			value := math.Max(CompareTwoStrings(a.AnimeTitle, h.Text), CompareTwoStrings(a.EnglishTitle, h.Text))
			if value > max_val {
				max_val = value
				link = "https://www3.gogoanimes.fi" + h.Attr("href")
			}
		})

		c.Visit(link)
	})

	c.OnHTML("div.anime_video_body #load_ep", func(e *colly.HTMLElement) {
		counter := find_ep_num_in_db(anime_id)

		for i := 1; i <= counter; i++ {
			c.Visit("https://www3.gogoanimes.fi/" + strings.Split(link, "/")[4] + "-episode-" + strconv.FormatInt(int64(i), 10))

			for key, link := range gogoanime_ep_links {
				EpID := find_ep_in_db(anime_id, i)
				if EpID == -1 {
					continue
				}

				p := Player{}
				p.EpisodeID = EpID
				p.Lang = "en"
				p.Quality = "720p"
				p.Source = gogoanime_ep_sources[key]
				p.Url = link

				write_player_to_db(p)
			}

			for k := range gogoanime_ep_links {
				delete(gogoanime_ep_links, k)
			}

			for k := range gogoanime_ep_sources {
				delete(gogoanime_ep_sources, k)
			}
		}
	})

	c.OnHTML("div.anime_muti_link > ul", func(e *colly.HTMLElement) {
		e.ForEach("li > a", func(i int, h *colly.HTMLElement) {
			gogoanime_ep_links[i] = h.Attr("data-video")

			source := h.Text
			source = strings.Replace(source, "Choose this server", "", -1)
			source = strings.Replace(source, "\"", "", -1)
			source = strings.Replace(source, "\n", "", -1)
			source = strings.Trim(source, " ")
			gogoanime_ep_sources[i] = source
		})
	})

	c.OnHTML("#seriesContainer", func(e *colly.HTMLElement) {
		max_val := 0.0
		e.ForEach("li > a", func(i int, h *colly.HTMLElement) {
			alternative_titles := strings.Split(h.Attr("data-alternative-title"), ", ")

			for _, title := range alternative_titles {
				value := math.Max(CompareTwoStrings(a.AnimeTitle, title), CompareTwoStrings(a.EnglishTitle, title))

				if value > max_val {
					max_val = value
					link = "https://aniworld.to/" + h.Attr("href")
				}
			}
		})

		c.Visit(link)
	})

	hold_stealing := true

	c.OnHTML("#stream > ul:first-of-type", func(e *colly.HTMLElement) {
		if !hold_stealing {
			return
		}

		hold_stealing = false

		e.ForEach("a", func(i int, h *colly.HTMLElement) {
			c.Visit("https://aniworld.to/" + h.Attr("href"))
		})

		hold_stealing = true
	})

	ep_nr := -1

	c.OnHTML("table.seasonEpisodesList", func(e *colly.HTMLElement) {
		if hold_stealing {
			return
		}
		arr := find_episode_names_in_db(anime_id)

		for _, ep := range arr {
			e.ForEachWithBreak("a", func(i int, h *colly.HTMLElement) bool {
				possible := h.ChildText("span")
				val := CompareTwoStrings(ep.Title, possible)

				if val >= 0.8 {
					ep_nr = ep.EpisodeNr
					c.Visit("https://aniworld.to/" + h.Attr("href"))
					return false
				}

				return true
			})
		}
	})

	c.OnHTML("a.watchEpisode", func(e *colly.HTMLElement) {
		ep := Player{}
		ep.EpisodeID = find_ep_in_db(anime_id, ep_nr)
		ep.Lang = "de"
		ep.Quality = "720p"
		ep.Source = e.ChildText("h4")
		ep.Url = "https://aniworld.to/" + e.Attr("href")

		write_player_to_db(ep)
	})

	c.OnHTML("div.episodes", func(e *colly.HTMLElement) {
		e.ForEach("a.play", func(i int, h *colly.HTMLElement) {
			ep_nr = i + 1
			c.Visit("https://neko-sama.fr" + h.Attr("href"))
		})
	})

	c.OnResponse(func(r *colly.Response) {
		if r.Request.URL.Host == "neko-sama.fr" {
			response_body := string(r.Body)
			if strings.Contains(response_body, "var video = [];") {
				response_body = strings.Split(response_body, "var video = [];")[1]
				response_body = strings.Split(response_body, "jQuery(document).ready(function($) {")[0]
				response_body = strings.Replace(response_body, "\n", "", -1)
				response_body = strings.Trim(response_body, " ")
			}
			arr := strings.Split(response_body, ";        ")

			for _, link := range arr {
				link = strings.Split(link, " = ")[1]
				link = strings.Replace(link, "'", "", -1)
				link = strings.Replace(link, ";", "", -1)

				source := link
				source = strings.Replace(source, "https://", "", -1)
				source = strings.Replace(source, "www.", "", -1)
				source = strings.Split(source, ".")[0]

				p := Player{}
				p.EpisodeID = find_ep_in_db(anime_id, ep_nr)
				p.Lang = "fr"
				p.Quality = "720p"
				p.Url = link
				p.Source = source

				write_player_to_db(p)
			}
		}
	})

	c.OnHTML("div.film-list", func(e *colly.HTMLElement) {
		if !strings.Contains(e.Request.URL.Path, "search") {
			return
		}

		link := ""
		max_val := 0.0
		e.ForEach("a.name", func(i int, h *colly.HTMLElement) {
			val := math.Max(CompareTwoStrings(a.AnimeTitle, h.Text), CompareTwoStrings(a.EnglishTitle, h.Text))

			if val > max_val {
				max_val = val
				link = h.Attr("href")
			}
		})

		if max_val > 0.8 {
			c.Visit("https://www.animeworld.tv" + link)
		} else {
			c.Visit("https://www.animeworld.tv" + e.ChildAttr("a.name", "href"))
		}
	})

	c.OnHTML("body", func(e *colly.HTMLElement) {
		if e.Request.URL.Host != "www.animeworld.tv" {
			return
		}
		it_anime_id := e.ChildAttr("#player", "data-anime-id")
		if it_anime_id == "" {
			return
		}
		e.ForEach("li.episode > a", func(i int, h *colly.HTMLElement) {
			nr, err := strconv.ParseInt(h.Text, 10, 32)

			if err != nil {
				return
			}

			animeworld_ep_id := h.Attr("data-id")
			response, _ := fetch.Get("https://www.animeworld.tv/api/episode/info?id=" + animeworld_ep_id + "&alt=0")
			res, err := response.JSON()
			if err != nil {
				fmt.Println(err)
				return
			}
			PlayerJSON := AnimeWorldPlayer{}

			err = json.Unmarshal([]byte(res), &PlayerJSON)
			if err != nil {
				fmt.Println(err)
				return
			}

			source := PlayerJSON.Grabber
			source = strings.Replace(source, "https://", "", -1)
			source = strings.Replace(source, "www.", "", -1)
			arr := strings.Split(source, ".")

			p := Player{}
			p.EpisodeID = find_ep_in_db(anime_id, int(nr))
			p.Lang = "it"
			p.Quality = "1080p"
			if strings.Contains(arr[0], "server") {
				p.Source = arr[1]
			} else {
				p.Source = arr[0]
			}

			p.Url = PlayerJSON.Grabber

			write_player_to_db(p)
		})
	})

	c.Visit(url)

	return anime_id
}
