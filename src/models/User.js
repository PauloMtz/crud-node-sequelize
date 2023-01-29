const { DataTypes } = require('sequelize')

const db = require('../config/connect')

const User = db.define('user', { // create table in database named users
  name: {
    type: DataTypes.STRING,
    allowNull: false, // don't allow null
  },
  occupation: {
    type: DataTypes.STRING,
    required: true // don't allow null nor empty
  },
  newsletter: {
    type: DataTypes.BOOLEAN,
  },
})

module.exports = User
