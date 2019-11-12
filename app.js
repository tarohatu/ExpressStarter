const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const app = express();

app.use(helmet());
app.use(compression());
app.use(methodOverride());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize redis connection
app.use(cookieParser());
require('./utils/redis-session')(app);

// Initialize mongo connection
require('./utils/mongo')(app);

// Setup API routes and error handler
app.use('/v1', require('./routes'));
app.use(require('./middlewares/error-handler'));

// Initialize Swagger docs (not production)
require('./utils/api-docs')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server start on Port: ${port}`);
});

module.exports = app;
