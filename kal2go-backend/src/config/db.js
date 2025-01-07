require('dotenv').config();
const { Sequelize } = require('sequelize');

// יצירת חיבור למסד הנתונים
const sequelize = new Sequelize(
    process.env.DB_NAME, // שם מסד הנתונים
    process.env.DB_USER, // שם המשתמש
    process.env.DB_PASSWORD, // סיסמת המשתמש
    {
        host: process.env.DB_HOST || 'localhost', // כתובת השרת
        dialect: 'mariadb', // דיאלקט
        port: process.env.DB_PORT || 3306, // פורט
        dialectOptions: {
            allowPublicKeyRetrieval: true, // הגדרה לעקיפת בעיות אישור ציבורי
        },
    }
);

module.exports = sequelize; // ייצוא החיבור