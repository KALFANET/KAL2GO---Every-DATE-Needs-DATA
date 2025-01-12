require('dotenv').config();
const { Sequelize } = require('sequelize');

// יצירת חיבור למסד הנתונים
const sequelize = new Sequelize(
    process.env.DB_NAME, // שם מסד הנתונים
    process.env.DB_USER, // שם המשתמש
    process.env.DB_PASSWORD, // סיסמת המשתמש
    {
        host: process.env.DB_HOST,
        dialect: 'mariadb', // דיאלקט
        port: process.env.DB_PORT || 3306, // פורט
        dialectOptions: {
            allowPublicKeyRetrieval: true, // הגדרה לעקיפת בעיות אישור ציבורי
        },
        pool: {
            acquire: 30000, // הגדלת משך הזמן של ה-timeout
        },
    }
);
// פונקציה לבדיקה האם החיבור תקין
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


module.exports = sequelize; // ייצוא החיבור