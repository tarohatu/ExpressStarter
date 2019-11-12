const express = require('express');
const db = require('../models/index');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/* eslint new-cap: 0 */
const router = express.Router();

router.use(passport.initialize());

passport.use(new LocalStrategy( { usernameField: 'name', passwordField: 'password' },
    async (name, password, done) => {
      const user = await db.users.findOne({ name }).catch((err) => {
        return done(err);
      });
      if (user) {
        const verifyResult = await user.verifyPassword(password);
        if (verifyResult) {
          const userObj = {
            id: user._id,
            name: user.name
          };
          return done(null, userObj);
        } else {
          return done(null, false);
        }
      } else {
        return done(null, false);
      }
    }));

/**
   * @swagger
   * /v1/login:
   *   post:
   *     description: 名前とパスワードを使用してログインします
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: ユーザ情報
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/LoginInfo'
   *     responses:
   *       200:
   *         description: ログイン成功
   *       400:
   *         schema:
   *           $ref: '#/responses/BadRequest'
   *       401:
   *         schema:
   *           $ref: '#/responses/UnAuthorizedError'
   *       500:
   *         schema:
   *           $ref: '#/responses/InternalServerError'
   */
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  req.session.loggedIn = req.user;
  res.status(200).send();
});

/**
   * @swagger
   * /v1/logout:
   *   delete:
   *     description: ログアウトします
   *     produces:
   *       - application/json
   *     responses:
   *       204:
   *         description: ログアウト成功
   *       500:
   *         schema:
   *           $ref: '#/responses/InternalServerError'
   */
router.delete('/logout', (req, res) => {
  delete req.session.loggedIn;
  res.status(204).send();
});

module.exports = router;
