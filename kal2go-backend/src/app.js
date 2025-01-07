const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // נתיבי ה-API למשתמשים
const app = express();

// Middleware
app.use(bodyParser.json());

// בסיסי - נתיב ראשי
app.get('/', (req, res) => {
    res.send('Welcome to the KAL2GO API!');
});

// נתיבי API
app.use('/api', userRoutes);

module.exports = app;