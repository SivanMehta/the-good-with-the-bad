package auth

import (
  "encoding/json"

  "github.com/go-ozzo/ozzo-routing"
  "github.com/syndtr/goleveldb/leveldb"
)

type authorization struct {
  Username string
  Password string
}

// Use a levelDB to store account information
var accounts, _ = leveldb.OpenFile("data/", nil)

func respond(c *routing.Context, header int, message string) error {
  c.Response.WriteHeader(header)
  c.Response.Write([]byte(message))
  return nil
}

func Register(c *routing.Context) error {
  decoder := json.NewDecoder(c.Request.Body)

  var user authorization
  errDecode := decoder.Decode(&user)
  if errDecode != nil { panic(errDecode) }

  accounts.Put([]byte(user.Username), []byte(user.Password), nil)
  return respond(c, 200, "Nice to Meet You!")
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
      return respond(c, 200, "You're good!")
    }
  }
  return respond(c, 403, "Who the h*ck are you?")
}

func Populate() {
  // populate with a bunch of fake accounts
  err :=  accounts.Put([]byte("sivan"), []byte("secret"), nil)
  if err != nil { panic(err) }
}
