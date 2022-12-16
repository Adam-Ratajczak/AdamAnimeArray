package main

import "time"

type animeRequest struct {
	Title  string
	Genre  string
	Theme  string
	Age    string
	Studio string
}

type anime struct {
	AnimeID    int
	AnimeTitle string
	AnimeDesc  string
	AiredBegin time.Time
	AiredEnd   time.Time
	Premiered  string
	Duration   string
	PosterUrl  string
}
