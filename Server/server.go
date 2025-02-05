package main

import (
	"github.com/gofiber/fiber/v2"
	database "github.com/siddhesh-yerramneni/SE-Project/Server/Database"
)

func main() {
	database.ConnectDB()
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Listen(":3000")
}
