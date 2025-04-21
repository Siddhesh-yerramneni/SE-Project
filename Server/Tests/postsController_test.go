package tests

import (
	"bytes"
	"testing"
	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"github.com/siddhesh-yerramneni/SE-Project/Server/Models" // Import as 'model'
	"net/http/httptest"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"io/ioutil"
	"strconv"
)

// Setup function to initialize an in-memory SQLite database
func setupTestDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to the database")
	}
	// Automatically migrate the models
	db.AutoMigrate(&model.Post{})
	return db
}

func TestCreatePost(t *testing.T) {
	db := setupTestDB()
	app := fiber.New()

	// Mock Post data
	post := `{"author_id":1, "title":"Go Programming", "content":"A deep dive into Go."}`

	req := httptest.NewRequest("POST", "/createPost", bytes.NewBufferString(post))
	req.Header.Set("Content-Type", "application/json")

	// Test the CreatePost function
	app.Post("/createPost", func(c *fiber.Ctx) error {
		var newPost model.Post
		if err := c.BodyParser(&newPost); err != nil {
			return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid request"})
		}
		// Store the post in the in-memory DB
		if err := db.Create(&newPost).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Database error"})
		}
		return c.Status(201).JSON(fiber.Map{"status": "success", "post": newPost})
	})

	resp, _ := app.Test(req)

	// Read the response body
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("failed to read response body: %v", err)
	}

	// Assert the response status is success
	assert.Equal(t, 201, resp.StatusCode)
	assert.Contains(t, string(bodyBytes), `"status":"success"`)
	assert.Contains(t, string(bodyBytes), `"title":"Go Programming"`)
}

// Test case for DeletePost function
func TestDeletePost(t *testing.T) {
	db := setupTestDB()
	app := fiber.New()

	// Create a mock post
	post := model.Post{AuthorID: 1, Title: "Go Programming", Content: "A deep dive into Go."}
	db.Create(&post)

	// Test the DeletePost function
	app.Delete("/deletePost/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		if err := db.Delete(&model.Post{}, id).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Database error"})
		}
		return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Post deleted successfully"})
	})

	// Correct conversion of uint to string using strconv.FormatUint
	req := httptest.NewRequest("DELETE", "/deletePost/"+strconv.FormatUint(uint64(post.ID), 10), nil)
	resp, _ := app.Test(req)

	// Read the response body
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("failed to read response body: %v", err)
	}

	// Assert the response
	assert.Equal(t, 200, resp.StatusCode)
	assert.Contains(t, string(bodyBytes), "Post deleted successfully")
}

func TestGetAllPosts(t *testing.T) {
	db := setupTestDB()
	app := fiber.New()

	// Create a mock post
	post := model.Post{AuthorID: 1, Title: "Go Programming", Content: "A deep dive into Go."}
	db.Create(&post)

	// Test the GetAllPosts function
	app.Get("/getPosts", func(c *fiber.Ctx) error {
		var posts []model.Post
		if err := db.Find(&posts).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Database error"})
		}
		return c.Status(200).JSON(fiber.Map{"status": "success", "posts": posts})
	})

	req := httptest.NewRequest("GET", "/getPosts", nil)
	resp, _ := app.Test(req)

	// Read the response body
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("failed to read response body: %v", err)
	}

	// Assert the response
	assert.Equal(t, 200, resp.StatusCode)
	assert.Contains(t, string(bodyBytes), "Go Programming")
}

func TestGetPostsByAuthorID(t *testing.T) {
	db := setupTestDB()
	app := fiber.New()

	// Create a mock post
	post := model.Post{AuthorID: 1, Title: "Go Programming", Content: "A deep dive into Go."}
	db.Create(&post)

	// Test the GetPostsByAuthorID function
	app.Get("/getPosts/:authorID", func(c *fiber.Ctx) error {
		authorID := c.Params("authorID")
		var posts []model.Post
		if err := db.Where("author_id = ?", authorID).Find(&posts).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Database error"})
		}
		return c.Status(200).JSON(fiber.Map{"status": "success", "posts": posts})
	})

	req := httptest.NewRequest("GET", "/getPosts/1", nil)
	resp, _ := app.Test(req)

	// Read the response body
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("failed to read response body: %v", err)
	}

	// Assert the response
	assert.Equal(t, 200, resp.StatusCode)
	assert.Contains(t, string(bodyBytes), "Go Programming")
}

func TestEditPost(t *testing.T) {
	db := setupTestDB()
	app := fiber.New()

	// Create a mock post
	post := model.Post{
		AuthorID: 1,
		Title:    "Go Programming",
		Content:  "A deep dive into Go.",
	}
	db.Create(&post)

	// Mock updated post data
	updatedPost := `{"title":"Advanced Go Programming", "content":"A comprehensive guide to Go programming."}`

	// Test the EditPost function
	app.Put("/editPost/:id", func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"status": "Bad Request", "msg": "Invalid post ID"})
		}

		var post model.Post
		if err := db.First(&post, id).Error; err != nil {
			return c.Status(404).JSON(fiber.Map{"status": "Not Found", "msg": "Post not found"})
		}

		var updatedData struct {
			Title   string `json:"title"`
			Content string `json:"content"`
		}
		if err := c.BodyParser(&updatedData); err != nil {
			return c.Status(400).JSON(fiber.Map{"status": "Bad Request", "msg": "Invalid request body"})
		}

		if updatedData.Title != "" {
			post.Title = updatedData.Title
		}
		if updatedData.Content != "" {
			post.Content = updatedData.Content
		}

		if err := db.Save(&post).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"status": "Internal Server Error", "msg": "Failed to update post"})
		}

		return c.Status(200).JSON(fiber.Map{"status": "OK", "msg": "Post updated successfully", "post": post})
	})

	// Send PUT request to update the post
	req := httptest.NewRequest("PUT", "/editPost/"+strconv.FormatUint(uint64(post.ID), 10), bytes.NewBufferString(updatedPost))
	req.Header.Set("Content-Type", "application/json")
	resp, _ := app.Test(req)

	// Read the response body
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("failed to read response body: %v", err)
	}

	// Assert the response status and body
	assert.Equal(t, 200, resp.StatusCode)
	assert.Contains(t, string(bodyBytes), "Post updated successfully")
	assert.Contains(t, string(bodyBytes), "Advanced Go Programming")
}
