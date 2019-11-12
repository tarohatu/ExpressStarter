const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseBcrypt = require('mongoose-bcrypt');

/**
 * @swagger
 * parameter:
 *   userIdPathParam:
 *     in: path
 *     name: id
 *     description: ユーザーID
 *     required: true
 *     type: string
 */
/**
 * @swagger
 * definition:
 *   Users:
 *     type: object
 *     description: ユーザ
 *     required:
 *       - name
 *       - password
 *     properties:
 *       name:
 *         type: string
 *         description: ユーザの名前
 *       password:
 *         type: string
 *         description: パスワード
 */
/**
 * @swagger
 * definition:
 *   LoginInfo:
 *     type: object
 *     description: ログイン情報
 *     required:
 *       - name
 *       - password
 *     properties:
 *       name:
 *         type: string
 *         description: ユーザの名前
 *       password:
 *         type: string
 *         description: パスワード
 */
/**
 * @swagger
 * definition:
 *   LoggedInUser:
 *     type: object
 *     description: ログインされたユーザ情報
 *     properties:
 *       id:
 *         type: string
 *         description: id
 *       name:
 *         type: string
 *         description: ユーザの名前
 */
const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
});

UserSchema.plugin(mongooseBcrypt, { fields: ['password'] });

module.exports = mongoose.model('users', UserSchema);
