'use strict';

const Messages = (sequelize, DataTypes) =>
	sequelize.define('Messages', {
		sender: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		reciever: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		body: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	});

module.exports = Messages;
