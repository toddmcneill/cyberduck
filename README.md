# CYBERDUCK

## Development
* Use node 16
* Install docker
* Run `yarn`
* Run `docker-compose up`
* Visit `localhost:3000`


## Deployment
Login (once): `docker login registry.digitalocean.com`
* Paste digital ocean API key for both username and password

Build: `docker build -t registry.digitalocean.com/cyberduck/cyberduck-app:latest -f server/Dockerfile .`

Run locally (optional): `docker run -i -t --env-file server/.env --env PORT=3000 --env STATIC_CONTENT_PATH=build -p 3000:3000 --expose 3000 registry.digitalocean.com/cyberduck/cyberduck-app:latest`

Push: `docker push registry.digitalocean.com/cyberduck/cyberduck-app:latest`
