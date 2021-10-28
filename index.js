'use strict';

require('dotenv').config;
const app = require('./src/server');
const { db } = require('./src/Models');

const PORT = process.env.PORT || 3000;

db.sync().then(() => app.start(PORT));
