require('dotenv').config()
const express = require('express')
require('express-async-errors')
const { invoke } = require('./openai')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World! 🤖🦆')
})

app.post('/prompt', async (req, res) => {
  const { prompt } = req.body
  if (!prompt) {
    return res.status(400).send('Missing prompt in body')
  }
  const response = await invoke(prompt)
  res.send(response)
})

app.use((err, req, res, next) => {
  console.log('ERROR: ', err)
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
