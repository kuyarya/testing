package models

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func ConnectDatabase() {
	var err error
	// Connect to the database and handle any errors
	DB, err = sql.Open("mysql", "root:tanahdamai@tcp(localhost:3306)/letitbe")
	if err != nil {
		panic(err)
	}

	// Create the table if it doesn't exist
	_, err = DB.Exec("CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTO_INCREMENT, email VARCHAR(255), password VARCHAR(255), role VARCHAR(255), nama_depan VARCHAR(255), nama_belakang VARCHAR(255), phone VARCHAR(255))")
	if err != nil {
		panic(err)
	}
}
