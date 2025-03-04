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


