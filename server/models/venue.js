'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Venue = new Schema({
	foursquareId: String,
	headcount: [Date],
});

module.exports = mongoose.model('Venue', Venue);
