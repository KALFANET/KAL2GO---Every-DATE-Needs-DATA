require('dotenv').config();
const express = require('express');
const app = require('./src/app');
const sequelize = require('./src/config/db');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database successfully.');

        console.log('Starting database synchronization...');
        await sequelize.sync({ alter: true });
        console.log('Database synchronized.');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
})();