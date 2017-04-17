# relax server

Relax Server is a minimum server that connects your clients to a couchdb or any backend api. It provides support for Auth0 or JWT Authentication from the client and proxies the request using the request client and streams.

## Why

* Offline First implementation with PouchDB and syncing with a backend CouchDB.
* Backend API Server uses a different key than your users and you don't want to expose
the key to your client system.

## Environment variables

DB_SERVER=[couchdb url]
AUTH0_SECRET=[auth0 secret]

## Usage

```
npm install relax-server -g
SERVER=... JWT_SECRET=... ORIGIN=http://client.now.sh PORT=3000 relax
```

or

```
mkdir relax-server-app
cd relax-server-app
touch index.js
npm init -y
npm install relax-server --save
```

index.js

```
const server = require('relax-server')

// get secrets....

server(jwt, server, origin)
  .listen(process.env.PORT || 4000)
```

## Development

For development you can create a .env file and put your env variables in
the env file. For production, you need to provide the env variables as the
app is being invoked.

.env

```
SERVER=http://localhost:5984
JWT_SECRET=1234
ORIGIN=http://localhost:3000
```


## Contributing

Contributions are welcome to fix bugs and potential security leaks.

## Testing

JWT

`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0OTIyOTUyMDAsImV4cCI6MTUyMzgzMTIwMCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.X_anaO3nyGxjxZYkTiYf2XE_x3NoPA64bFnHatsUiFw`

SECRET

`REALLYBIGSECRET`

## License

MIT
