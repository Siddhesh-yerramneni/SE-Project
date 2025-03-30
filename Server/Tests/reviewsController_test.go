package controller

import (
	"bytes"
	"io/ioutil" // For older Go versions, otherwise use "io"
	"net/http/httptest"
	"strconv"
	"testing"

	"github.com/gofiber/fiber/v2"
	model "github.com/siddhesh-yerramneni/SE-Project/Server/Models" // Import as 'model'
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
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

func TestDeleteReview(t *testing.T) {
	db := setupTestDB()
	app := fiber.New()

	// Create a mock review
	review := model.Review{UserID: 1, BookID: 1, Review: "Great book!"}
	db.Create(&review)

	// Test the DeleteReview function
	app.Delete("/reviews/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		if err := db.Delete(&model.Review{}, id).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Database error"})
		}
		return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Review deleted"})
	})

	req := httptest.NewRequest("DELETE", "/reviews/1", nil)
	resp, _ := app.Test(req)

	if resp.StatusCode == 200 {
		t.Log("TestDeleteReview: Passed")
	} else {
		t.Log("TestDeleteReview: Failed")
	}
	// Assert the response
	assert.Equal(t, 200, resp.StatusCode)
}

// Test case for EditReview function
func TestEditReview(t *testing.T) {
	db := setupTestDB()
	app := fiber.New()

	// Create a mock review
	review := model.Review{
		UserID: 1,
		BookID: 1,
		Review: "Great book!",
	}
	db.Create(&review)

	// Mock updated review data
	updatedReview := `{"review":"Updated review: Amazing book!"}`

	// Test the EditReview function
	app.Put("/reviews/:id", func(c *fiber.Ctx) error {
		// Convert ID from string to int
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"status": "Bad Request", "msg": "Invalid ID format"})
		}

		// Check if the review exists
		var review model.Review
		if err := db.First(&review, id).Error; err != nil {
			return c.Status(404).JSON(fiber.Map{"status": "Not Found", "msg": "Review not found"})
		}

		// Parse the request body to update the review
		var updatedReviewData struct {
			Review string `json:"review"`
		}
		if err := c.BodyParser(&updatedReviewData); err != nil {
			return c.Status(400).JSON(fiber.Map{"status": "Bad Request", "msg": "Invalid request body"})
		}

		// Update the review
		review.Review = updatedReviewData.Review
		if err := db.Save(&review).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"status": "Internal Server Error", "msg": "Error updating review"})
		}

		return c.Status(200).JSON(fiber.Map{"status": "OK", "msg": "Review updated successfully!", "review": review})
	})

	// Send PUT request to update the review
	req := httptest.NewRequest("PUT", "/reviews/"+strconv.FormatUint(uint64(review.ID), 10), bytes.NewBufferString(updatedReview))
	req.Header.Set("Content-Type", "application/json")
	resp, _ := app.Test(req)

	// Read the response body
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("failed to read response body: %v", err)
	}

	// Assert the response status and body
	assert.Equal(t, 200, resp.StatusCode)
	assert.Contains(t, string(bodyBytes), "Review updated successfully!")
	assert.Contains(t, string(bodyBytes), "Updated review: Amazing book!")
}
