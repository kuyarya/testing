package seeder

import (
	"database/sql"

	"golang.org/x/crypto/bcrypt"
)

func Seed(DB *sql.DB) {
	//user Siswa
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("UserBerhasilnih"), 12)
	_, err := DB.Exec("INSERT INTO users (email, password, role, nama_depan, nama_belakang, phone) VALUES (?, ?, ?, ?, ?, ?)", "konoha@email.com", hashedPassword, "client", "Uciha", "Madara", "6281212121212")
	if err != nil {
		panic(err)
	}
}
