const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// See config/*.json
const config = require('config');
const mongoURL = config.mongo.url || 'localhost';
const mongoUser = config.mongo.user || '';
const mongoPass = config.mongo.password || '';
const mongoDBName = config.mongo.dbName || 'mongodblocal';

const logger = require('./logger');

module.exports = (app) => {
  const options = {
    ssl: false,
    sslValidate: false,
    poolSize: 1,
    reconnectTries: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  let mongoConnect = 'mongodb://localhost:27017';
  if (mongoURL !== '' && mongoUser !== '' && mongoPass != '') {
    mongoConnect = `mongodb://${mongoUser}:${mongoPass}@${mongoURL}/${mongoDBName}`;
  } else if (mongoURL !== '') {
    mongoConnect = `mongodb://${mongoURL}/${mongoDBName}`;
  }

  mongoose.Promise = global.Promise;
  mongoose.connect(mongoConnect, options).catch((error) => {
    if (error) logger.error(error);
  });

  const db = mongoose.connection;
  db.on('error', (error) => {
    logger.error(error);
  });

  const sess = {
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    name: 'mongo example',
    secret: 'mongo secret',
    resave: false,
    saveUninitialized: true,
    cookie: { }
  };

  app.use(session(sess));
};
