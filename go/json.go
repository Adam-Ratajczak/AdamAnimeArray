package main

import (
	"github.com/go-sql-driver/mysql"
)

type Anime struct {
	AnimeID    int
	AnimeTitle string
	AnimeDesc  string
	TypeID     int
	AiredBegin mysql.NullTime
	AiredEnd   mysql.NullTime
	Premiered  string
	Duration   string
	PosterURL  string
}
type Song struct {
	SongID     int
	AnimeID    int
	Title      string
	Artist     string
	Type       string
	SpotifyURL string
}
type Episode struct {
	EpisodeID int
	AnimeID   int
	EpisodeNr int
	Title     string
	Aired     mysql.NullTime
	PlayerUrl string
}

type Filter struct {
	ID   int
	Name string
}

type FilterRequest struct {
	Title        string
	Types        []int
	Themes       []int
	Genres       []int
	Producers    []int
	Demographics []int
}
