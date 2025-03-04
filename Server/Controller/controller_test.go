package controller

import (
	"bytes"
	"encoding/json"
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v2"
	model "github.com/siddhesh-yerramneni/SE-Project/Server/Models"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"gorm.io/gorm"
)

func TestSignup(t *testing.T) {
	// Initialize Fiber app
	app := fiber.New()

	// Create a mock database
	mockDB := new(MockDB)
	DBConn = mockDB // Use the interface here
	mockDB.On("Create", mock.Anything).Return(&gorm.DB{})

	// Set up the route
	app.Post("/signup", Signup)

	// Test case 1: Successful signup
	t.Run("Successful Signup", func(t *testing.T) {
		mockDB.On("Create", mock.Anything).Return(&gorm.DB{Error: nil})

		// Create request body
		body := []byte(`{"username":"testuser","email":"test@example.com","password":"password123"}`)

		// Make request
		req := httptest.NewRequest("POST", "/signup", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		resp, _ := app.Test(req)

		// Assert response
		assert.Equal(t, 201, resp.StatusCode)

		var result map[string]interface{}
		json.NewDecoder(resp.Body).Decode(&result)
		assert.Equal(t, "OK", result["statusText"])
		assert.Equal(t, "User registered successfully", result["msg"])
	})

	// Test case 2: Invalid request body
	t.Run("Invalid Request Body", func(t *testing.T) {
		body := []byte(`{"invalid":"json"}`)

		req := httptest.NewRequest("POST", "/signup", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		resp, _ := app.Test(req)

		assert.Equal(t, 400, resp.StatusCode)
	})

	// Add more test cases as needed
}

func TestLogin(t *testing.T) {
	app := fiber.New()
	mockDB := new(MockDB)
	DBConn = mockDB
	mockDB.On("Create", mock.Anything).Return(&gorm.DB{})

	app.Post("/login", Login)

	// Test case 1: Successful login
	t.Run("Successful Login", func(t *testing.T) {
		hashedPassword, _ := HashPassword("password123")
		user := model.User{Username: "testuser", Password: hashedPassword}

		mockDB.On("Where", "username = ?", "testuser").Return(mockDB)
		mockDB.On("First", mock.Anything, mock.Anything).Run(func(args mock.Arguments) {
			arg := args.Get(0).(*model.User)
			*arg = user
		}).Return(&gorm.DB{Error: nil})

		body := []byte(`{"username":"testuser","password":"password123"}`)

		req := httptest.NewRequest("POST", "/login", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		resp, _ := app.Test(req)

		assert.Equal(t, 200, resp.StatusCode)

		var result map[string]interface{}
		json.NewDecoder(resp.Body).Decode(&result)
		assert.Equal(t, "OK", result["statusText"])
		assert.Equal(t, "Login successful", result["msg"])
	})

	// Test case 2: Invalid credentials
	t.Run("Invalid Credentials", func(t *testing.T) {
		mockDB.On("Where", "username = ?", "wronguser").Return(mockDB)
		mockDB.On("First", mock.Anything, mock.Anything).Return(&gorm.DB{Error: gorm.ErrRecordNotFound})

		body := []byte(`{"username":"wronguser","password":"wrongpassword"}`)

		req := httptest.NewRequest("POST", "/login", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")
		resp, _ := app.Test(req)

		assert.Equal(t, 401, resp.StatusCode)
	})

	// Add more test cases as needed
}
