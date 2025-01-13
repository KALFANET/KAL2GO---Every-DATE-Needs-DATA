const { Sequelize } = require('sequelize');
require('dotenv').config();

// יצירת חיבור למסד הנתונים
const sequelize = new Sequelize(
    process.env.DB_NAME, // שם מסד הנתונים
    process.env.DB_USER, // שם המשתמש
    process.env.DB_PASSWORD, // סיסמת המשתמש
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT, // דיאלקט
        port: process.env.DB_PORT,
        logging: false, // לבטל לוגים (אופציונלי)
        dialectOptions: {
            allowPublicKeyRetrieval: true, // אישור מפתח ציבורי
            connectTimeout: 20000, // זמן קצוב להתחברות
        },
        pool: {
            max: 5, // מספר חיבורים מקסימלי
            min: 0, // מספר חיבורים מינימלי
            idle: 10000, // זמן המתנה לחיבור פנוי
        },
    }
);

// בדיקת חיבור למסד הנתונים
(async () => {
    try {
        await sequelize.authenticate();
        console.log('החיבור למסד הנתונים בוצע בהצלחה!');
    } catch (error) {
        console.error('שגיאה בחיבור למסד הנתונים:', error.message);
    }
})();

module.exports = sequelize;