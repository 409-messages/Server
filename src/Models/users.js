'use strict';

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'secretstringfortesting';
const bcrypt = require('bcrypt');

const Users = (sequelize, DataTypes) => {
	const usersTable = sequelize.define('Users', {
		username: {
			type: DataTypes.STRING,
			required: true,
		},
		password: {
			type: DataTypes.STRING,
			required: true,
		},
		role: {
			type: DataTypes.ENUM('guest', 'user', 'admin'),
			defaultValue: 'guest',
			required: true,
		},
		token: {
			type: DataTypes.VIRTUAL,
			get() {
				return jwt.sign(
					{
						username: this.username,
					},
					SECRET
				);
			},
			set(tokenObj) {
				let token = jwt.sign(tokenObj, SECRET);
				return token;
			},
		},
		capabilities: {
			type: DataTypes.VIRTUAL,
			get() {
				const acl = {
					guest: ['read'],
					user: ['read', 'create', 'update'],
					admin: ['read', 'create', 'update', 'delete'],
				};
				return acl[this.role];
			},
		},
	});

	usersTable.beforeCreate(async (user) => {
		let encryptPassword = await bcrypt.hash(user.password, 10);
		user.password = encryptPassword;
	});

	usersTable.authenticateBasic = async function (username, password) {
		let parsedUser = await this.findOne({ where: { username } });
		let isValidPassword = await bcrypt.compare(password, parsedUser.password);
		if (isValidPassword) {
			return parsedUser;
		}
		throw new Error('Not Authenticated');
	};

	usersTable.authenticateToken = async function (token) {
		try {
			const parsedToken = jwt.verify(token, SECRET);
			const user = await this.findOne({
				where: { username: parsedToken.username },
			});
			if (user) {
				return user;
			}
			throw new Error('User Not Found');
		} catch (e) {
			throw new Error(e.message);
		}
	};
	return usersTable;
};

module.exports = Users;
