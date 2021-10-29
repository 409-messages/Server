'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users');
const messagesModel = require('./messages');
const profileModel = require('./profile');

const Collection = require('./collections.js');

// -------------------------------- Used for Horoku Comment back when re-deploying -------------------------------------------------//

// const DATABASE_URL =
// 	process.env.NODE_ENV === 'test'
// 		? 'sqlite::memory:'
// 		: process.env.DATABASE_URL;

// const DATABASE_CONFIG =
// 	process.env.NODE_ENV === 'production'
// 		? {
// 				dialectOptions: {
// 					ssl:{require: true,
// 					rejectUnauthorized: false},
// 				},
// 		  }
// 		: {};

// const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

// -------------------------------- Used for Horoku Comment back when re-deploying -------------------------------------------------//

// -------------------------------- USed for LocalHost -> Delete When running Horoku-------------------------------------------------//
const DATABASE_URL = 'sqlite::memory' || process.env.DATABASE_URL;
const sequelize = new Sequelize(DATABASE_URL);
// -------------------------------- USed for LocalHost -> Delete When running Horoku-------------------------------------------------//

// SQL Database Instantiations:
const users = userModel(sequelize, DataTypes);
const messages = messagesModel(sequelize, DataTypes);
const profile = profileModel(sequelize, DataTypes);

// ASSOCIATIONS
messages.hasMany(users);
users.belongsTo(messages);

profile.hasOne(users);
users.belongsTo(profile);

module.exports = {
	db: sequelize,
	users,
	messages: new Collection(messages),
	profile,
};
