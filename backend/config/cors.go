package config

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CORSConfig struct {
	AllowOrigins     string
	AllowMethods     string
	AllowHeaders     string
	ExposeHeaders    string
	AllowCredentials bool
}

func DefaultCORSConfig() CORSConfig {
	return CORSConfig{
		AllowOrigins:     "*",
		AllowMethods:     "POST, GET, PUT, DELETE, PATCH, OPTIONS",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization, X-CSRF-Token, X-Requested-With",
		ExposeHeaders:    "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Cache-Control, Content-Language, Content-Type",
		AllowCredentials: true,
	}
}

func CORS(config CORSConfig) gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.GetHeader("Origin")
		if origin == "" {
			origin = "*"
		}

		methods := config.AllowMethods
		if methods == "" {
			methods = "GET, PUT, POST, DELETE, PATCH, OPTIONS"
		}

		headers := config.AllowHeaders
		if headers == "" {
			headers = "Origin, Content-Type, Accept, Authorization, X-CSRF-Token, X-Requested-With"
		}

		c.Header("Access-Control-Allow-Origin", origin)
		c.Header("Access-Control-Allow-Methods", methods)
		c.Header("Access-Control-Allow-Headers", headers)
		c.Header("Access-Control-Expose-Headers", config.ExposeHeaders)
		c.Header("Access-Control-Allow-Credentials", strconv.FormatBool(config.AllowCredentials))
		c.Header("Access-Control-Max-Age", "86400")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}
