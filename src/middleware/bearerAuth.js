'use strict';

const { users } = require('../Models');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return authError();
    }
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);

    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    authError();
  }

  function authError() {
    res.status(403).send('Invalid Login');
  }
};
