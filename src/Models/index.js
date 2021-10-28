'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users');
const messagesModel = require('./messages');
const Collection = require('./collections.js');

// const DATABASE_URL = 'sqlite::memory' || process.env.DATABASE_URL;

const DATABASE_URL =
	process.env.NODE_ENV === 'test'
		? 'sqlite::memory:'
		: process.env.DATABASE_URL;

const DATABASE_CONFIG =
	process.env.NODE_ENV === 'production'
		? {
				dialectOptions: {
					ssl: true,
					rejectUnauthorized: false,
				},
		  }
		: {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
const messages = messagesModel(sequelize, DataTypes);

module.exports = {
	db: sequelize,
	messages: new Collection(messages),
	users: userModel(sequelize, DataTypes),
};
