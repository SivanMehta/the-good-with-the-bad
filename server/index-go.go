package main

import (
	"log"
	"net/http"
  "encoding/json"

	"github.com/go-ozzo/ozzo-routing"
	"github.com/go-ozzo/ozzo-routing/access"
	"github.com/go-ozzo/ozzo-routing/slash"
	"github.com/go-ozzo/ozzo-routing/content"
	"github.com/go-ozzo/ozzo-routing/fault"
	"github.com/go-ozzo/ozzo-routing/file"

  "github.com/icrowley/fake"

  "math/rand"
)

type Point struct {
  text string
  value int
  userName string
}

type Arg struct {
  Pros []Point
  Cons []Point
}

func makePointArray(count int) []Point {
  a := make([]Point, count)

  for i := 0; i < count; i ++ {
    a[i] = Point{fake.Sentence(), rand.Intn(100), fake.UserName()}
  }

  return a
}

func main() {
	router := routing.New()

	router.Use(
		// all these handlers are shared by every route
		access.Logger(log.Printf),
		slash.Remover(http.StatusMovedPermanently),
		fault.Recovery(log.Printf),
	)

	api := router.Group("/api")
	api.Use(
		// these handlers are shared by the routes in the api group only
		content.TypeNegotiator(content.JSON, content.XML),
	)
	api.Get(`/<arg:\d+>`, func(c *routing.Context) error {
    argument := &Arg{makePointArray(7), makePointArray(5)}
    b, err := json.Marshal(argument)
    if err != nil {
      return c.Write("Error!")
    } else {
      return c.Write(string(b))
    }
	})

	// serve index file
	router.Get("/", file.Content("public/index.html"))
	// serve files under the "public" subdirectory
	router.Get("/build/*", file.Server(file.PathMap{
		"/build": "/public/build",
	}))

	http.Handle("/", router)
	http.ListenAndServe(":8080", nil)
}
//
