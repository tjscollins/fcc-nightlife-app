/*global describe it*/
const request = require('supertest');

const {app} = require('./../../server.js');

describe('Server Routes', () => {
  describe('/', () => {
    describe('GET', () => {
      it('should respond 200', (done) => {
        request(app)
          .get('/')
          .send()
          .expect(200)
          .end((err, res) => {
            if (err)
              return done(err);
            done();
          });
      });
    });
  });

  describe('/api/search', () => {
    describe('POST', () => {
      it('should pass queries on to Yelp API and send Yelp data back to client', (done) => {
        let query = 'Saipan';
        request(app)
          .post('/api/search')
          .send({query})
          .expect(200)
          .expect((res) => {
            expect(res).toExist();
            console.log('Server Response ', res);
          }).end((err, res) => {
            if(err) done(err)
            else done();
          });
      });
    });
  });
});
