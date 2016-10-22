const http = require('http')
const request = require('request')
const HttpCors = require('./http-cors')
const cors = new HttpCors({origin: 'https://msgs.surge.sh'})
//const cors = new HttpCors({origin: 'http://localhost:3000'})
const server = http.createServer(function (req, res) {
  console.log(req.method)
  console.log(req.url)
  if (cors.apply(req, res)) return;
  req.pipe(request({
    method: req.method,
    url: 'http://messager:codeisfun@server.pouchcloud.com' + req.url
  })).pipe(res)
})

server.listen(3000)
