# [WIP]hello-ui-api-docker-sample

## Build

`hello-api`

```
cd hello-api
mvn package
docker build -t team-cerezo/hello-api .
```

`hello-ui`

```
cd hello-ui
yarn build
docker build -t team-cerezo/hello-ui .
```

## Run

### Dev mode

`hello-api`

```
cd hello-api
mvn spring-boot:run
```

`hello-ui`

```
cd hello-ui
yarn start
```

### Production mode

`hello-api`

```
docker run --name hello-api -d team-cerezo/hello-api
```

`hello-ui`

```
docker run --name hello-ui -d -p 3000:80 --link hello-api team-cerezo/hello-ui
```

