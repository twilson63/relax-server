const http = require('http')
const request = require('request')
const HttpCors = require('./http-cors')

const jwt = require('jsonwebtoken')

module.exports = (token, svr, origin = 'http://localhost:3000') => {
  const cors = new HttpCors({ origin })

  return http.createServer(function (req, res) {
    if (cors.apply(req, res)) return
    // get Bearer Header
    var bearerToken
    var bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
      var bearer = bearerHeader.split(' ')
      bearerToken = bearer[1]

      jwt.verify(bearerToken, token, (err, decoded) => {
        if (err) {
          res.writeHead(403)
          res.end(err.message)
          return
        }
        req.pipe(request({ method: req.method, url: svr + req.url })).pipe(res)
      })
    } else {
      res.writeHead(403)
      res.end('Not Authorized!')
    }
  }).on('error', function (err) {
    console.log(err)
  })
}
