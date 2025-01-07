const express = require('express');
const User = require('../models/User');
const router = express.Router();

// יצירת משתמש חדש
router.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.create({ name, email });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// שליפת כל המשתמשים
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;