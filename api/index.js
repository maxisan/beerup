require('dotenv').config()
const server = require('./app');
const { conn } = require('./db/db');
const preload = require('./db/models/preload/preload');


const port = process.env.PORT || 3001

conn.sync({ force: process.env.DB_FORCE_SYNC === 'true' })
  .then(() => {
    if (process.env.DB_FORCE_SYNC === 'true') {
      preload.adminPreload()
        .then(() => preload.usersPreload())
        .then(() => preload.meetupPreload())
        .then(() => preload.relationsPreload())
    }
  })
  .then(() => server.listen(port, console.log(`Server listening on port ${port}`)));