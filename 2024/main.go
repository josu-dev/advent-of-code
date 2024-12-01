package main

import (
	day01 "aofc-2024/day-01"
	"fmt"
	"os"
	"strconv"
	"time"
)

type Solution func() int

var dayToSolution = map[int]Solution{
	1: day01.Solution,
}

func main() {
	if len(os.Args) != 2 {
		fmt.Printf("Usage: %s <day>\n", os.Args[0])
		os.Exit(1)
	}
	day, err := strconv.Atoi(os.Args[1])
	if err != nil {
		fmt.Printf("Invalid day: '%s'\n", os.Args[1])
		os.Exit(1)
	}

	s, ok := dayToSolution[day]
	if !ok {
		fmt.Printf("No solution for day '%d'\n", day)
		os.Exit(1)
	}

	tick := time.Now()
	code := s()
	ms := float64(time.Since(tick).Microseconds()) / 1000.0

	fmt.Printf("\nSolution for day %d took %.4fms\n", day, ms)
	os.Exit(code)
}
