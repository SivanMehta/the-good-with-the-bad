package auth

import (
  "encoding/json"

  "github.com/go-ozzo/ozzo-routing"
)

type authorization struct {
  RedirectToReferrer bool
  Username string
  Password string
}

// For now, we'll just use a map
// for login and password persistence
var Accounts = make(map[string]string)

func Authorize(c *routing.Context) error {
  decoder := json.NewDecoder(c.Request.Body)

  var user authorization
  errDecode := decoder.Decode(&user)
  if errDecode != nil { panic(errDecode) }

  _, authorized := Accounts[user.Username]
  if(authorized && Accounts[user.Username] == user.Password) {
    c.Response.WriteHeader(200)
    c.Response.Write([]byte("You're good!"))
  } else {
    c.Response.WriteHeader(403)
    c.Response.Write([]byte("Who the h*ck are you?"))
  }

  return nil
}
