'use strict';

const base64 = require('base-64');
const { users } = require('../models');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return authError();
  }
  let basic = req.headers.authorization.split(' ').pop();
  let decoded = base64.decode(basic);
  let [username, password] = decoded.split(':');
  try {
    req.user = await users.authenticateBasic(username, password);
    next();
  } catch (e) {
    authError();
  }

  function authError() {
    res.status(403).send('Invalid Login');
  }
};
