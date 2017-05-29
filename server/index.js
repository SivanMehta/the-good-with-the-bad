const express = require('express')
const path = require('path')
var app = express()

app.use(require('morgan')('dev'))

// static files
app.use(express.static(path.resolve(__dirname, '..', 'public')))

function newPoints(points) {
  return "a".repeat(points).split('a').map(_ => ({
    text: faker.hacker.phrase(),
    value: Math.round(Math.random() * 100)
    userName: faker.internet.userName()
  }))
}

// mock an api
const faker = require('faker')
app.get('/api/:argument', (req, res) => {
  res.send({
    Pros: newPoints(7),
    Cons: newPoints(5)
  })
})

// render the rest of the application with client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

app.listen(8080)
