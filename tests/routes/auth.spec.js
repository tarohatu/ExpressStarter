const chai = require('chai');
const request = require('supertest');
const db = require('../../models');
const app = require('../../app');
const should = chai.should();

let user = null;

describe('/login', () => {
  before(async () => {
    const name = 't_user';
    const password = 'pass';

    user = await db.users.create({ name, password });
  });

  it('should login', async () => {
    const body = { name: 't_user', password: 'pass' };
    const result = await request(app)
        .post('/v1/login')
        .send(body)
        .expect(200);
    should.exist(result.header);
  });

  it('cannot login with invalid name', async () => {
    const body = { name: 'user', password: 'pass' };
    await request(app)
        .post('/v1/login')
        .send(body)
        .expect(401);
  });

  it('cannot login with invalid password', async () => {
    const body = { name: 't_user', password: 'password' };
    await request(app)
        .post('/v1/login')
        .send(body)
        .expect(401);
  });

  it('cannot login with empty', async () => {
    const body = { name: '', password: '' };
    await request(app)
        .post('/v1/login')
        .send(body)
        .expect(400);
  });
});

describe('/v1/logout', () => {
  it('should logout', async () => {
    await request(app)
        .delete('/v1/logout')
        .expect(204);
  });

  after(async () => {
    await db.users.findByIdAndDelete(user._id);
  });
});
