package main

import (
	"github.com/ariopri/Let-It-Be/tree/main/backend/routes"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	r := routes.SetupRoutes()
	r.Run(":8080")

}
