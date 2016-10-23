require('dotenv').config()

const http = require('http')
const request = require('request')
const HttpCors = require('./http-cors')
const cors = new HttpCors({origin: 'https://msgs.surge.sh'})
//const cors = new HttpCors({origin: 'http://localhost:3000'})

const jwt = require('jsonwebtoken')

const server = http.createServer(function (req, res) {

  if (cors.apply(req, res)) return;
  // get Bearer Header
  var bearerToken;
  var bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
      var bearer = bearerHeader.split(" ");
      bearerToken = bearer[1];
      console.log(bearerToken)
      jwt.verify(bearerToken, new Buffer(process.env.AUTH0_SECRET, 'base64'), (err, decoded) => {
        if (err) {
          res.writeHead(403)
          res.end(err.message)
          return
        }
        req.pipe(request({
          method: req.method,
          url: process.env.DB_SERVER + req.url
        })).pipe(res)
      })

  } else {
      res.writeHead(403)
      res.end('Not Authorized!')
  }



})

server.listen(4000)
