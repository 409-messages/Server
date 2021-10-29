'use strict';

module.exports = (sequelize, DataTypes) => {
	const Messages = sequelize.define('Messages', {
		sender: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		receiver: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		body: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});

	return Messages;
};
