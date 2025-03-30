package tests

import (
	"bytes"
	"io/ioutil" // Import ioutil to read response body
	"net/http/httptest"
	"strconv"
	"testing"

	"github.com/gofiber/fiber/v2"
	model "github.com/siddhesh-yerramneni/SE-Project/Server/Models"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Setup function to initialize an in-memory SQLite database
func setupTestDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to the database")
	}
	// Automatically migrate the models
	db.AutoMigrate(&model.Book{})
	return db
}

// Test case for HomePage function
func TestHomePage(t *testing.T) {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		context := fiber.Map{
			"statusText": "OK",
			"msg":        "Home Page api route",
		}
		c.Status(200)
		return c.JSON(context)
	})

	req := httptest.NewRequest("GET", "/", nil)
	resp, _ := app.Test(req)

	// Read the response body
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("failed to read response body: %v", err)
	}

	// Assert the response
	assert.Equal(t, 200, resp.StatusCode)
	assert.Contains(t, string(bodyBytes), "Home Page api route")
}

// Test case for AddBook function
func TestAddBook(t *testing.T) {
	db := setupTestDB()
	app := fiber.New()

	// Mock Book data
	book := `{"bookname":"Go Programming", "author":"John Doe", "description":"A book on Go", "price":29.99, "category":"Programming"}`

	req := httptest.NewRequest("POST", "/addbook", bytes.NewBufferString(book))
	req.Header.Set("Content-Type", "application/json")

	// Test the AddBook function
	app.Post("/addbook", func(c *fiber.Ctx) error {
		var newBook model.Book
		if err := c.BodyParser(&newBook); err != nil {
			return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid request"})
		}
		// Store the book in the in-memory DB
		if err := db.Create(&newBook).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Database error"})
		}
		return c.Status(201).JSON(fiber.Map{"status": "success", "book": newBook})
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
	assert.Contains(t, string(bodyBytes), `"bookname":"Go Programming"`)
}

// Test case for DeleteBook function
func TestDeleteBook(t *testing.T) {
	db := setupTestDB()
	app := fiber.New()

	// Create a mock book
	book := model.Book{Bookname: "Go Programming", Author: "John Doe", Description: "A book on Go", Price: 29.99, Category: "Programming"}
	db.Create(&book)

	// Test the DeleteBook function
	app.Delete("/deletebook/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		if err := db.Delete(&model.Book{}, id).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Database error"})
		}
		return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Book deleted successfully"})
	})

	// Correct conversion of uint to string using strconv.FormatUint
	req := httptest.NewRequest("DELETE", "/deletebook/"+strconv.FormatUint(uint64(book.ID), 10), nil)
	resp, _ := app.Test(req)

	// Read the response body
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("failed to read response body: %v", err)
	}

	// Assert the response
	assert.Equal(t, 200, resp.StatusCode)
	assert.Contains(t, string(bodyBytes), "Book deleted successfully")
}

func TestGetBook(t *testing.T) {
	db := setupTestDB()
	app := fiber.New()

	// Create a mock book
	book := model.Book{Bookname: "Go Programming", Author: "John Doe", Description: "A book on Go", Price: 29.99, Category: "Programming"}
	db.Create(&book)

	// Test the GetBook function
	app.Get("/getbook/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		var book model.Book
		if err := db.First(&book, id).Error; err != nil {
			return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Book not found"})
		}
		return c.Status(200).JSON(fiber.Map{"status": "success", "book": book})
	})

	// Correct conversion of uint to string using strconv.FormatUint
	req := httptest.NewRequest("GET", "/getbook/"+strconv.FormatUint(uint64(book.ID), 10), nil)
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

// Test case for GetBooks function
func TestGetBooks(t *testing.T) {
	db := setupTestDB()
	app := fiber.New()

	// Create a mock book
	book := model.Book{Bookname: "Go Programming", Author: "John Doe", Description: "A book on Go", Price: 29.99, Category: "Programming"}
	db.Create(&book)

	// Test the GetBooks function
	app.Get("/getbooks", func(c *fiber.Ctx) error {
		var books []model.Book
		if err := db.Find(&books).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Database error"})
		}
		return c.Status(200).JSON(fiber.Map{"status": "success", "books": books})
	})

	req := httptest.NewRequest("GET", "/getbooks", nil)
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
