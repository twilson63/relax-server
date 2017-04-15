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
DB_SERVER=... JWT_SECRET=... PORT=3000 relax
```

## Contributing

Contributions are welcome to fix bugs and potential security leaks.

## License

MIT
