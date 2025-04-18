package controller

import (
	"github.com/gofiber/fiber/v2"
	Database "github.com/siddhesh-yerramneni/SE-Project/Server/Database"
	model "github.com/siddhesh-yerramneni/SE-Project/Server/Models"
)

// CreatePost handles creation of a new post by an author
func CreatePost(c *fiber.Ctx) error {
	var post model.Post

	// Parse JSON body
	if err := c.BodyParser(&post); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "Bad Request",
			"msg":        "Invalid request body",
		})
	}

	// Save post to the database
	if err := Database.DBConn.Create(&post).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Error creating post",
			"error":      err.Error(),
		})
	}

	// Return success response
	return c.Status(201).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "Post created successfully!",
		"post":       post,
	})
}
