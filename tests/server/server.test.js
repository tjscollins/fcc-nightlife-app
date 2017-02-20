/*global describe it*/
const request = require('supertest');
const expect = require('expect');

const {app} = require('./../../server.js');
const {users, populateServer} = require('./seed.js');

beforeEach(populateServer);

describe('Server Routes', () => {
  describe('/', () => {
    describe('GET', () => {
      it('should respond with 200', (done) => {
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
    describe('GET', () => {
      it('should pass queries on to Foursquare API and send Foursquare data back to client', (done) => {
        request(app)
          .get('/api/search?query=Saipan')
          .send()
          .expect(200)
          .expect((res) => {
            expect(JSON.parse(res.text).response.venues[0]).toExist();
          })
          .end((err, res) => {
            if (err)
              done(err);
            else
              done();
            }
          );
      });
    });
  });

  describe('/api/headcount:foursquareId', () => {
    describe('GET', () => {
      it('should return headcounts from MongoDB for a list of locations', (done) => {
        let foursquareId = '1';

        request(app)
          .get('/api/headcount' + foursquareId)
          .send()
          .expect(200)
          .expect((res) => {
            let {headcount} = res.body;
            expect(headcount).toExist();
            expect(headcount).toNotBe(undefined);
            expect(headcount).toBe(2);
          })
          .end((err, res) => {
            if (err) done(err);
            else done();
            }
          );
      });

      it('should clear old entries from headcounts', (done) => {
        let foursquareId = '2';

        request(app)
          .get('/api/headcount' + foursquareId)
          .send()
          .expect(200)
          .expect((res) => {
            let {headcount} = res.body;
            expect(headcount).toNotBe(undefined);
            expect(headcount).toBe(0);
          })
          .end((err, res) => {
            if (err) done(err);
            else done();
            }
          );
      });
    });

    describe('POST', () => {
      it('should add [id, Date] entry to the headcount array if there is no entry for [id]', (done) => {
        let foursquareId = '1';

        request(app)
          .post('/api/headcount' + foursquareId)
          .send({_id: '1234'})
          .expect(200)
          .expect((res) => {
            let {headcount} = res.body;
            expect(headcount).toExist();
            expect(headcount).toNotBe(undefined);
            expect(headcount).toBe(3);
          }).end((err, res) => {
            if (err) done(err);
            else done();
          });
      });

      it('should remove [id, Date] entry to the headcount array if there is an existing entry for [id]', (done) => {
        let foursquareId = '1';

        request(app)
          .post('/api/headcount' + foursquareId)
          .send({_id: users[0].twitter._id})
          .expect(200)
          .expect((res) => {
            let {headcount} = res.body;
            expect(headcount).toExist();
            expect(headcount).toNotBe(undefined);
            expect(headcount).toBe(1);
          }).end((err, res) => {
            if (err) done(err);
            else done();
          });
      });
    });
  });
});
