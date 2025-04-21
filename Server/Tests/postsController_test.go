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
