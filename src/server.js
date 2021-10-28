'use strict';

const express = require('express');
const cors = require('cors');


//Bring in Mw
const logger = require('./middleware/logger');

// Brings in Error-Handler
const err404 = require('./error-handler/404');
const err500 = require('./error-handler/500');

// Bring in Route Handlers
const crudRoutes = require('./routes/crudRoutes');
const userRoutes = require('./routes/userRoutes');

// Use Express
const app = express();

// App level Mw
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mw-calls
app.use(logger);

// Route-calls
app.use('/api/secure', crudRoutes);
app.use(userRoutes);

// Error-calls
app.use(err404);
app.use(err500);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log(`server spinning on ${port}`));
  },
};
