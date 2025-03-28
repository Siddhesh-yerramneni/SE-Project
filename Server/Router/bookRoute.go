package router

import (
	"github.com/gofiber/fiber/v2"
	controller "github.com/siddhesh-yerramneni/SE-Project/Server/Controller"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/", controller.HomePage)
	app.Post("/addBook", controller.AddBook)
	app.Delete("/deleteBook/:id", controller.DeleteBook)
	app.Get("/getBook/:id", controller.GetBook)
	app.Get("/getBooks", controller.GetBooks)
	app.Get("/getBooks/fiction", controller.GetFictionBooks)
	app.Get("/getBooks/selfhelp", controller.GetshBooks)
	app.Get("/getBooks/romance", controller.GetRomanceBooks)
}
