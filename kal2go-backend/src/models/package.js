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
        validate: {
            notEmpty: true, // ולידציה לשדה שאינו ריק
        },
    },
    description: {
        type: DataTypes.TEXT,  // TEXT לתמיכה בתיאורים ארוכים
        allowNull: true,
        defaultValue: 'No description available', // ברירת מחדל
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),  // דיוק לנתונים כספיים
        allowNull: false,
        defaultValue: 0.00,
        validate: {
            min: 0, // מחיר חייב להיות חיובי
        },
    },
    volume: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0, // ולידציה - לא יכול להיות שלילי
        },
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0, // ולידציה - לא יכול להיות שלילי
        },
    },
    durationUnit: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'DAYS',
        validate: {
            isIn: [['DAYS', 'HOURS', 'MINUTES']], // הגבלת ערכים אפשריים
        },
    },
    locationNetworkList: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
    },
    speed: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Unknown', // ברירת מחדל
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
    }
}, {
    timestamps: true, // יצירת שדות createdAt ו-updatedAt
    indexes: [
        {
            unique: true,
            fields: ['packageCode'],
        },
        {
            fields: ['status'], // אינדקס על status
        },
        {
            fields: ['name'], // אינדקס על name לחיפושים
        },
    ],
});

module.exports = Package;