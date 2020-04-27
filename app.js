const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { OpenApiValidator } = require('express-openapi-validator');

const logger = require('./components/logger')({});
const configureExpressLogger = require('./components/network-logger');
const errorHandler = require('./components/middlewares/error-handler');

const healthRoutes = require('./domain/health/routes');
const usersRoutes = require('./domain/users/routes');
const filmsRouter = require('./domain/films/routes');
const authRoutes = require('./domain/auth/routes');

const createApp = async () => {
  const app = express();
  configureExpressLogger({ app, logger });
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use('/health', healthRoutes);
  app.use('/users', usersRoutes);
  app.use('/films', filmsRouter);
  app.use('/auth', authRoutes);

  await new OpenApiValidator({
    validateRequests: true,
    validateResponses: true,
    apiSpec: './api-docs/api.yaml',
  }).install(app);
  logger.info('Swagger API validation correctly initialized');
  app.use(helmet());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 400,
  }));

  app.use((req, res, next) => {
    next(createError(404));
  });
  app.use(errorHandler);
  return app;
};

module.exports = createApp;
