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

	// Please Change the dsn of the database locally

	dsn := "root:root@tcp(127.0.0.1:3306)/SEPROJECT?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})
	if err != nil {
		panic("Database connection failed.")
	}
	log.Println(("Database connection is successful!"))

	db.AutoMigrate(new(model.User))
	db.AutoMigrate(new(model.Book))

	DBConn = db
}
