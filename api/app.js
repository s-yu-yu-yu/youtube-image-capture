const express = require('express')
const cors = require('cors')
const api = require('./api.js')

const app = express()

app.listen(process.env.PORT || 8080, () => {
  console.log('Running')
})

app.use(cors({
  origin: 'https://s-yu-yu-yu.github.io/youtube-image-capture/'
}))
app.use('/api', api)

app.use((req, res) => {
  res.sendStatus(404)
})

