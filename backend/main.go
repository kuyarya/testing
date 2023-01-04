package main

import (
	"net/http"

	"github.com/ariopri/Let-It-Be/tree/main/backend/config"
	"github.com/ariopri/Let-It-Be/tree/main/backend/entities"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(config.CORS(config.DefaultCORSConfig()))
	r.GET("/informasi", func(c *gin.Context) {
		c.JSON(http.StatusOK, entities.InformasiData)
	})
	r.Run()
}
