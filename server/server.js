'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var account = require('./routes/account');
var profile = require('./routes/profile');

// Set up mongoose connection
var mongoURI = `mongodb://${process.env.MONGODB_HOST || 'localhost'}:${process.env.MONGODB_PORT || '27017'}/gsg`;
mongoose.connect(mongoURI).then((goose) => {
  if (goose) {
    console.log('Connected to MongoDB at', mongoURI)
  }
}).catch(error => {
  console.log('MongoDB/mongoose error:', error)
});
mongoose.Promise = global.Promise;

// App
const app = express();
app.use(cors({maxAge: 86400}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/accounts', account);
app.use('/profiles', profile);

const PORT = 8080;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
    console.log('Server is up and running on port numner ' + PORT);
});