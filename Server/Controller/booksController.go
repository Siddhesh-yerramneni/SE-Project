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

	// Store book in database correctly
	result := Database.DBConn.Create(&book)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Error adding book",
			"error":      result.Error.Error(), //  Return the actual database error
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "Book added successfully!",
		"book": fiber.Map{
			"id":       book.ID,
			"bookname": book.Bookname,
			"author":   book.Author,
		},
	})
}
func DeleteBook(c *fiber.Ctx) error {
	// Get book ID from the URL parameter
	id := c.Params("id")

	// Check if book exists
	var book model.Book
	result := Database.DBConn.First(&book, id)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"statusText": "Not Found",
			"msg":        "Book not found",
		})
	}

	// Delete the book
	if err := Database.DBConn.Delete(&book).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Error deleting book",
			"error":      err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "Book deleted successfully",
	})
}

func GetBook(c *fiber.Ctx) error {
	// Get book ID from the URL parameter
	id := c.Params("id")

	// Fetch the book from the database
	var book model.Book
	result := Database.DBConn.First(&book, id)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"statusText": "Not Found",
			"msg":        "Book not found",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "OK",
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
			"error":      result.Error.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "OK",
		"books":      books,
	})
}

func GetFictionBooks(c *fiber.Ctx) error {
	var books []model.Book

	// Query books where category is "Fiction"
	if err := Database.DBConn.Where("category = ?", "fiction").Find(&books).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Error fetching books",
			"error":      err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "Fiction books retrieved successfully!",
		"books":      books,
	})
}

func GetshBooks(c *fiber.Ctx) error {
	var books []model.Book

	// Ensure case-insensitive match
	if err := Database.DBConn.Where("LOWER(category) = ?", "selfhelp").Find(&books).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Error fetching Self-Help books",
			"error":      err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "Self-Help books retrieved successfully!",
		"books":      books,
	})
}

func GetRomanceBooks(c *fiber.Ctx) error {
	var books []model.Book

	// Ensure case-insensitive match
	if err := Database.DBConn.Where("LOWER(category) = ?", "romance").Find(&books).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Error fetching Self-Help books",
			"error":      err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "Romantic books retrieved successfully!",
		"books":      books,
	})
}
