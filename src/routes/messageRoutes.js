'use strict';
// Express
const express = require('express');
const messageRouter = express.Router();
// Mw
const bearerAuth = require('../middleware/bearerAuth');
const permission = require('../middleware/permissions');
// Router
const { messages } = require('../Models');
const app = express();
app.use(express.json());

// Route to GET all messages based on user Authorization
messageRouter.get('/messages/all', bearerAuth, async (req, res, next) => {
	try {
		const findMessages = await messages.get();
		res.send(findMessages);
	} catch (e) {
		res.send(e);
	}
});
messageRouter.get(
	'/messages/all/:receiver',
	bearerAuth,
	async (req, res, next) => {
		try {
			let receiver = req.params;
			const findMessages = await messages.get(receiver);
			res.send(findMessages);
		} catch (e) {
			res.send(e);
		}
	}
);

// Route to Create all messages based on user Authorization
messageRouter.post('/messages', bearerAuth, async (req, res, next) => {
	let info = req.body;

	try {
		console.log('This is our console log', info);
		let Message = await messages.create({
			sender: info.sender,
			receiver: info.receiver,
			body: info.body,
		});
		res.json(Message);
	} catch (e) {
		res.send(e);
	}
});

// Route to Update all messages based on user Authorization
messageRouter.put(
	'/messages/update/:id',
	bearerAuth,
	permission('update'),
	async (req, res, next) => {
		try {
			const id = req.params;
			const newMessage = req.body;
			const updatedMessage = await messages.update(id, newMessage);
			res.json(updatedMessage);
		} catch (e) {
			res.send(e);
		}
	}
);

// Route to Delete all messages based on user Authorization
messageRouter.delete(
	'/messages/delete/:id',
	bearerAuth,
	permission('delete'),
	async (req, res, next) => {
		try {
			const id = req.params.id;
			const deletedMessage = await messages.delete(id);
			res.send(deletedMessage);
		} catch (e) {
			res.send(e);
		}
	}
);

module.exports = messageRouter;
