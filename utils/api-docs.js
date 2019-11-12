module.exports = (app) => {
  /* Swagger Documents */
  if (process.env.NODE_ENV !== 'production') {
    const swaggerUi = require('swagger-ui-express');
    const swaggerJSDoc = require('swagger-jsdoc');

    const options = {
      swaggerDefinition: {
        info: {
          title: 'Example API',
          version: '1.0.0'
        }
      },
      apis: ['./routes/*.js', './models/**/*.js', './middlewares/error-handler.js']
    };
    app.use('/spec', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
  }
};
