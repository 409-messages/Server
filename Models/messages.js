'use strict';


const Messages = (sequelize, DataTypes) => {
  const messagesLog = sequelize.define('messages', {
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reciever: {
      type: DataTypesTypes.STRING,
      allowNull: false
    },
  })
}

module.exports = Messages;