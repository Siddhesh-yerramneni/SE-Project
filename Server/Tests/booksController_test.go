package controller_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"github.com/siddhesh-yerramneni/SE-Project/Server/Controller"
	"github.com/siddhesh-yerramneni/SE-Project/Server/Models"
)


// Test AddBook
func TestAddBook(t *testing.T) {
	app := fiber.New()
	app.Post("/books", controller.AddBook)

	book := Models.Book{
		Bookname: "Test Book",
		Author:   "Test Author",
	}

	body, _ := json.Marshal(book)
	req := httptest.NewRequest("POST", "/books", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	resp, _ := app.Test(req, -1)
	assert.Equal(t, http.StatusCreated, resp.StatusCode)
}


func TestGetBooks(t *testing.T) {
	app := fiber.New()
	app.Get("/books", controller.GetBooks)

	req := httptest.NewRequest("GET", "/books", nil)
	resp, _ := app.Test(req, -1)

	assert.Equal(t, http.StatusOK, resp.StatusCode)
}

func TestGetBook(t *testing.T) {
	app := fiber.New()
	app.Get("/books/:id", controller.GetBook)

	req := httptest.NewRequest("GET", "/books/1", nil)
	resp, _ := app.Test(req, -1)

	assert.True(t, resp.StatusCode == http.StatusOK || resp.StatusCode == http.StatusNotFound)
}