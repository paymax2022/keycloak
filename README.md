# HMO Keycloak POC

## Build and Deploy

1. Run the command

```
npm install
npm run start
```

2. Load docker image from `.tar`

```
docker load < hmo-keycloak.tar
```

3. Run the image in a new container

```
docker run hmo-keycloak -d -p 3031:3031
```

## Test

You can use the Postman request collections to access the endpoints: https://api.postman.com/collections/11972508-19204fa0-e515-45db-bb29-09ad05d4cecc?access_key=PMAT-01GPFYT7CYNX3CJ0F3H1HZ376C
