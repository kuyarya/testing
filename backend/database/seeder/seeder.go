package seeder

import (
	"database/sql"
	"golang.org/x/crypto/bcrypt"
)

func Seed(db *sql.DB) {
	//user Siswa
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("password"), bcrypt.DefaultCost)
	_, err := db.Exec("INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)", "Uciha", "Madara", "konoha@email.com", hashedPassword)
	if err != nil {
		panic(err)
	}
}
