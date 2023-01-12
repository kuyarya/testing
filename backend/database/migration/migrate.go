package migration

import (
	"database/sql"

	"github.com/ariopri/Let-It-Be/tree/main/backend/database/seeder"
	_ "github.com/go-sql-driver/mysql"
)

func Migrate(DB *sql.DB) {
	_, err := DB.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INT AUTO_INCREMENT PRIMARY KEY,
			email VARCHAR(255) NOT NULL,
			password VARCHAR(255) NOT NULL,
			role VARCHAR(255) CHECK(role IN('admin', 'client')) NOT NULL DEFAULT 'client',
		    nama_depan VARCHAR(255) NOT NULL,
		    nama_belakang VARCHAR(255) NOT NULL,
			phone VARCHAR(255) NOT NULL
		);
`)
	if err != nil {
		panic(err)
	}
	seeder.Seed(DB)
}
