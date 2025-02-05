package database

import (
	"log"

	model "github.com/siddhesh-yerramneni/SE-Project/Server/Models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DBConn *gorm.DB

func ConnectDB() {
	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	dsn := "root:siddhesh@tcp(127.0.0.1:3306)/SE-Project?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})
	if err != nil {
		panic("Database connection failed.")
	}
	log.Println(("Connection is successful!"))

	db.AutoMigrate(new(model.User))

	DBConn = db
}
