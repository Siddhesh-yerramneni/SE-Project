package router

import (
	"github.com/gofiber/fiber/v2"
	controller "github.com/siddhesh-yerramneni/SE-Project/Server/Controller"
)

func SetupReviewRoutes(app *fiber.App) {
	app.Post("/addReview", controller.AddReview)
	app.Get("/getReviews/:bookID", controller.GetReviews)
}
