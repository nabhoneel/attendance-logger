// init project
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const winston = require('./config/winston');
const morgan = require('morgan');

// le valuable environment variables:
require('dotenv').config();

const keys = require('./keys/keys'); // various keys, URIs, etc
require('./models/User'); // user model file
require('./models/Attendance'); // attendance model file
require('./passport'); // passport service file (must be present after User.js, so that the 'users' collection is already registered)

const app = express();

// log to file:
app.use(morgan('combined', { stream: winston.stream }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000, // 30 days' lifetime
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./allRoutes')(app); // set up Passport and routes

mongoose.connect(keys.mongoURI, { useNewUrlParser: true }).catch(err => console.log(err)); // set up MongoDB via Mongoose

// for production version:
if(process.env.NODE_ENV == 'production') {
  // in general, use:
  app.use(express.static('client/build'));

  // for everything else:
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

// listen for requests
console.log(PORT);
app.listen(PORT);