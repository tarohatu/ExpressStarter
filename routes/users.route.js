const express = require('express');
const controller = require('../controllers/users.controller');
const validate = require('express-validation');
const authHandler = require('../middlewares/auth-handler');
const validation = require('./validations/user.validation');
/* eslint new-cap: 0 */
const router = express.Router();

router.route('/')
/**
   * @swagger
   * /v1/users:
   *   get:
   *     description: ユーザの一覧を取得します
   *     produces:
   *       - application/json
   *     parameters:
   *     responses:
   *       200:
   *         description: ユーザの一覧を返します
   *       500:
   *         schema:
   *           $ref: '#/responses/InternalServerError'
   */
    .get(controller.list)
/**
   * @swagger
   * /v1/users:
   *   post:
   *     description: 新しいユーザを作成します
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: ユーザ情報
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Users'
   *     responses:
   *       200:
   *         description: 作成されたユーザのオブジェクト
   *         schema:
   *           $ref: '#/definitions/Users'
   *       400:
   *         schema:
   *           $ref: '#/responses/BadRequest'
   *       500:
   *         schema:
   *           $ref: '#/responses/InternalServerError'
   */
    .post(validate(validation.create), controller.create);

router.route('/self')
/**
   * @swagger
   * /v1/users/self:
   *   get:
   *     description: ログインされたユーザ情報を取得します
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: ユーザの情報を返します
   *         schema:
   *           $ref: '#/definitions/LoggedInUser'
   *       401:
   *         schema:
   *           $ref: '#/responses/UnAuthorizedError'
   *       500:
   *         schema:
   *           $ref: '#/responses/InternalServerError'
   */
    .get(authHandler(), controller.getSelf);

router.param('id', controller.load);

router.route('/:id')
/**
   * @swagger
   * /v1/users/{id}:
   *   get:
   *     description: idをもとに、特定のユーザを取得します
   *     produces:
   *       - application/json
   *     parameters:
   *       - $ref: '#/parameters/userIdPathParam'
   *     responses:
   *       200:
   *         description: ユーザの検索結果を返します
   *         schema:
   *           $ref: '#/definitions/Users'
   *       404:
   *         schema:
   *           $ref: '#/responses/NotFound'
   *       500:
   *         schema:
   *           $ref: '#/responses/InternalServerError'
   */
    .get(controller.get);

module.exports = router;
