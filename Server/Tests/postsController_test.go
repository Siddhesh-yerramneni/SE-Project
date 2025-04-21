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