const { DataTypes } = require('sequelize');
const sequelize = require('./config/db'); // הנתיב משתנה לפי מיקום הקובץ
const Package = sequelize.define('Package', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'packages',
    timestamps: false,
});

module.exports = Package;