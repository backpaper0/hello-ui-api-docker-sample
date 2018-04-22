# [WIP]hello-ui-api-docker-sample

## 概要

Reactで書かれたフロントエンドとSpring Bootで書かれたバックエンドを組み合わせるサンプル。

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

IDEから`HelloApiApplication`を起動するか、もしくは次のコマンドを実行する。

```console
cd hello-api
mvnw spring-boot:run
```

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

## リクエストの流れ

ブラウザから直接バックエンドのURLへリクエストを投げると、クロスオリジンの制約を受けてしまう。

そのため、一旦`index.html`をホスティングしているサーバーへ向かってリクエストを投げて、そこからリバースプロキシでバックエンドのREST APIへリクエストを中継する。

### 開発時

1. テキストフィールドに入力してEnterを押すと`fetch`で`/api/hello`へリクエストが投げられる
2. `/api/hello`、つまり`http://localhost:3000/api/hello`へのリクエストはwebpack dev serverが受け取る
3. `hello-ui/package.json`に`"proxy": "http://localhost:8080"`という記述があるが、これがあると`/api/`以下のリクエストはリバースプロキシされる
4. webpack dev serverから`http://localhost:8080/api/hello`へリクエストが投げられる
5. Spring Bootアプリケーションがリクエストを受け取って処理する

なお、`package.json`にプロキシ設定が書けるのは`create-react-app`の機能。

* https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development

webpack dev serverのプロキシ機能については次のドキュメントを参照。

* https://webpack.js.org/configuration/dev-server/#devserver-proxy

### Dockerのとき（つまり本番時）

1. テキストフィールドに入力してEnterを押すと`fetch`で`/api/hello`へリクエストが投げられる
2. `/api/hello`、つまり`http://localhost:3000/api/hello`へのリクエストはnginxが受け取る
3. `hello-ui/default.conf.template`（このファイルはDockerイメージを作るときに`/etc/nginx/conf.d/default.conf`へコピーされ、nginxの設定ファイルとして読み込まれる）に次の記述があるが、これで`/api/`以下のリクエストはリバースプロキシされる
   ```
   location /api/ {
       proxy_pass   ${HELLO_API_URL}/api/;
   }
   ```
4. nginxから`${HELLO_API_URL}/api/hello`へリクエストが投げられる（`HELLO_API_URL`はDockerコンテナ起動時に環境変数として渡す）
5. Spring Bootアプリケーションがリクエストを受け取って処理する

