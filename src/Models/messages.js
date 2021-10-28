'use strict';


const Messages = (sequelize, DataTypes) => {
  const messagesLog = sequelize.define('messages', {
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reciever: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })
}

module.exports = Messages;