const db = require('../models');

/**
 * Get user list.
 * @public
 * @param {Object} req  request data.
 * @param {Object} res  response obj.
 * @param {func}   next next
 */
exports.list = async (req, res, next) => {
  const result = await db.users.find().select('name').catch(next);
  res.json(result);
};

/**
 * Create new user.
 * @public
 * @param {Object} req  request data.
 * @param {Object} res  response obj.
 * @param {func}   next next
 */
exports.create = async (req, res, next) => {
  const result = await db.users.create(req.body).catch(next);
  res.json(result);
};

/**
 * Load user by specific id.
 * @public
 * @param {Object} req  request data.
 * @param {Object} res  response obj.
 * @param {func}   next next.
 * @param {String} id   user's id.
 */
exports.load = async (req, res, next, id) => {
  const result = await db.users.findById(id).select('name').catch(next);
  req.locals = result;
  next();
};

/**
 * Get specific user by id.
 * @public
 * @param {Object} req  request data.
 * @param {Object} res  response obj.
 * @param {func}   next next
 */
exports.get = (req, res, next) => {
  res.json(req.locals);
};

/**
 * Get self Info by session
 * @public
 * @param {Object} req  request data.
 * @param {Object} res  response obj.
 * @param {func}   next next
 */
exports.getSelf = (req, res, next) => {
  const { loggedIn } = req.session;
  res.json(loggedIn);
};
