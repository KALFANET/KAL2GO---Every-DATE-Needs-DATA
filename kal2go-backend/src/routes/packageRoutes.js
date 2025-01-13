const express = require('express');
const Package = require('../models/package');
const router = express.Router();

// שליפת כל החבילות
router.get('/', async (req, res) => {
    try {
        const packages = await Package.findAll();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch packages." });
    }
});

module.exports = router;