const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Package = sequelize.define('Package', {
    packageCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true, // Add createdAt and updatedAt fields
});

module.exports = Package;