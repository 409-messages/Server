'use strict';

const express = require('express');
const authRouter = express.Router();
const Users = require('../Models/users');

const basicAuth = require('../middleware/basicAuth');




authRouter.post('/signup', async (req, res, next) => {
  try {
    let newUser = await Users.create(req.body);
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


module.exports = authRouter;