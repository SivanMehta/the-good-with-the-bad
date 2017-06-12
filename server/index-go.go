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
    content.TypeNegotiator(content.JSON),
  )
  api.Get(`/<arg>`, func(c *routing.Context) error {
    argument := &Arg{makePointArray(7), makePointArray(5)}
    data, err := json.Marshal(argument)
    if err != nil {
      panic(err)
    }
    c.Set("Content-Type", "application/json")
    return c.Write(string(data))
  })

  // serve files under the "public" subdirectory
  router.Get("/build/*", file.Server(file.PathMap{
    "/build": "/public/build",
  }))

  // serve index file otherwise to allow
  // for client-side routing
  router.Get("/*", file.Content("public/index.html"))

  http.Handle("/", router)
  http.ListenAndServe(":8080", nil)
}
//
