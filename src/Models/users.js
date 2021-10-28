'use strict';

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'secretstringfortesting';
const bcrypt = require('bcrypt');


const Users = (sequelize, DataTypes) => {
  const usersTable = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
      allowNull: false,
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete'],
        }
        return acl[this.role];
      }
    },

  });

  usersTable.beforeCreate(async (user) => {
    let encryptPass = await bcrypt.hash(user.password, 10);
    user.password = encryptPass;
  });

  usersTable.authBasic = async function(username, password) {
    let user = await this.findOne({ where: { username}});

    let isValidPassword = await bcrypt.compare(password, user.password);
    if(isValidPassword) {
      return user;
    } else {
      throw new Error('Not Authenticated');
    }
  }
  return usersTable;
}

module.exports = Users;