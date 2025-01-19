const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const packageRoutes = require('./routes/packageRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express(); // Changed to express()

// Middleware
app.use(cors({
    origin: 'http://localhost:3001', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // For cookies
}));
app.use(express.json());

// Commenting out routes one by one:
// Uncomment the routes one by one and test:
app.use('/api/users', userRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/payments', paymentRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the KAL2GO API!');
});

module.exports = app;