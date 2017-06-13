package auth

import (
  "log"

  "github.com/go-ozzo/ozzo-routing"
)

func Authorize(c *routing.Context) error {
  log.Println("Received auth request from", c.Request.URL)
  c.Response.WriteHeader(200)
  _, err := c.Response.Write([]byte("You're good!"))
  return err
}
