package main

import (
	"github.com/go-sql-driver/mysql"
)

type Anime struct {
	AnimeID      int
	AnimeTitle   string
	EnglishTitle string
	AnimeDesc    string
	TypeID       int
	AiredBegin   mysql.NullTime
	AiredEnd     mysql.NullTime
	Premiered    string
	Duration     string
	PosterURL    string
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
	AnimeID    int
	OtherID    int
	RelationID int
	OtherName  string
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
	UserProfileImageUrl    string
	UserProfileImagePoster string
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
