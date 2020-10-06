# installation

```
npm i 
cd client && npm i
```

# build

```
cd client && npm run build
```

# development

build client

start server with

```
npm start
```


# old 

## locally

```
AUTH_ENABLED=true AUTH0_CALLBACK_URL='http://localhost:3000/callback' nodemon index.js
```

## deploy

```
docker-compose up --build -d

# or

ssh root@cf 'cd decent-social-app; git pull; docker-compose up --build -d'
```