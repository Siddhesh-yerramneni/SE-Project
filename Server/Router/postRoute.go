package router

import (
	"github.com/gofiber/fiber/v2"
	controller "github.com/siddhesh-yerramneni/SE-Project/Server/Controller"
)

func SetupPostRoutes(app *fiber.App) {
	app.Post("/createPost", controller.CreatePost)
	app.Delete("/deletePost/:id", controller.DeletePost)
	app.Get("/getPosts", controller.GetAllPosts)
	app.Get("/getPosts/:authorID", controller.GetPostsByAuthorID)
	app.Put("/editPost/:id", controller.EditPost)
}
