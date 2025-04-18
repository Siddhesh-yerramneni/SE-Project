package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	database "github.com/siddhesh-yerramneni/SE-Project/Server/Database"
	router "github.com/siddhesh-yerramneni/SE-Project/Server/Router"
)

func init() {
	database.ConnectDB()
}

func main() {
	sqlDb, err := database.DBConn.DB()

	if err != nil {
		panic("Error in sql connection!")
	}
	defer sqlDb.Close()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST, PUT, DELETE, OPTIONS",
		AllowHeaders: "Content-Type, Authorization",
	}))

	// app.Get("/", func(c *fiber.Ctx) error {
	// 	return c.SendString("Hello, World!")
	// })

	router.SetupRoutes(app)
	router.SetupAuthRoutes(app)
	router.SetupReviewRoutes(app)
	router.SetupPostRoutes(app)

	app.Listen(":3000")
}
