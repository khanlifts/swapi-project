const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server');


describe('GET http://swapi.co/api/${message.option}/${message.number}/', () => {

  it('should get the homepage', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});
