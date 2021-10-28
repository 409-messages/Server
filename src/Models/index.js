'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users');
const messagesModel = require('./messages');
const Collection = require('./collections.js');

const DATABASE_URL = 'sqlite::memory' || process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);
const messages = messagesModel(sequelize, DataTypes);

module.exports = {
    db: sequelize,
    messages: new Collection(messages),
    users: userModel(sequelize, DataTypes),
}