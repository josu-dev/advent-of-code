package day01

import (
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func partOne(c string) int {
	lines := strings.Split(c, "\n")
	ids1 := make([]int, len(lines))
	ids2 := make([]int, len(lines))

	for i, line := range lines {
		ids := strings.Split(line, "   ")
		ids1[i], _ = strconv.Atoi(ids[0])
		ids2[i], _ = strconv.Atoi(ids[1])
	}

	slices.Sort(ids1)
	slices.Sort(ids2)

	diff := 0
	for i := range len(lines) {
		diff += abs(ids1[i] - ids2[i])
	}

	fmt.Printf("%d\n", diff)
	return 0
}

func partTwo(c string) int {
	lines := strings.Split(c, "\n")
	counter := make(map[int]int)
	ids1 := make([]int, len(lines))

	for i, line := range lines {
		ids := strings.Split(line, "   ")
		ids1[i], _ = strconv.Atoi(ids[0])
		id2, _ := strconv.Atoi(ids[1])
		counter[id2] = counter[id2] + 1
	}

	total := 0
	for _, id := range ids1 {
		total += id * counter[id]
	}

	fmt.Printf("%d\n", total)
	return 0
}

func Solution() int {
	c, err := os.ReadFile("./day-01/input.txt")
	if err != nil {
		fmt.Print(err)
		return 1
	}

	s := string(c[:len(c)-1])

	if partOne(s) != 0 {
		return 1
	}

	if partTwo(s) != 0 {
		return 1
	}

	return 0
}
