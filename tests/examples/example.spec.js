/* eslint-env mocha */
const chai = require('chai');
const should = chai.should();

describe('example test', () => {
  it('success case', () => {
    const val = 1;
    val.should.equal(1);
  });

  it('failure case', () => {
    try {
      throw new Error();
    } catch (err) {
      should.exist(err);
    }
  });
});
