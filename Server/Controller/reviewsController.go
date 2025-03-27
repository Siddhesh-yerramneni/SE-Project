package controller

import (
	"github.com/gofiber/fiber/v2"
	Database "github.com/siddhesh-yerramneni/SE-Project/Server/Database"
	model "github.com/siddhesh-yerramneni/SE-Project/Server/Models"
)

// AddReview handles adding a new review
func AddReview(c *fiber.Ctx) error {
	var review model.Review

	// Parse JSON body
	if err := c.BodyParser(&review); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "Bad Request",
			"msg":        "Invalid request body",
		})
	}

	// Store review in database
	if err := Database.DBConn.Create(&review).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Error adding review",
			"error":      err.Error(),
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "Review added successfully!",
		"review":     review,
	})
}

func GetReviews(c *fiber.Ctx) error {
	bookID := c.Params("bookID")
	var reviews []model.Review

	// Find reviews by book ID
	if err := Database.DBConn.Where("book_id = ?", bookID).Find(&reviews).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Error fetching reviews",
			"error":      err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "OK",
		"reviews":    reviews,
	})
}
