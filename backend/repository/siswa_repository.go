package repository

import (
	"context"
	"database/sql"

	"github.com/ariopri/Let-It-Be/tree/main/backend/entities"
	"github.com/ariopri/Let-It-Be/tree/main/backend/utils/hash"
)

type siswaRepository struct {
	db *sql.DB
}

func NewSiswaRepository(db *sql.DB) entities.SiswaRepository {
	return &siswaRepository{db}
}

// 1. Fetch all data siswa
func (siswa *siswaRepository) Fetch(ctx context.Context) ([]entities.SiswaResponse, error) {
	query := `SELECT * FROM siswa`
	rows, err := siswa.db.QueryContext(ctx, query)
	if err != nil {
		return []entities.SiswaResponse{}, err
	}
	defer rows.Close()

	var users []entities.SiswaResponse
	for rows.Next() {
		var user entities.Siswa
		err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt)
		if err != nil {
			return []entities.SiswaResponse{}, err
		}
		userResponse := &entities.SiswaResponse{
			ID:        user.ID,
			FirstName: user.FirstName,
			LastName:  user.LastName,
			Email:     user.Email,
			CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
			UpdatedAt: user.UpdatedAt.Format("2006-01-02 15:04:05"),
		}
		users = append(users, *userResponse)
	}
	return users, nil

}

// 2.fetch user by id
func (siswa *siswaRepository) FetchByID(ctx context.Context, id int64) (entities.SiswaResponse, error) {
	var user entities.Siswa
	sqlStmt := `SELECT * FROM siswa WHERE id = ?`
	row := siswa.db.QueryRowContext(ctx, sqlStmt, id)
	err := row.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return entities.SiswaResponse{}, err
	}
	userResponse := &entities.SiswaResponse{
		ID:        user.ID,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
		CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
		UpdatedAt: user.UpdatedAt.Format("2006-01-02 15:04:05"),
	}
	return *userResponse, nil
}

// 3. fetch user by id for compare password
func (siswa *siswaRepository) fetchById(ctx context.Context, id int64) (entities.Siswa, error) {
	var user entities.Siswa
	sqlStmt := `SELECT * FROM siswa WHERE id = ?`
	row := siswa.db.QueryRowContext(ctx, sqlStmt, id)
	err := row.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return entities.Siswa{}, err
	}
	return user, nil
}

// 4. fethc user by email
func (siswa *siswaRepository) fetchUserByEmail(ctx context.Context, email string) (entities.Siswa, error) {
	var user entities.Siswa
	sqlStmt := `SELECT * FROM siswa WHERE email = ?`
	row := siswa.db.QueryRowContext(ctx, sqlStmt, email)
	err := row.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return entities.Siswa{}, err
	}
	return user, nil
}

// 5. Create new user
func (siswa *siswaRepository) Create(ctx context.Context, s *entities.Siswa) (entities.SiswaResponse, error) {
	//implementasi hash password
	s.Password, _ = hash.HashPassword(s.Password)
	query := `INSERT INTO siswa (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`
	row, err := siswa.db.ExecContext(ctx, query, s.FirstName, s.LastName, s.Email, s.Password)
	if err != nil {
		return entities.SiswaResponse{}, err
	}
	lasId, _ := row.LastInsertId()

	res, err := siswa.FetchByID(ctx, lasId)
	if err != nil {
		return entities.SiswaResponse{}, err
	}
	userResponse := &entities.SiswaResponse{
		ID:        res.ID,
		FirstName: res.FirstName,
		LastName:  res.LastName,
		Email:     res.Email,
		CreatedAt: res.CreatedAt,
		UpdatedAt: res.UpdatedAt,
	}
	return *userResponse, nil

}

// 6. Update user
func (siswa *siswaRepository) Update(ctx context.Context, id int64, s *entities.Siswa) (entities.SiswaResponse, error) {
	usr, err := siswa.fetchById(ctx, id)
	if err != nil {
		return entities.SiswaResponse{}, err
	}
	//compare with old password
	if s.Password != usr.Password {
		s.Password, _ = hash.HashPassword(s.Password)
	}
	query := `UPDATE siswa SET firstName = ?, lastName = ?, email = ?, password = ? WHERE id = ?`

	_, err = siswa.db.ExecContext(ctx, query, s.FirstName, s.LastName, s.Email, s.Password, id)
	if err != nil {
		return entities.SiswaResponse{}, err
	}
	res, err := siswa.FetchByID(ctx, id)
	if err != nil {
		return entities.SiswaResponse{}, err
	}
	userResponse := &entities.SiswaResponse{
		ID:        res.ID,
		FirstName: res.FirstName,
		LastName:  res.LastName,
		Email:     res.Email,
		CreatedAt: res.CreatedAt,
		UpdatedAt: res.UpdatedAt,
	}
	return *userResponse, nil
}

func (siswa *siswaRepository) Delete(ctx context.Context, id int64) error {
	_, err := siswa.FetchByID(ctx, id)
	if err != nil {
		return err
	}
	query := `DELETE FROM siswa WHERE id = ?`
	_, err = siswa.db.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}
	return nil
}

func (siswa *siswaRepository) Login(ctx context.Context, l *entities.LoginSiswa) (entities.SiswaResponse, error) {
	user, err := siswa.fetchUserByEmail(ctx, l.Email)
	if err != nil {
		return entities.SiswaResponse{}, err
	}

	//check password matches
	if err := hash.CheckPassword(l.Password, user.Password); err != nil {
		return entities.SiswaResponse{}, err
	}
	userResponse := &entities.SiswaResponse{
		ID:        user.ID,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
		CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
		UpdatedAt: user.UpdatedAt.Format("2006-01-02 15:04:05"),
	}
	return *userResponse, nil
}

func (siswa *siswaRepository) Register(ctx context.Context, s *entities.Siswa) (entities.SiswaResponse, error) {
	res, err := siswa.Create(ctx, s)
	if err != nil {
		return entities.SiswaResponse{}, err
	}
	return res, nil

}
