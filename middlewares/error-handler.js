const status = require('http-status');
const logger = require('../utils/logger');

/**
 * @swagger
 * response:
 *   BadRequest:
 *     description: リクエストパラメータが不正
 *     schema:
 *       type: string
 *   NotFound:
 *     description: 該当データが存在しない
 *     schema:
 *       type: string
 *   InternalServerError:
 *     description: サーバ側エラー
 *     schema:
 *       type: string
 *   UnAuthorizedError:
 *     description: 認証エラー
 *     schema:
 *       type: string
 *   Forbidden:
 *     description: 許可されないアクション
 *     schema:
 *       type: string
 */
/**
 * Error handling middleware
 * @param {*} err Error Object.
 * @param {*} req Request Object.
 * @param {*} res Response Object.
 * @param {*} next Next Func.
 */
const errorHandler = (err, req, res, next) => {
  if (!!err.status) {
    logger.warn(err);
    res.status(err.status).send(err);
  } else {
    logger.error(err);
    res.status(status.INTERNAL_SERVER_ERROR).send(err);
  }
};

module.exports = errorHandler;
