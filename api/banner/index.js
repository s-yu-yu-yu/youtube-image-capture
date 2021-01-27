/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const run = require('./run.js')

exports.index = (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://youtube-image-capture.herokuapp.com')
  res.set('Access-Control-Allow-Methods', 'GET')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  res.set('Access-Control-Max-Age', '3600')
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.status(204).send('ok')
  } else {
    if (!/^https:\/\/www.youtube.com\/channel/.test(req.query.url)) {
      const err = new Error('BadRequest')
      res.status(400).send({ error: err })
    } else {
      run(req.query.url)
        .then((resData) => {
          res.status(200).json({
            url: resData
          })
        })
        .catch((error) => {
          console.error(error)
          const err = new Error('NotFound')
          res.status(404).send({ error: err })
        })
    }
  }
}
