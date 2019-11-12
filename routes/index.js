const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./users.route');

/* eslint new-cap: 0 */
const router = express.Router();

/**
 * GET /status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/', authRoute);
router.use('/users', userRoute);

module.exports = router;
