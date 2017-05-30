const express = require('express')
const path = require('path')
var app = express()

app.use(require('morgan')('dev'))

// static files
app.use(express.static(path.resolve(__dirname, '..', 'public')))

function fakePoint() {
  return {
    text: faker.hacker.phrase(),
    value: Math.round(Math.random() * 100),
    userName: faker.internet.userName()
  }
}

function fakePoints(points) {
  return "a".repeat(points).split('a').map(fakePoint)
}

// mock an api
const faker = require('faker')
app.get('/api/:argument', (req, res) => {
  res.send({
    Pros: fakePoints(7),
    Cons: fakePoints(5)
  })
})

app.get('/api/:argument/:point', (req, res) => {
  var point = fakePoint()
  point.text = req.params.point
  res.send(fakePoint())
})

// render the rest of the application with client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

app.listen(8080)
