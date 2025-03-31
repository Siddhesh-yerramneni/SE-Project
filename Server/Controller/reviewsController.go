package controller

import (
	"strconv"

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

	// Use Preload to fetch associated user and book details
	if err := Database.DBConn.
		Preload("User").
		Preload("Book").
		Where("book_id = ?", bookID).
		Find(&reviews).Error; err != nil {
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
func DeleteReview(c *fiber.Ctx) error {
	// Convert ID from string to int
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "Bad Request",
			"msg":        "Invalid ID format",
		})
	}

	// Check if review exists
	var review model.Review
	if err := Database.DBConn.First(&review, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"statusText": "Not Found",
			"msg":        "Review not found",
		})
	}

	// Delete review
	if err := Database.DBConn.Delete(&review).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Error deleting review",
			"error":      err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "Review deleted successfully",
	})
}

func EditReview(c *fiber.Ctx) error {
	// Convert ID from string to int
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "Bad Request",
			"msg":        "Invalid ID format",
		})
	}

	// Check if the review exists
	var review model.Review
	if err := Database.DBConn.First(&review, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"statusText": "Not Found",
			"msg":        "Review not found",
		})
	}

	// Parse the request body
	var updatedReview struct {
		Review string `json:"review"`
	}
	if err := c.BodyParser(&updatedReview); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "Bad Request",
			"msg":        "Invalid request body",
		})
	}

	// Update the review text
	review.Review = updatedReview.Review

	// Save changes
	if err := Database.DBConn.Save(&review).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Error updating review",
			"error":      err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "Review updated successfully!",
		"review":     review,
	})
}
