package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func filterGetByID(table string) func(c echo.Context) error {
	q := fmt.Sprintf("SELECT * FROM %v WHERE %vID = ?", table, table[:len(table)-1])
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			return c.NoContent(http.StatusBadRequest)
		}
		row := db.QueryRow(q, id)
		filter := Filter{}
		err = row.Scan(&filter.ID, &filter.Name)
		if err != nil {
			if err == sql.ErrNoRows {
				c.NoContent(http.StatusBadRequest)
			}
			return err
		}
		return c.JSON(http.StatusOK, filter)

	}
}
func filterGetAll(table string) func(c echo.Context) error {
	sql := fmt.Sprintf("SELECT * FROM %v ORDER BY %vName ASC", table, table[:len(table)-1])
	return func(c echo.Context) error {
		rows, err := db.Query(sql)
		if err != nil {
			return err
		}
		filters := []Filter{}
		for rows.Next() {
			filter := Filter{}
			err := rows.Scan(&filter.ID, &filter.Name)
			if err != nil {
				return err
			}
			filters = append(filters, filter)
		}
		return c.JSON(http.StatusOK, filters)
	}
}
func filterGetAllArr(table string) ([]Filter, error) {
	sql := fmt.Sprintf("SELECT * FROM %v ORDER BY %vName ASC", table, table[:len(table)-1])
	rows, err := db.Query(sql)
	if err != nil {
		return []Filter{}, err
	}
	filters := []Filter{}
	for rows.Next() {
		filter := Filter{}
		err := rows.Scan(&filter.ID, &filter.Name)
		if err != nil {
			return []Filter{}, err
		}
		filters = append(filters, filter)
	}
	return filters, nil
}
