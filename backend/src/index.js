const { getDataFromCongress } = require('./api-congresso/congress-data');
const db = require('./db/index');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const routes = require('routes');
const app = express();
const server = require('http').Server(app);

//getDataFromCongress();

db.connect()
//mongoose.connection.close();

