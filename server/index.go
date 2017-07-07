package main

import (
  "log"
  "net/http"
  "math/rand"
  "encoding/json"

  "github.com/go-ozzo/ozzo-routing"
  "github.com/go-ozzo/ozzo-routing/access"
  "github.com/go-ozzo/ozzo-routing/content"
  "github.com/go-ozzo/ozzo-routing/file"
  "github.com/syndtr/goleveldb/leveldb"
  "github.com/icrowley/fake"

  "./chat"
)

// Data structure definitions

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


// Authorization setup
type authorization struct {
  Username string
  Password string
}

// Use a levelDB to store account information
var accounts, _ = leveldb.OpenFile("data/", nil)
var codes = make(map[int]string)

func respondWithStatus(c *routing.Context, header int) error {
  var message []byte = []byte(codes[header])
  c.Response.WriteHeader(header)
  c.Response.Write(message)
  return nil
}

func register(c *routing.Context) error {
  decoder := json.NewDecoder(c.Request.Body)

  var user authorization
  errDecode := decoder.Decode(&user)
  if errDecode != nil { panic(errDecode) }

  exists, _ := accounts.Has([]byte(user.Username), nil)
  if(exists) {
    return respondWithStatus(c, 409)
  }

  accounts.Put([]byte(user.Username), []byte(user.Password), nil)
  return respondWithStatus(c, 201)
}

func authorize(c *routing.Context) error {
  decoder := json.NewDecoder(c.Request.Body)

  var user authorization
  errDecode := decoder.Decode(&user)
  if errDecode != nil { panic(errDecode) }

  authorized, _ := accounts.Has([]byte(user.Username), nil)
  if(authorized) {
    pass, _ := accounts.Get([]byte(user.Username), nil)
    if(string(pass) == user.Password) {
      return respondWithStatus(c, 200)
    }
  }
  return respondWithStatus(c, 403)
}

func populate() {
  // populate with a bunch of fake accounts
  err :=  accounts.Put([]byte("sivan"), []byte("secret"), nil)
  if err != nil { panic(err) }

  // add status codes with some snarky messages
  codes[200] = "Welcome!"
  codes[201] = "Nice to Meet You!"
  codes[403] = "Who the h*ck are you?"
  codes[409] = "Somebody beat you to it"
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
  populate()
  api.Post("/login", authorize)
  api.Post("/register", register)

  // websocket connections
  http.HandleFunc("/ws", chat.HandleConnections)
  go chat.HandleMessages()

  // serve index file otherwise to allow
  // for client-side routing
  router.Get("/*", file.Content("public/index.html"))
  http.Handle("/", router)

  http.ListenAndServe(":8080", nil)
}
