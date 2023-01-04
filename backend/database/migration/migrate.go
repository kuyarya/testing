package migration

import (
	"database/sql"
	"github.com/ariopri/Let-It-Be/tree/main/backend/database/seeder"
	_ "github.com/go-sql-driver/mysql"
)

func Migrate(db *sql.DB) {
	_, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS users (
		    			id INT AUTO_INCREMENT PRIMARY KEY,
		    			firstName VARCHAR(255) NOT NULL,
		    			lastName VARCHAR(255) NOT NULL,
		    			email VARCHAR(255) NOT NULL,
		    			password VARCHAR(255) NOT NULL,
		    			created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
		    			updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
		);
`)
	if err != nil {
		panic(err)
	}
	seeder.Seed(db)
}
