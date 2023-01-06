package token

import (
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type Claims struct {
	Email string `json:"email"`
	jwt.StandardClaims
}

var jwtkey []byte = []byte("secret")

func CreateToken(email string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodES256, Claims{
		Email: email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 6).Unix(),
		},
	})
	return token.SignedString(jwtkey)
}

func ValidateToken(tokenStr string) (*Claims, error) {
	jToken := func(token *jwt.Token) (interface{}, error) {
		return jwtkey, nil
	}

	token, err := jwt.ParseWithClaims(tokenStr, &Claims{}, jToken)
	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, err
	}

	claims := token.Claims.(*Claims)

	return claims, nil
}
