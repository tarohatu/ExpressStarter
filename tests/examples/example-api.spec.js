const chai = require('chai');
const request = require('supertest');

const app = require('../../app');
const should = chai.should();

describe('/v1/status', () => {
  it('should get http ok', async () => {
    const result = await request(app)
        .get('/v1/status')
        .expect(200);
    should.exist(result);
    result.text.should.equal('OK');
  });

  it('cannot get with wrong endpoint', async () => {
    await request(app)
        .get('/v1/statuses')
        .expect(404);
  });
});
