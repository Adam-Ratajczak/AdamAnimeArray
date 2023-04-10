package main

import (
	"fmt"
	"strings"
)

func CompareTwoStrings(stringOne, stringTwo string) float64 {
	removeSpaces(&stringOne, &stringTwo)

	if value := returnEarlyIfPossible(stringOne, stringTwo); value >= 0 {
		return value
	}

	firstBigrams := make(map[string]int)
	for i := 0; i < len(stringOne)-1; i++ {
		a := fmt.Sprintf("%c", stringOne[i])
		b := fmt.Sprintf("%c", stringOne[i+1])

		bigram := a + b

		var count int

		if value, ok := firstBigrams[bigram]; ok {
			count = value + 1
		} else {
			count = 1
		}

		firstBigrams[bigram] = count
	}

	var intersectionSize float32
	intersectionSize = 0

	for i := 0; i < len(stringTwo)-1; i++ {
		a := fmt.Sprintf("%c", stringTwo[i])
		b := fmt.Sprintf("%c", stringTwo[i+1])

		bigram := a + b

		var count int

		if value, ok := firstBigrams[bigram]; ok {
			count = value
		} else {
			count = 0
		}

		if count > 0 {
			firstBigrams[bigram] = count - 1
			intersectionSize = intersectionSize + 1
		}
	}

	return float64(2.0*intersectionSize) / float64(len(stringOne)+len(stringTwo)-2)
}

func removeSpaces(stringOne, stringTwo *string) {
	*stringOne = strings.Replace(*stringOne, " ", "", -1)
	*stringTwo = strings.Replace(*stringTwo, " ", "", -1)
}

func returnEarlyIfPossible(stringOne, stringTwo string) float64 {
	// if both are empty strings
	if len(stringOne) == 0 && len(stringTwo) == 0 {
		return 1
	}

	// if only one is empty string
	if len(stringOne) == 0 || len(stringTwo) == 0 {
		return 0
	}

	// identical
	if stringOne == stringTwo {
		return 1
	}

	// both are 1-letter strings
	if len(stringOne) == 1 && len(stringTwo) == 1 {
		return 0
	}

	// if either is a 1-letter string
	if len(stringOne) < 2 || len(stringTwo) < 2 {
		return 0
	}

	return -1
}

func conv_date(date_str string) string {
	date_str = strings.Trim(date_str, "\n ")
	arr := strings.Split(strings.Replace(date_str, ", ", " ", 1), " ")
	if len(arr) < 3 {
		return "null"
	}

	year := arr[2]
	day := arr[1]
	month := arr[0]

	if month == "Jan" {
		month = "01"
	} else if month == "Feb" {
		month = "02"
	} else if month == "Mar" {
		month = "03"
	} else if month == "Apr" {
		month = "04"
	} else if month == "May" {
		month = "05"
	} else if month == "Jun" {
		month = "06"
	} else if month == "Jul" {
		month = "07"
	} else if month == "Aug" {
		month = "08"
	} else if month == "Sep" {
		month = "09"
	} else if month == "Oct" {
		month = "10"
	} else if month == "Nov" {
		month = "11"
	} else if month == "Dec" {
		month = "12"
	}

	result := year + "-" + month + "-" + day

	return result
}
