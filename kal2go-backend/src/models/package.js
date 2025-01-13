const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Package = sequelize.define('Package', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
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
        type: DataTypes.TEXT,  // שינוי ל-TEXT לתמיכה בתיאורים ארוכים
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),  // שינוי ל-DECIMAL לדיוק בנתונים כספיים
        allowNull: false,
        defaultValue: 0.00,
    },
    volume: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    durationUnit: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'DAYS',
    },
    locationNetworkList: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
    },
    speed: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
    }
}, {
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['packageCode']
        }
    ]
});

module.exports = Package;