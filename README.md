## locally

```
AUTH_ENABLED=true AUTH0_CALLBACK_URL='http://localhost:3000/callback' nodemon index.js
```

## deploy

```
docker-compose up --build -d

# or

ssh root@cf 'cd productlistings.app; git pull; docker-compose up --build -d'
```