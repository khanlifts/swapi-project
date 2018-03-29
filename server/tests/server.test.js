const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');


const message = {
  option: 'people',
  number: 1
}

describe('GET http://swapi.co/api/${message.option}/${message.number}/', () => {

  it('should get the names', (done) => {
    request(app)
      .get(`http://swapi.co/api/people/1/`)
      .expect(200)
      .expect((res) => {
        expect(res.name).toBe('Luke Skywalker');
      })
      .end(done);
  });
});
