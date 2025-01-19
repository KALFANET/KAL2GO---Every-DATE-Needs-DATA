const express = require('express');
const User = require('../models/User');
const router = express.Router();

// שליפת כל המשתמשים
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users." });
    }
});

module.exports = router;