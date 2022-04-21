require('dotenv').config()
const express = require('express')
require('express-async-errors')
const { invoke } = require('./openai')
const path = require('path')

const app = express()
app.use(express.json())

// Back end
app.post('/prompt', async (req, res) => {
  const { prompt } = req.body
  if (!prompt) {
    return res.status(400).send('Missing prompt in body')
  }
  const answer = await invoke(prompt)
  res.send({ answer })
})

// Front end
const staticPath = path.join(__dirname, '..', '..', 'client', process.env.STATIC_CONTENT_PATH)
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
