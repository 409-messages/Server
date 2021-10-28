const dontenv = require('dotenv');
const { app, start } = require('./src/server');
const { db } = require('./src/Models');

const PORT = process.env.PORT || 3000;

db.sync().then(() => start(PORT));
