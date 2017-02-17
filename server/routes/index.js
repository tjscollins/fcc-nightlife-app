'use strict';
/*eslint-disable require-jsdoc*/

const path = process.cwd();
const https = require('https');
// const dns = require('dns');
const Venue = require('../models/venue');

module.exports = function(app, passport) {
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  app
    .route('/')
    .get(function(req, res) {
      res.sendFile(path + '/public/index.html');
    });

  app
    .route('/login')
    .get(function(req, res) {
      res.sendFile(path + '/public/index.html');
    });

  app
    .route('/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/login');
    });

  app
    .route('/profile')
    .get(isLoggedIn, function(req, res) {
      res.sendFile(path + '/public/index.html');
    });

  app
    .route('/api/search')
    .get((req, res) => {
      //Need to Implement OAuth Authentication w/ Foursquare API for this to work
      let {query} = req.query;
      let options = {
        host: 'api.foursquare.com',
        path: `/v2/venues/search?v=20161016&near=${query}&intent=browse&query=bar&client_id=GIGPF5SO1YUI1T0VYEHRJVKUHLTF4RW3XLGFJUUG2S2DMW3N&client_secret=NN5314Y4WRO5HVXVKCNIBVOH4NUPGUXRAYIYCK0SNIMRYRJY`
      };
      // dns.lookup(options.host, {hints: 0}, console.log);
      https.get(options, (barData) => {
        let responseData = '';
        barData.setEncoding('utf8');
        barData.on('data', (data) => {
          responseData += data;
        });
        barData.on('end', () => {
          res.send(responseData);
        });
      });
    });

  app
    .route('/api/headcount:foursquareId')
    .get((req, res) => {
      let {foursquareId} = req.params;
      // console.log('GET /api/headcount:foursquareId', foursquareId);
      Venue
        .findOne({foursquareId})
        .then((venue) => {
          // console.log('Found venue', venue);
          let count = 0;
          let today = new Date();
          let headcount = venue
            .headcount
            .filter((entry) => {
              if (entry.getDate() === today.getDate() && entry.getMonth() === today.getMonth() && entry.getYear() === today.getYear()) {
                count++;
                return true;
              } else {
                return false;
              }
            });
          // console.log('headcount', headcount);
          venue.update({$set: {
              headcount,
            }});
          res.send({headcount: count});
        })
        .catch((error) => console.log);
    })
    .post((req, res) => {
      let {foursquareId} = req.params;
      Venue
        .findOne({foursquareId})
        .then((venue) => {
          venue
            .headcount
            .push(new Date);
          venue.save();
          res.send({headcount: venue.headcount.length});
        });
    });

  app
    .route('/api/:id')
    .get(isLoggedIn, function(req, res) {
      res.json(req.user.github);
    });

  app
    .route('/auth/github')
    .get(passport.authenticate('github'));

  app
    .route('/auth/github/callback')
    .get(passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));
};
