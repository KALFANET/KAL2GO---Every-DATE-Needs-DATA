require('dotenv').config(); // טעינת משתני סביבה
const express = require('express');
const cors = require('cors');
const app = require('./src/app'); // אפליקציה של Express
const sequelize = require('./src/config/db'); // חיבור למסד הנתונים
const PORT = process.env.PORT || 3000; // הפורט של השרת

// הגדרות CORS
app.use(cors({
    origin: 'http://localhost:3001', // ה-Frontend רץ על פורט 3001
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

(async () => {
    try {
        // בדיקת החיבור למסד הנתונים
        await sequelize.authenticate();
        console.log('Connected to the database successfully.');

        // סנכרון הטבלאות
        await sequelize.sync({ alter: true });
        console.log('Database synchronized.');

        // הפעלת השרת
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
})();