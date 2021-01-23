const express = require('express')
const cors = require('cors')
const api = require('./api.js')

const app = express()

app.listen(4000, () => {
  console.log('Running at port 4000')
})

app.use(cors({
  origin: 'http://localhost:8080'
}))
app.use('/api', api)

app.use((req, res) => {
  res.sendStatus(404)
})

