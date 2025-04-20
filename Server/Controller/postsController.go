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

// GetAllPosts retrieves all posts with their authors
func GetAllPosts(c *fiber.Ctx) error {
	var posts []model.Post

	// Fetch posts with associated authors
	if err := Database.DBConn.Preload("Author").Find(&posts).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Failed to fetch posts",
			"error":      err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "Posts retrieved successfully",
		"posts":      posts,
	})
}

// GetPostsByAuthorID retrieves all posts for a specific author
func GetPostsByAuthorID(c *fiber.Ctx) error {
	// Parse author ID from URL param
	authorID, err := strconv.Atoi(c.Params("authorID"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "Bad Request",
			"msg":        "Invalid author ID",
		})
	}

	var posts []model.Post

	// Fetch posts for given author
	if err := Database.DBConn.Preload("Author").Where("author_id = ?", authorID).Find(&posts).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Failed to fetch posts for author",
			"error":      err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "Posts retrieved successfully for author",
		"posts":      posts,
	})
}

func EditPost(c *fiber.Ctx) error {
	// Parse ID from URL
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "Bad Request",
			"msg":        "Invalid post ID",
		})
	}

	// Find the post
	var post model.Post
	if err := Database.DBConn.First(&post, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"statusText": "Not Found",
			"msg":        "Post not found",
		})
	}

	// Parse updated fields
	var updateData struct {
		Title   string `json:"title"`
		Content string `json:"content"`
	}
	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "Bad Request",
			"msg":        "Invalid request body",
		})
	}

	// Update fields if provided
	if updateData.Title != "" {
		post.Title = updateData.Title
	}
	if updateData.Content != "" {
		post.Content = updateData.Content
	}

	// Save the updated post
	if err := Database.DBConn.Save(&post).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Failed to update post",
			"error":      err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "Post updated successfully",
		"post":       post,
	})
}
