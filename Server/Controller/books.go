package controller

import (
	"github.com/gofiber/fiber/v2"
)

// View Books
func HomePage(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "OK",
		"msg":        "Home Page api route",
	}
	c.Status(200)
	return c.JSON(context)
}

// Adds a book
func AddBook(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "OK",
		"msg":        "Add books api route",
	}
	c.Status(200)
	return c.JSON(context)
}
