'use strict';
// Express
const express = require('express');
const authRouter = express.Router();
// Mw
const bearerAuth = require('../middleware/bearerAuth');
const basicAuth = require('../middleware/basicAuth');
const permission = require('../middleware/permissions');
//Routes
const { users } = require('../Models');

// Rount to handle User-sign-up
authRouter.post('/signup', async (req, res, next) => {
	try {
		let newUser = await users.create(req.body);
		const output = {
			user: newUser,
			token: newUser.token,
		};
		res.status(201).json(output);
	} catch (e) {
		res.send(e);
	}
});

// Route to Handle User-Sign-in
authRouter.post('/signin', basicAuth, (req, res, next) => {
	const user = {
		user: req.user,
		token: req.user.token,
	};
	res.status(200).json(user);
});

// Route to retrieve All-users
authRouter.get('/users', bearerAuth, async (req, res, next) => {
	console.log(req);
	try {
		const userQuery = await users.findAll({});
		res.status(200).send(userQuery);
	} catch (error) {
		throw new Error(error);
	}
});

// Route to handle user-Delete
authRouter.delete(
	'/users/delete/:id',
	bearerAuth,
	permission('delete'),
	async (req, res, next) => {
		try {
			const id = req.params.id;
			const userToDelete = await users.findOne({ Where: { id: id } });
			const deleteUser = await users.delete(userToDelete);
			const deleted = 'User Deleted';
			res.send('User Deleted');
		} catch (e) {
			res.send(e);
		}
	}
);

module.exports = authRouter;
