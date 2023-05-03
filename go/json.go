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
	MalLink      string
	MalRank      int
	EpisodeNum   int

	Genres       []Filter
	Themes       []Filter
	Producers    []Filter
	Studios      []Filter
	Demographics []Filter
}

type AnimeShort struct {
	AnimeID    int
	AnimeTitle string
	PosterURL  string
	Type       Filter
	Premiered  string
	EpisodeNum int
}

type Range struct {
	Animes     []AnimeShort
	AnimeCount int
}

type FilterRange struct {
	Animes     []int
	AnimeCount int
}

type AnimeRequest struct {
	AnimeBegin int
	AnimeEnd   int
	Mode       int
}

type SongPlayer struct {
	Source    string
	PlayerUrl string
}

type Song struct {
	SongID  int
	Title   string
	Artist  string
	Type    string
	Players []SongPlayer
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

type BasicUserInfo struct {
	UserID              int
	UserName            string
	UserProfileImageUrl string
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

type UserProgressRequest struct {
	Token   string
	AnimeID int
	EpNum   int
	Mode    int
}

type UserAuth struct {
	UserID int
	Token  string
}

type AnimeUserRequest struct {
	Token   string
	AnimeID int
}

type UserCommentRequest struct {
	Token       string
	AnimeID     int
	OtherID     int
	CommentText string
}

type UserComment struct {
	EntryID     int
	UserID      int
	AnimeID     int
	Replies     []UserComment
	CommentText string
}
