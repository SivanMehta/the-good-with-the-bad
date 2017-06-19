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

  "./chat"
  "./auth"
  "./database"
)

type Point struct {
  Text string
  Value int
  UserName string
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

func fakePoint() Point {
  return Point{fake.Sentence(), rand.Intn(100), fake.UserName()}
}

func main() {
  router := routing.New()

  // logging middleware
  router.Use(access.Logger(log.Printf))

  // serve static files under the "public" subdirectory
  router.Get("/build/*", file.Server(file.PathMap{
    "/build": "/public/build",
    }))

  // connect to database
  database.Initialize()

  // api definitions
  api := router.Group("/api")
  api.Use(content.TypeNegotiator(content.JSON))
  api.Get(`/<arg>`, func(c *routing.Context) error {
    argument := &Arg{makePointArray(7), makePointArray(5)}
    return c.Write(argument)
  })
  api.Get(`/<arg>/<point>`, func(c *routing.Context) error {
    point := fakePoint()
    point.Text = c.Param("arg")
    return c.Write(point)
  })
  // authorization
  auth.Accounts["sivan"] = "secret"
  api.Post("/auth", auth.Authorize)

  // websocket connections
  http.HandleFunc("/ws", chat.HandleConnections)
  go chat.HandleMessages()

  // serve index file otherwise to allow
  // for client-side routing
  router.Get("/*", file.Content("public/index.html"))
  http.Handle("/", router)

  http.ListenAndServe(":8080", nil)
}
