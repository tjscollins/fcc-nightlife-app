'use strict';

const {ObjectID} = require('mongodb');
const VenueModel = require('./../../server/models/venue.js');
const UserModel = require('./../../server/models/users.js');

const venueOneID = new ObjectID();
const venueTwoID = new ObjectID();

const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const users = [
 {
   twitter: {
     _id: userOneID,
     displayName: 'User One',
   },
 },
 {
   twitter: {
     _id: userTwoID,
     displayName: 'User Two',
   },
 },
];

const venues = [
  {
    _id: venueOneID,
    foursquareId: '1',
    headcount: [
      [userOneID, new Date()], [userTwoID, new Date()],
    ],
  },
  {
    _id: venueTwoID,
    foursquareId: '2',
    headcount: [
      [new ObjectID(), new Date('2016', '01', '01')],
      [new ObjectID(), new Date('2016', '01', '02')],
      [new ObjectID(), new Date('2016', '01', '03')],
    ],
  },
];

const populateServer = (done) => {
  VenueModel.remove({}).then(() => {
    return VenueModel.insertMany(venues);
  });
  UserModel.remove({}).then(() => {
    return UserModel.insertMany(users);
  });
  done();
};

module.exports = {
  users, venues, populateServer,
};
