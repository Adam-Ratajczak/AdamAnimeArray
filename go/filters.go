package main

import "github.com/labstack/echo/v4"

func filterGetByID(table string) func(c echo.Context) error {

	return func(c echo.Context) error {
		return nil
	}
}
func filterGetAll(table string) func(c echo.Context) error {
	return func(c echo.Context) error {
		return nil
	}
}
