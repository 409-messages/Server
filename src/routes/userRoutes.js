'use strict';

const express = require('express');
const authRouter = express.Router();
const { users } = require('../Models');
const bearerAuth = require('../middleware/bearerAuth');
const basicAuth = require('../middleware/basicAuth');




authRouter.post('/signup', async (req, res, next) => {
  try {
    let newUser = await users.create(req.body);
    const output = {
      user: newUser,
      token: newUser.token,
    };
    res.status(201).json(output);
  } catch(e) {
    res.send(e);
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});


authRouter.get('/users', bearerAuth, async (req, res, next) => {
  const userQuery = await users.findAll({});
  const list = userQuery.map( user => user.username)
  res.status(200).send(list);
})

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('You are now through the Looking Glass');
})


module.exports = authRouter;