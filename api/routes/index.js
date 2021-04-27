const { Router } = require('express');

const routing = Router();

const meetupRoute = require('./meetup/meetupRoute');
const userRoute = require('./user/userRoute');

routing.use('/meetup', meetupRoute);
routing.use('/user', userRoute);

module.exports = routing;