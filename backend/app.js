// reads in our .env file and makes those values available as environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
// create an instance of an express app
const app = express();

const cookieParser = require('cookie-parser');
const passport = require('passport');
const routes = require('./routes/main');
const secureRoutes = require('./routes/secure');
const cors = require('cors')

const path = require('path');

/*mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
  )*/


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser : true, useUnifiedTopology: true });
mongoose.connection.on('error', (error) => {
   console.log(error);
   process.exit(1);
});
mongoose.connection.on('connected', function () {
   console.log('connected to mongo');
});


// update express settings
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json
app.use(cookieParser());

// require passport auth
require('./auth/auth');

let reqPath = path.join(__dirname, '../src/login.html')
console.log(reqPath)

let secPath = path.join(__dirname, '../src/signup.html')
console.log(secPath)

let gamPath = path.join(__dirname, '../src/game.html')
console.log(gamPath)

app.use(express.static(reqPath));
app.get('/login', function (req, res) {
  res.sendFile(reqPath);
});

app.use(express.static(secPath));
app.get('/register', function (req, res) {
  res.sendFile(secPath);
});

app.get('/game', passport.authenticate('jwt', { session : false }), function (req, res) {
    res.sendFile(gamPath);
  });

// main routes
app.use('/', routes);


//secure routes
app.use('/', passport.authenticate('jwt', { session : false }), secureRoutes);

// catch all other routes
app.use((req, res, next) => {
  res.status(404);
  res.json({ message: '404 - Not Found' });
});

// handle errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error : err });
});

// have the server start listening on the provided port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});

// reads in our .env file and makes those values available as environment variables
/*require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const routes = require('./routes/main');
const secureRoutes = require('./routes/secure');

// setup mongo connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser : true, useUnifiedTopology: true });
mongoose.connection.on('error', (error) => {
   console.log(error);
   process.exit(1);
});
mongoose.connection.on('connected', function () {
   console.log('connected to mongo');
});

// create an instance of an express app
const app = express();

// update express settings
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());
// require passport auth
require('./auth/auth');

// main routes
app.use('/', routes);
//secure routes
app.use('/', passport.authenticate('jwt', { session : false }), secureRoutes);

// catch all other routes
app.use((req, res, next) => {
  res.status(404).json({ message: '404 - Not Found' });
});

// handle errors
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({ error: err });
});

// have the server start listening on the provided port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});*/

