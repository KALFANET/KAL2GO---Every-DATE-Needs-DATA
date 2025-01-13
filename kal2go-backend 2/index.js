require('dotenv').config(); // טעינת משתנים מקובץ .env
const app = require('./src/app'); // ייבוא אפליקציית Express
const sequelize = require('./src/config/db'); // ייבוא חיבור למסד הנתונים
const PORT = process.env.PORT || 3000; // הגדרת הפורט להפעלת השרת

(async () => {
    try {
        // בדיקת החיבור למסד הנתונים
        await sequelize.authenticate();
        console.log('Connected to the database successfully.');

        // סנכרון הטבלאות במסד הנתונים
        await sequelize.sync({ alter: true });
        console.log('Database synchronized.');

        // הפעלת השרת
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // יציאה מהתהליך אם יש שגיאה קריטית
    }
})();