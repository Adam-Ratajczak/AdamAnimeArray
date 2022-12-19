package main

type Anime struct {
	AnimeID    int
	AnimeTitle string
	AnimeDesc  string
	TypeID     int
	AiredBegin string
	AiredEnd   string
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

type Filter struct {
	ID   int
	Name string
}

type FilterRequest struct {
	Title        string
	Types        []int
	Genres       []int
	Producers    []int
	Demographics []int
}
