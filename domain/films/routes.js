const express = require('express');

const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

const logger = require('../../components/logger')({});
const db = require('../../db');
const createFilmsService = require('./service');

const filmsService = createFilmsService({ db });

const router = express.Router();

router.get('/', (req, res) => {
  filmsService
    .startScrapping()
    .then(() => res.json({}))
    .catch((err) => {
      logger.error(err);
      res.status(INTERNAL_SERVER_ERROR).json(err);
    });
});

module.exports = router;
