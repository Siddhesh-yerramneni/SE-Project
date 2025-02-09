package router

import (
	"github.com/gofiber/fiber/v2"
	controller "github.com/siddhesh-yerramneni/SE-Project/Server/Controller" // FIXED: Import controller package
)

func SetupAuthRoutes(app *fiber.App) {
	app.Post("/login", controller.Login)   // FIXED: Capitalized function names
	app.Post("/signup", controller.Signup) // FIXED: Capitalized function names
}
