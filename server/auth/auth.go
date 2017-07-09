package auth

import (
  "github.com/syndtr/goleveldb/leveldb"
  "github.com/go-ozzo/ozzo-routing"
  "encoding/json"
)

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

func Register(c *routing.Context) error {
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

func Authorize(c *routing.Context) error {
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

func Populate() {
  // populate with a bunch of fake accounts
  err :=  accounts.Put([]byte("sivan"), []byte("secret"), nil)
  if err != nil { panic(err) }

  // add status codes with some snarky messages
  codes[200] = "Welcome!"
  codes[201] = "Nice to Meet You!"
  codes[403] = "Who the h*ck are you?"
  codes[409] = "Somebody beat you to it"
}
