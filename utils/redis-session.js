const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const config = require('config');

module.exports = (app) => {
  const { secret, key, host, port, prefix, maxAge } = config.redis;
  const client = redis.createClient();
  app.use(session({
    secret,
    key,
    resave: false,
    store: new RedisStore({
      client,
      host,
      port,
      prefix
    }),
    cookie: {
      path: '/',
      maxAge
    },
    saveUninitialized: true
  }));
};
