const express = require('express')
const path = require('path')

const app = express()

app.listen(3001)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
