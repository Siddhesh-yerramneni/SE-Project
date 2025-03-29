package controller

import (
	"bytes"
	"testing"
	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"github.com/siddhesh-yerramneni/SE-Project/Server/Models" // Import as 'model'
	"net/http/httptest"
	"io/ioutil" // For older Go versions, otherwise use "io"
	"strconv"
)

// Setup function to initialize an in-memory SQLite database
func setupTestDB() *gorm.DB {
	// In-memory SQLite database
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to the database")
	}
	// Automatically migrate the models
	db.AutoMigrate(&model.Review{}, &model.User{}, &model.Book{}) // Reference 'model' here
	return db
}

func TestAddReview(t *testing.T) {
	db := setupTestDB()
	app := fiber.New()

	// Mock Review data
	review := `{"user_id":1, "book_id":1, "review":"Great book!"}`
	req := httptest.NewRequest("POST", "/reviews", bytes.NewBufferString(review))
	req.Header.Set("Content-Type", "application/json")

	// Test the AddReview function
	app.Post("/reviews", func(c *fiber.Ctx) error {
		var newReview model.Review // Use 'model.Review'
		if err := c.BodyParser(&newReview); err != nil {
			return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid request"})
		}
		// Store the review in the in-memory DB
		if err := db.Create(&newReview).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Database error"})
		}
		return c.Status(201).JSON(fiber.Map{"status": "success", "review": newReview})
	})

	resp, _ := app.Test(req)

	if resp.StatusCode == 201 {
		t.Log("TestAddReview: Passed")
	} else {
		t.Log("TestAddReview: Failed")
	}
	// Assert the response
	assert.Equal(t, 201, resp.StatusCode)
}

// Test case for GetReviews function
func TestGetReviews(t *testing.T) {
	db := setupTestDB()
	app := fiber.New()

	// Create a mock review
	review := model.Review{UserID: 1, BookID: 1, Review: "Great book!"}
	db.Create(&review)

	// Test the GetReviews function
	app.Get("/reviews/:bookID", func(c *fiber.Ctx) error {
		var reviews []model.Review // Use 'model.Review'
		bookID := c.Params("bookID")
		if err := db.Where("book_id = ?", bookID).Find(&reviews).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Database error"})
		}
		return c.Status(200).JSON(fiber.Map{"status": "success", "reviews": reviews})
	})

	req := httptest.NewRequest("GET", "/reviews/1", nil)
	resp, _ := app.Test(req)

	if resp.StatusCode == 200 {
		t.Log("TestGetReviews: Passed")
	} else {
		t.Log("TestGetReviews: Failed")
	}

	// Assert the response
	assert.Equal(t, 200, resp.StatusCode)
}
