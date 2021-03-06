package main

import (
  "log"
  "net/http"
  "math/rand"

  "github.com/go-ozzo/ozzo-routing"
  "github.com/go-ozzo/ozzo-routing/access"
  "github.com/go-ozzo/ozzo-routing/content"
  "github.com/go-ozzo/ozzo-routing/file"
  "github.com/icrowley/fake"


  "github.com/SivanMehta/the-good-with-the-bad/server/auth"
  "github.com/SivanMehta/the-good-with-the-bad/server/chat"
)

// Point data structures
type point struct {
  Text string
  Value int
  UserName string
}

type arg struct {
  Pros []point
  Cons []point
}

func makePointArray(count int) []point {
  a := make([]point, count)

  for i := 0; i < count; i ++ {
    a[i] = point{fake.Sentence(), rand.Intn(100), fake.UserName()}
  }

  return a
}

func fakePoint() point {
  return point{fake.Sentence(), rand.Intn(100), fake.UserName()}
}

func main() {
  router := routing.New()

  // logging middleware
  router.Use(access.Logger(log.Printf))

  // serve static files under the "public" subdirectory
  router.Get("/build/*", file.Server(file.PathMap{
    "/build": "/public/build",
    }))

  // api definitions
  api := router.Group("/api")
  api.Use(content.TypeNegotiator(content.JSON))
  // arguments and their points
  api.Get(`/<arg>`, func(c *routing.Context) error {
    argument := &arg{makePointArray(7), makePointArray(5)}
    return c.Write(argument)
  })
  api.Get(`/<arg>/<point>`, func(c *routing.Context) error {
    point := fakePoint()
    point.Text = c.Param("arg")
    return c.Write(point)
  })
  // authorization
  auth.Populate()
  api.Post("/login", auth.Authorize)
  api.Post("/register", auth.Register)

  // websocket connections
  http.HandleFunc("/ws", chat.HandleConnections)
  go chat.HandleMessages()

  // serve index file otherwise to allow
  // for client-side routing
  router.Get("/*", file.Content("public/index.html"))
  http.Handle("/", router)

  http.ListenAndServe(":8080", nil)
}
