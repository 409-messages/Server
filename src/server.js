'use strict';

const express = require('express');
const cors = require('cors');

//Bring in Mw
const logger = require('./middleware/logger');

// Brings in Error-Handler
const err404 = require('./error-handler/404');
const err500 = require('./error-handler/500');

// Bring in Route Handlers
const messagesRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profilesRoutes');

// Use Express
const app = express();

// App level Mw
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mw-calls
app.use(logger);

// Route-calls
app.use(userRoutes);
app.use('/api/secure', messagesRoutes);
app.use('/api/secure', profileRoutes);

// Error-calls
app.use(err404);
app.use(err500);

module.exports = {
	app,
	start: (port) => {
		app.listen(port, () => console.log(`server spinning on ${port}`));
	},
};
