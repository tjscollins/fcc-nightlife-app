/*global describe it*/
const request = require('supertest');
const expect = require('expect');

const {app} = require('./../../server.js');
const {populateServer} = require('./seed.js');

const mongoose = require('mongoose');
const Venue = require('../../server/models/venue');

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

  describe('/api/headcount:id', () => {
    describe('GET', () => {
      it('should return headcounts from MongoDB for a list of locations', (done) => {
        let id = '1';
        request(app)
          .get('/api/headcount' + id)
          .send()
          .expect(200)
          .expect((res) => {
            let {headcount} = res.body;
            expect(headcount).toExist();
            expect(headcount).toNotBe(undefined);
            expect(headcount).toBe(2);
          })
          .end((err, res) => {
            if (err)
              done(err);
            else
              done();
            }
          );
      });

      it('should clear old entries from headcounts', (done) => {
        let id = '2';
        Venue
          .find({foursquareId: id})
          .then((venue) => {
            expect(venue.headcount.length).toBe(1);
          })
          .catch((err) => {
            throw err;
          });

        request(app)
          .get('/api/headcount' + id)
          .send()
          .expect(200)
          .expect((res) => {
            let {headcount} = res.body;
            // expect(headcount).toExist();
            expect(headcount).toNotBe(undefined);
            expect(headcount).toBe(0);

            Venue
              .find({foursquareId: id})
              .then((venue) => {
                console.log('venue', venue);
                expect(venue.headcount.length).toBe(0);
              })
              .catch((err) => {
                throw err;
              });
          })
          .end((err, res) => {
            if (err) done(err);
            else done();
            }
          );
      });
    });
  });
});
