'use strict';

const express = require('express');
const { json } = require('sequelize/types');
const messageRouter = express.Router();
const bearerAuth = require('../middleware/bearerAuth');
const Messages = require('../Models/messages');
const app = express();
app.use(express.json());



messageRouter.get('/messages/:name', bearerAuth, permission, async (req, res, next) => {
  try {
    const recieverName = req.params.name;
    const privateMessages = await Messages.findOne({where: {reciever: recieverName}});
    const allMessages = await Messages.findOne({where: {reciever: 'all'}});
    res.status(200).send(`Private messages: ${privateMessages}, Public messages: ${allMessages}`);
  } catch(e) {
    res.send(e);
  }
});

messageRouter.post('/messages', bearerAuth, permission, async (req, res, next) => {
  try {
    const info = req.body;
    const message = await Messages.create({
      sender: info.sender,
      reciever: info.reciever,
      body: info.body
    });
    res.send(message);
  } catch(e){
    res.send(e);
  }
});

messageRouter.delete('/messages/:id', bearerAuth, permission, async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedMessage = await Messages.destroy({
      where: {id: id}
    });
    res.send(deletedMessage);
    
  } catch(e){
    res.send(e);
  }
});

