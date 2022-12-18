package main

type Anime struct {
}
type Song struct {
}

type Filter struct {
	ID   int
	name string
}

type FilterRequest struct {
	Title        string
	Types        []int
	Genres       []int
	Producers    []int
	Demographics []int
}
