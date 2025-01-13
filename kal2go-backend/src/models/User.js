const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('kal2data-db', 'admin', '13579Net!!', {
  host: 'kal2data-db.c0lm4fgzdcad.us-east-1.rds.amazonaws.com',
  dialect: 'mariadb' // or 'postgres', 'sqlite', 'mariadb', 'mssql'
});

const User = sequelize.define('User', {
  // Define your model attributes here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
  // Add other attributes as needed
});

module.exports = User;