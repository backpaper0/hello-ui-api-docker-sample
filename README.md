# [WIP]hello-ui-api-docker-sample

## Setup

```console
git clone https://github.com/backpaper0/hello-ui-api-docker-sample.git
cd hello-ui-api-docker-sample
```

`hello-api`

Nothing to do.

`hello-ui`

```console
cd hello-ui
yarn install
```

## Build

`hello-api`

```console
cd hello-api
mvnw package
docker build -t team-cerezo/hello-api .
```

`hello-ui`

```console
cd hello-ui
yarn build
docker build -t team-cerezo/hello-ui .
```

## Run

### Dev mode

`hello-api`

```console
cd hello-api
mvnw spring-boot:run
```

`hello-ui`

```console
cd hello-ui
yarn start
```

### Production mode

`hello-api`

```console
docker run --name hello-api -d team-cerezo/hello-api
```

`hello-ui`

```console
docker run --name hello-ui -d -p 3000:80 --link hello-api team-cerezo/hello-ui
```

