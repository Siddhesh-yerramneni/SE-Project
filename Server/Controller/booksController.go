package controller

import (
	"github.com/gofiber/fiber/v2" // Change 'Model' to 'model'
	Database "github.com/siddhesh-yerramneni/SE-Project/Server/Database"
	model "github.com/siddhesh-yerramneni/SE-Project/Server/Models"
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
	var book model.Book

	// Parse JSON body
	if err := c.BodyParser(&book); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "Bad Request",
			"msg":        "Invalid request body",
		})
	}

	// Store user in database correctly
	result := Database.DBConn.Create(&book)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Error creating user",
			"error":      result.Error.Error(), //  Return the actual database error
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "User registered successfully!",
		"book": fiber.Map{
			"id":       book.ID,
			"bookname": book.Bookname,
			"author":   book.Author,
		},
	})
}
