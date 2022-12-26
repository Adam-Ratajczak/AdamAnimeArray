package main

type Anime struct {
	AnimeID    int
	AnimeTitle string
	AnimeDesc  string
	TypeID     int
	AiredBegin interface{}
	AiredEnd   interface{}
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
	Aired     interface{}
	PlayerUrl string
}

type Filter struct {
	ID   int
	Name string
}

type FilterRequest struct {
	Title        string
	Type         int
	Themes       []int
	Genres       []int
	Producers    []int
	Demographics []int
}
