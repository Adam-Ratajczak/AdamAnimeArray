package main

type Animes struct {
	AnimeTitle   string
	EnglishTitle string
	AnimeDesc    string
	TypeID       int
	AiredBegin   string
	AiredEnd     string
	Premiered    string
	Duration     string
	PosterURL    string
}

type Song struct {
	AnimeID    int
	Title      string
	Artist     string
	Type       string
	SpotifyURL string
}

type Episode struct {
	AnimeID   int
	EpisodeNr int
	Title     string
	Aired     string
}

type Player struct {
	EpisodeID int
	Source    string
	Quality   string
	Lang      string
	Url       string
}

type OgladajAnimeEp struct {
	ID        string `json: "id"`
	Audio     string `json: "audio"`
	Sub       string `json: "sub"`
	Url       string `json: "url"`
	Quality   string `json: "quality"`
	Part      string `json: "part"`
	Sub_group string `json: "sub_group"`
	Sub_img   string `json: "sub_img"`
}

type NekoSamaEp struct {
	ID    int    `json: "id"`
	Title string `json: "title"`
	Url   string `json: "url"`
}

type AnimeWorldPlayer struct {
	Grabber string `json: "grabber"`
	Name    string `json: "name"`
	Target  string `json: "target"`
}

type OgladajAnimePlayer struct {
	Data  string `json: "data"`
	Title string `json: "title"`
}
