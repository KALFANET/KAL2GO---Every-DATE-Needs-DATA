const express = require('express');
const { createPayment } = require('../services/paymentService');
const db = require('../config/db');

const router = express.Router();

router.post('/purchase', async (req, res) => {
    const { email, packageCode } = req.body;

    try {
        const package = await db.Package.findOne({ where: { packageCode } });
        if (!package) return res.status(404).json({ error: "Package not found" });

        const checkoutUrl = await createPayment(email, packageCode, package.price);
        if (checkoutUrl) res.status(200).json({ checkoutUrl });
        else res.status(500).json({ error: "Payment creation failed" });
    } catch (error) {
        res.status(500).json({ error: "Error processing purchase." });
    }
});

module.exports = router;