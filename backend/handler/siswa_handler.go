package handler

import (
	"fmt"

	"net/http"

	"github.com/ariopri/Let-It-Be/tree/main/backend/config"
	"github.com/ariopri/Let-It-Be/tree/main/backend/entities"
	"github.com/ariopri/Let-It-Be/tree/main/backend/utils/token"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
)

type siswaHandler struct {
	siswaRepo entities.SiswaRepository
}

func NewSiswaHandler(r *gin.Engine, siswaRepo entities.SiswaRepository) {
	handler := &siswaHandler{siswaRepo}

	siswa := r.Group("/api/siswa")
	{
		siswa.POST("/login", handler.Login)
		siswa.POST("/register", handler.Register)
	}
}

func errMessage(v validator.FieldError) string {
	m := fmt.Sprintf("error on field %s, condition: %s", v.Field(), v.ActualTag())

	return m
}

// 1. Login

func (s *siswaHandler) Login(c *gin.Context) {
	ctx := c.Request.Context()
	var login entities.LoginSiswa

	if err := c.ShouldBind(&login); err != nil {
		for _, v := range err.(validator.ValidationErrors) {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": errMessage(v),
			})
			return
		}
	}
	siswaLogin, err := s.siswaRepo.Login(ctx, &login)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	//JWT
	token, _ := token.CreateToken(siswaLogin.Email)

	c.JSON(http.StatusOK, gin.H{
		"message": "Login Success",
		"token":   token,
		"data":    siswaLogin,
	})
}

// 2. Register

func (s *siswaHandler) Register(c *gin.Context) {
	ctx := c.Request.Context()
	siswa := entities.Siswa{}

	if err := c.ShouldBind(&siswa); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": config.BadRequest,
		})
		return
	}
	siswaData, err := s.siswaRepo.Register(ctx, &siswa)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"messange": config.InternalServer,
		})
		return
	}
	//JWT
	token, _ := token.CreateToken(siswaData.Email)
	c.JSON(http.StatusOK, gin.H{
		"message": "Register Success",
		"token":   token,
		"data":    siswaData,
	})

}
