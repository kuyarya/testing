package models

import (
	"sort"
)

type History struct {
	ID     uint `json:"id"`
	UserID uint `json:"user_id"`
}

func GetHistory(userID uint) ([]History, error) {
	var histories []History
	rows, err := DB.Query("SELECT * FROM histories WHERE user_id = ?", userID)
	if err != nil {
		return histories, err
	}
	for rows.Next() {
		var h History
		err = rows.Scan(&h.ID, &h.UserID)
		if err != nil {
			return histories, err
		}
		histories = append(histories, h)
	}
	sort.Slice(histories, func(i, j int) bool {
		return histories[i].ID > histories[j].ID
	})

	return histories, nil
}
