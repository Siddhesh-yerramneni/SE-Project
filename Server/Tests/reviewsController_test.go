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
