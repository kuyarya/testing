package main

import (
	"database/sql"
	"net/http"

	"github.com/ariopri/Let-It-Be/tree/main/backend/config"
	"github.com/ariopri/Let-It-Be/tree/main/backend/database/migration"
	"github.com/ariopri/Let-It-Be/tree/main/backend/entities"
	"github.com/ariopri/Let-It-Be/tree/main/backend/handler"
	"github.com/ariopri/Let-It-Be/tree/main/backend/repository"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(config.CORS(config.DefaultCORSConfig()))
	r.GET("/informasi", func(c *gin.Context) {
		c.JSON(http.StatusOK, entities.InformasiData)
	})

	//initial databased
	db, err := sql.Open("mysql", "root:tanahdamai@tcp(localhost:3306)/letitbe")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	//Run Migration
	migration.Migrate(db)

	//Initial Repository
	siswaRepo := repository.NewSiswaRepository(db)

	//Initial Handler
	handler.NewSiswaHandler(r, siswaRepo)
	r.Run()
}
