if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const http = require('http')
const request = require('request')
const HttpCors = require('./http-cors')
const cors = new HttpCors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.ORIGIN
    : 'http://localhost:3000'
})

const jwt = require('jsonwebtoken')

const server = http.createServer(function (req, res) {
  if (cors.apply(req, res)) return
  // get Bearer Header
  var bearerToken
  var bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(' ')
    bearerToken = bearer[1]

    jwt.verify(bearerToken, process.env.AUTH0_SECRET, (err, decoded) => {
      if (err) {
        res.writeHead(403)
        res.end(err.message)
        return
      }
      req
        .pipe(
          request({ method: req.method, url: process.env.DB_SERVER + req.url })
        )
        .pipe(res)
    })
  } else {
    res.writeHead(403)
    res.end('Not Authorized!')
  }
}).on('error', function (err) {
  console.log(err)
})

module.exports = server
