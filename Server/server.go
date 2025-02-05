package main

import (
	"github.com/gofiber/fiber/v2"
	database "github.com/siddhesh-yerramneni/SE-Project/Server/Database"
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

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Listen(":3000")
}
