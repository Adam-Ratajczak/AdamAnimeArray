package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

func filterGetByID(table string) func(c echo.Context) error {
	return func(c echo.Context) error {
		rows, err := db.Query(fmt.Sprintf("SELECT * FROM %v WHERE %vID = %v", table, table[:len(table)-1], c.Param("id")))
		if err != nil {
			return err
		}
		if rows.Next() {
			filter := Filter{}
			rows.Scan(&filter.ID, &filter.Name)
			return c.JSON(http.StatusOK, filter)
		}
		return c.NoContent(http.StatusBadRequest)
	}
}
func filterGetAll(table string) func(c echo.Context) error {
	return func(c echo.Context) error {
		rows, err := db.Query(fmt.Sprintf("SELECT * FROM %v", table))
		if err != nil {
			log.Fatal(err)
			return err
		}
		filters := []Filter{}
		for rows.Next() {
			filter := Filter{}
			rows.Scan(&filter.ID, &filter.Name)
			filters = append(filters, filter)
		}
		return c.JSON(http.StatusOK, filters)
	}
}
