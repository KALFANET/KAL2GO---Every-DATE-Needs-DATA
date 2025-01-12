const { Sequelize } = require('sequelize');

// יצירת חיבור למסד הנתונים
const sequelize = new Sequelize(
    'kal2go_db', // שם מסד הנתונים
    'admin', // שם המשתמש
    '13579Net!!', // סיסמת המשתמש
    {
host: process.env.DB_HOST || "kal2go-db.c0lm4fgzdcad.us-east-1.rds.amazonaws.com",
        dialect: 'mariadb', // דיאלקט
        port: 3306, // פורט
        logging: false, // לבטל לוגים (אופציונלי)
        dialectOptions: {
            allowPublicKeyRetrieval: true, // אישור מפתח ציבורי
            connectTimeout: 100000, // זמן קצוב להתחברות
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

