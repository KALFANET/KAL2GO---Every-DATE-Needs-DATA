const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // ייבוא חבילת cors
const userRoutes = require('./routes/userRoutes'); // נתיבי ה-API למשתמשים
const packageRoutes = require('./routes/packageRoutes'); // נתיבי ה-API לחבילות
const paymentRoutes = require('./routes/paymentRoutes'); // נתיבי ה-API לחבילות

const app = express();
// הגדרת // הגדרת CORS כדי לאפשר גישה מ-FrontendCORS כדי לאפשר גישה מ-Frontend
app.use(cors({
    origin: 'http://localhost:3001', // כתובת ה-Frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // סוגי הבקשות המותרות
    credentials: true // אם יש צורך בשליחה של Cookies
}));

app.get('/', (req, res) => {
    res.send('Welcome to the KAL2GO API!');
});

// נתיבים
app.use('/api/users', userRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/payments', paymentRoutes);
module.exports = app;