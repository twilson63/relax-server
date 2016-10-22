const http = require('http')
const request = require('request')
const HttpCors = require('./http-cors')
const cors = new HttpCors({origin: 'https://msgs.surge.sh'})

const server = http.createServer(function (req, res) {
  if (cors.apply(req, res)) return;
  request(request('http://messager:codeisfun@server.pouchcloud.com' + req.url)).pipe(res)
})

server.listen(4000)
