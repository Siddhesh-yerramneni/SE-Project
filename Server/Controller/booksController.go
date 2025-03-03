package controller

import (
	"github.com/gofiber/fiber/v2"
	model "github.com/siddhesh-yerramneni/SE-Project/Server/Models"
	Database "github.com/siddhesh-yerramneni/SE-Project/Server/Database"
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

	if err := c.BodyParser(&book); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "Bad Request",
			"msg":        "Invalid request body",
		})
	}

	result := Database.DBConn.Create(&book)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Error adding book",
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "Book added successfully!",
		"book":       book,
	})
}


func GetBooks(c *fiber.Ctx) error {
	var books []model.Book

	result := Database.DBConn.Find(&books)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Error fetching books",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "OK",
		"books":      books,
	})
}



