package controller

import (
	"github.com/gofiber/fiber/v2" // Change 'Model' to 'model'
	Database "github.com/siddhesh-yerramneni/SE-Project/Server/Database"
	model "github.com/siddhesh-yerramneni/SE-Project/Server/Models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type DBInterface interface {
	Create(value interface{}) *gorm.DB
	Where(query interface{}, args ...interface{}) *gorm.DB
	First(dest interface{}, conds ...interface{}) *gorm.DB
}

// Change this to use the interface
var DBConn DBInterface

// HashPassword - Hashes the user's password
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// VerifyPassword - Compares the hashed password and plain text password
func VerifyPassword(hashedPassword, plainPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword))
	return err == nil
}

// Signup API
func Signup(c *fiber.Ctx) error {
	var user model.User

	// Parse JSON body
	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "Bad Request",
			"msg":        "Invalid request body",
		})
	}

	// Hash password
	hashedPassword, err := HashPassword(user.Password)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Error hashing password",
		})
	}
	user.Password = hashedPassword

	// Store user in database correctly
	result := Database.DBConn.Create(&user)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Internal Server Error",
			"msg":        "Error creating user",
			"error":      result.Error.Error(), //  Return the actual database error
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "User registered successfully",
		"user": fiber.Map{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
			"name":     user.Name,
		},
	})
}

// Login API
func Login(c *fiber.Ctx) error {
	var input struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	var user model.User // Change 'Model' to 'model'

	// Parse JSON body
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"statusText": "Bad Request", "msg": "Invalid request body"})
	}

	// Find user by username
	result := Database.DBConn.Where("username = ?", input.Username).First(&user)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return c.Status(401).JSON(fiber.Map{"statusText": "Unauthorized", "msg": "Invalid username or password"})
		}
		return c.Status(500).JSON(fiber.Map{"statusText": "Internal Server Error", "msg": "Database error"})
	}

	// Check password
	if !VerifyPassword(user.Password, input.Password) {
		return c.Status(401).JSON(fiber.Map{"statusText": "Unauthorized", "msg": "Invalid username or password"})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "OK",
		"msg":        "Login successful!",
		"user": fiber.Map{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
			"name":     user.Name,
		},
	})

}
