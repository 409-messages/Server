'use strict';
module.exports = (sequelize, DataTypes) => {
	const Profile = sequelize.define('Profile', {
		height: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		weight: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		age: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		interests: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	return Profile;
};
