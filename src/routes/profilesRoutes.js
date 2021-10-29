'use strict';
// Express
const express = require('express');
const profileRouter = express.Router();
// Mw
const bearerAuth = require('../middleware/bearerAuth');
const permission = require('../middleware/permissions');
// Routes
const { profiles } = require('../Models');
// const app = express();
// app.use(express.json());

// Routes to GET Profile based on User-Authorization
profileRouter.get('/profiles/all', bearerAuth, async (req, res, next) => {
	try {
		// let userId = req.params.id
		const findprofiles = await profiles.get();
		res.send(findprofiles);
	} catch (e) {
		res.send(e);
	}
});

profileRouter.get(
	'/profiles/all/:receiver',
	bearerAuth,
	async (req, res, next) => {
		try {
			let receiver = req.params;
			const findProfiles = await profiles.get(receiver);
			res.send(findProfiles);
		} catch (e) {
			res.send(e);
		}
	}
);

// Routes to CREATE Profile based on User-Authorization
profileRouter.post('/profiles', bearerAuth, async (req, res, next) => {
	let info = req.body;

	try {
		let Profile = await profiles.create({
			height: info.height,
			age: info.age,
			weight: info.weight,
			interests: info.interests,
		});
		res.json(Profile);
	} catch (e) {
		res.send(e);
	}
});

// Routes to Update Profile based on User-Authorization
profileRouter.put(
	'/profiles/update/:id',
	bearerAuth,
	permission('update'),
	async (req, res, next) => {
		try {
			const id = req.params;
			const newProfile = req.body;
			const updatedProfile = await profiles.update(id, newProfile);
			res.json(updatedProfile);
		} catch (e) {
			res.send(e);
		}
	}
);

// Routes to Delete Profile based on User-Authorization
profileRouter.delete(
	'/profiles/delete/:id',
	bearerAuth,
	permission('delete'),
	async (req, res, next) => {
		try {
			const id = req.params.id;
			const deletedProfiles = await profiles.delete(id);
			res.send(deletedProfiles);
		} catch (e) {
			res.send(e);
		}
	}
);

module.exports = profileRouter;
