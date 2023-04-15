package main

import (
	"database/sql"

	"github.com/go-sql-driver/mysql"
)

type Anime struct {
	AnimeID      int
	AnimeTitle   string
	EnglishTitle string
	AnimeDesc    string
	Type         Filter
	AiredBegin   mysql.NullTime
	AiredEnd     mysql.NullTime
	Premiered    string
	Duration     string
	PosterURL    string
	EpisodeNum   int

	Genres       []Filter
	Themes       []Filter
	Producers    []Filter
	Studios      []Filter
	Demographics []Filter
}

type Range struct {
	Animes     []Anime
	AnimeCount int
}

type AnimeRequest struct {
	AnimeBegin int
	AnimeEnd   int
	Mode       int
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
}

type Player struct {
	PlayerID  int
	EpisodeID int
	LangCode  string
	Source    string
	Quality   string
	PlayerUrl string
}

type EpisodePlayers struct {
	EpisodeInfo Episode
	Players     []Player
}

type Lang struct {
	Code    string
	Name    string
	FlagUrl string
}

type Relation struct {
	AnimeID   int
	OtherID   int
	Relation  Filter
	OtherName string
}

type Filter struct {
	ID   int
	Name string
}

type DBInfo struct {
	AnimeCount   int
	Types        []Filter
	Genres       []Filter
	Themes       []Filter
	Producers    []Filter
	Studios      []Filter
	Demographics []Filter
}

type FilterRequest struct {
	ABegin       int
	AEnd         int
	Title        string
	Types        []int
	Themes       []int
	Genres       []int
	Studios      []int
	Producers    []int
	Demographics []int
}

type CreateUserRequest struct {
	UserName     string
	UserEmail    string
	UserPassword string
}

type ChangeUserRequest struct {
	Token                  string
	UserName               string
	UserEmail              string
	UserPassword           string
	UserProfileImageUrl    string
	UserProfileImagePoster string
}

type UserRequest struct {
	UserName               string
	UserEmail              string
	UserProfileImageUrl    sql.NullString
	UserProfileImagePoster sql.NullString
}

type LoginUserRequest struct {
	UserName     string
	UserPassword string
}

type UserAuthRequest struct {
	Token     string
	Privilege string
}

type UserAuth struct {
	UserID int
	Token  string
}

type AnimeUserRequest struct {
	UserID  int
	Token   string
	AnimeID int
}
