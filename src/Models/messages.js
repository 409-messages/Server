'use strict';

module.exports = (sequelize, DataTypes) => {
	const Messages = sequelize.define('Messages', {
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

	Messages.associate = (models) => {
		Messages.belongsTo(models.User, {
			foreignKey: {
				allowNull: false,
			},
		});
	};
	return Messages;
};
