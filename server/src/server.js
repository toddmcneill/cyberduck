require('dotenv').config()
const express = require('express')
require('express-async-errors')
const { invoke } = require('./openai')
const path = require('path')

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// Back end
app.post('/check-password', (req, res) => {
  const { password } = req.body
  if (!password) {
    return res.status(400).send('Missing password in body')
  }
  if (password === process.env.ACCESS_PASSWORD) {
    return res.send({ success: true })
  }
  return res.send({ success: false })
})

app.post('/prompt', async (req, res) => {
  const { prompt, password } = req.body
  if (!password || password !== process.env.ACCESS_PASSWORD) {
    return res.status(401).send('Missing or invalid password')
  }
  if (!prompt) {
    return res.status(400).send('Missing prompt in body')
  }
  const answer = await invoke(prompt)
  res.send({ answer })
})

// Front end
const staticPath = path.join(__dirname, '..', process.env.STATIC_CONTENT_PATH)
app.use(express.static(staticPath))

// Forward all other routes to the front end.
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'))
})

app.use((err, req, res, next) => {
  console.log('ERROR: ', err)
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
