package entities

import (
	"context"
	"time"
)

type user struct {
	ID        int64     `json:"id_siswa"`
	FirstName string    `json:"firstName"`
	LastName  string    `json:"lastName" `
	Email     string    `json:"email"`
	Password  string    `json:"password" `
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type SiswaResponse struct {
	ID        int64  `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName" `
	Email     string `json:"email"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type LoginSiswa struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SiswaRepository interface {
	Fetch(ctx context.Context) ([]SiswaResponse, error)
	FetchByID(ctx context.Context, id int64) (SiswaResponse, error)
	Create(ctx context.Context, s *Siswa) (SiswaResponse, error)
	Update(ctx context.Context, id int64, s *Siswa) (SiswaResponse, error)
	Delete(ctx context.Context, id int64) error
	Login(ctx context.Context, l *LoginSiswa) (SiswaResponse, error)
	Register(ctx context.Context, s *Siswa) (SiswaResponse, error)
}
