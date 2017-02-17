const {ObjectID} = require('mongodb');
const VenueModel = require('./../../server/models/venue.js');

const venueOneID = new ObjectID();
const venueTwoID = new ObjectID();

const venues = [
  {
    _id: venueOneID,
    foursquareId: '1',
    headcount: [
      new Date(), new Date(),
    ],
  },
  {
    _id: venueTwoID,
    foursquareId: '2',
    headcount: [
      new Date('2016', '01', '01'),
      new Date('2016', '01', '02'),
      new Date('2016', '01', '03'),
    ],
  },
];

const populateServer = (done) => {
  VenueModel.remove({}).then(() => {
    return VenueModel.insertMany(venues);
  });
  done();
};

module.exports = {
  venues, populateServer,
};
