# CYBERDUCK

## Development
* Use node 16
* Install docker
* Copy server/.env.example to server/.env and edit values
* Run `yarn`
* Run `docker-compose up`
* Visit `localhost:3000`


## Deployment
* Run `docker login registry.digitalocean.com`
** Paste digital ocean API key for both username and password

```
docker build -t registry.digitalocean.com/cyberduck/cyberduck-app:latest -f server/Dockerfile .
docker push registry.digitalocean.com/cyberduck/cyberduck-app:latest
```

