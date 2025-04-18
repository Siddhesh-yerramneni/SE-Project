package controller

import (
	"strconv"

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

func DeletePost(c *fiber.Ctx) error {
	// Parse ID from URL
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "Bad Request",
			"msg":        "Invalid post ID",
		})
	}

	// Check if the post exists
	var post model.Post
	if err := Database.DBConn.First(&post, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"statusText": "Not Found",
			"msg":        "Post not found",
		})
	}

	// Delete the post
	if err := Database.DBConn.Delete(&post).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Failed to delete post",
			"error":      err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "Post deleted successfully",
	})
}
