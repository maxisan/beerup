require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');

const passport = require('passport');
const passportConfig = require('./passportConfig');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const routes = require('./routes/index')
//----------------- END OF MODULE IMPORTATION ------------------//

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'BeerUp API',
      description: 'Documentation of BeerUp API project',
      contact: {
        name: "Maximiliano Sánchez",
        url: "https://www.linkedin.com/in/maxisan"
      },
      servers: ['localhost:3001'],
    }
  },
  apis: ['app.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

/** Routes declare */
app.use('/', routes);
//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = app;
