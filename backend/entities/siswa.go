package entities

import (
	"context"
	"time"
)

type Siswa struct {
	ID        int64     `json:"id" form:"id"`
	FirstName string    `json:"firstName" form:"firstName" binding:"required"`
	LastName  string    `json:"lastName" form:"lastName" binding:"required"`
	Email     string    `json:"email" form:"email" binding:"required, email"`
	Password  string    `json:"password" form:"password" binding:"required, min=6"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type SiswaResponse struct {
	ID        int64  `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName" `
	Email     string `json:"email"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
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
