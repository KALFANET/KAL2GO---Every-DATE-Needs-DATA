const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const packageRoutes = require('./routes/packageRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the KAL2GO API!');
});

// נתיבים
app.use('/api/users', userRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api', packageRoutes);
module.exports = app;