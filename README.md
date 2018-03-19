# [WIP]hello-ui-api-docker-sample

## セットアップ

GitHubから`clone`する。

```console
git clone https://github.com/backpaper0/hello-ui-api-docker-sample.git
cd hello-ui-api-docker-sample
```

### hello-api

とくにやることなし！

### hello-ui

依存ライブラリをインストールする。

```console
cd hello-ui
yarn install
```

## 開発するとき

開発するときは変更がすぐに反映するようにしてフィードバックサイクルを短く保ちたい。

Spring Boot DevToolsとwebpack dev serverを使うことでそれが可能になる。

### hello-api

IDEから`HelloApiApplication`を起動する。

### hello-ui

```console
cd hello-ui
yarn start
```

## Dockerで動かす

Dockerで動かすには次の手順が必要になる。

1. アプリケーションをビルドする
2. Dockerイメージをビルドする

### hello-api

```console
cd hello-api
mvnw package
docker build -t team-cerezo/hello-api .
```

### hello-ui

```console
cd hello-ui
yarn build
docker build -t team-cerezo/hello-ui .
```

### 動かす

```console
docker run --name hello-api -d team-cerezo/hello-api
docker run --name hello-ui -d -p 3000:80 --link hello-api team-cerezo/hello-ui
```

### docker-composeで動かす

`docker-compose`は複数のDockerコンテナを一括で操作できるやつ。
便利。

```console
docker-compose up -d
```
