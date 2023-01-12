package main

import (
	"database/sql"

	"github.com/ariopri/Let-It-Be/tree/main/backend/database/migration"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	DB, err := sql.Open("mysql", "root:tanahdamai@tcp(localhost:3306)/letitbe")
	if err != nil {
		panic(err)
	}
	defer DB.Close()

	migration.Migrate(DB)
}
