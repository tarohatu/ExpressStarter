### 環境構築手順

* 手順を簡単に。
* NVM・Dockerは入れておく。

#### node環境の構築

* nvmのインストール
* 下記コマンド

```
$ nvm install 10.16.0
$ nvm use 10.16.0
```

#### Docker環境の構築

* Dockerのインストール
* 下記コマンド

```
$ cd docker
$ docker-compose up -d
```

#### ~npm startまで

```
$ npm i
$ npm start
```

### 使っているもの

* Express (API Server)
* MongoDB
* Redis (Session Storage)
* Swagger (API Document)
* Mocha, Chai, SuperTest (Test)
* Winston (Logging/Log rotation)
* ESLint (Extends google)
* Passport (Authorization)

### ディレクトリ

* config...config files per environment
* controllers...Controllers
* docker...docker-compose.yml file and volume files
* logs...log files made by winston
* middleware...express handmade middlewares (e.g error handling)
* models...Mongo DB schemas
* routes...definitions of endpoint
* tests...unit tests
* utils...useful files (e.g setup, initialize)
* app.js...root file
