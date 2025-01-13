require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/db');
const syncPackages = require('./src/services/syncPackages');
const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database.');

        await sequelize.sync({ alter: true });
        console.log('Database synchronized.');

        // סנכרון חבילות ראשוני
        await syncPackages();

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error.message);
    }
})();