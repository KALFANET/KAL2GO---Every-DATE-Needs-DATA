const express = require('express');
const syncPackages = require('../services/syncPackages');
const router = express.Router();

router.post('/sync-packages', async (req, res) => {
    try {
        await syncPackages();
        res.status(200).json({ message: "Packages synchronized successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to synchronize packages." });
    }
});

module.exports = router;