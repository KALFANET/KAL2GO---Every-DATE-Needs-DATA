const express = require('express');
const axios = require('axios');
const router = express.Router();
const { PaddleSDK } = require('../services/paymentService'); // נניח שהוספת שירות Paddle

const ESIM_API_URL = process.env.ESIM_API_URL;
const ESIM_ACCESS_CODE = process.env.ESIM_ACCESS_CODE;

/**
 * יצירת רכישה באמצעות Paddle
 * @param {string} productId - מזהה המוצר
 * @param {string} price - מחיר המוצר
 * @param {string} customerEmail - כתובת הדוא"ל של הלקוח
 */
router.post('/purchase', async (req, res) => {
    const { productId, price, customerEmail } = req.body;

    if (!productId || !price || !customerEmail) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // יצירת לינק תשלום ב-Paddle
        const checkoutResponse = await PaddleSDK.createCheckout({
            product_id: productId,
            price: price,
            customer_email: customerEmail,
        });

        if (checkoutResponse && checkoutResponse.checkout_url) {
            return res.status(200).json({ checkoutUrl: checkoutResponse.checkout_url });
        } else {
            throw new Error('Failed to create payment link.');
        }
    } catch (error) {
        console.error('Error creating purchase:', error.message);
        res.status(500).json({ error: 'Failed to process purchase' });
    }
});

/**
 * Fetch packages from eSIM API
 * @returns {Array} - Processed package data from the API
 */
const fetchPackagesFromEsim = async () => {
    try {
        const response = await axios.post(
            ESIM_API_URL,
            {
                locationCode: "",
                type: "",
                slug: "",
                packageCode: "",
                iccid: ""
            },
            {
                headers: {
                    "RT-AccessCode": ESIM_ACCESS_CODE,
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.data || !response.data.obj || !Array.isArray(response.data.obj.packageList)) {
            console.error('Invalid response from API or no packages found.');
            return [];
        }

        // Process and format the package data
        return response.data.obj.packageList.map(pkg => {
            const { meta, ...cleanPkg } = pkg; // Remove the `meta` property
            return {
                packageCode: cleanPkg.packageCode,
                name: cleanPkg.name,
                description: cleanPkg.description || "No description available",
                price: parseFloat(cleanPkg.price || 0).toFixed(2), // Format price to 2 decimals
                volume: BigInt(cleanPkg.volume || 0), // Ensure volume is a BigInt
                duration: parseInt(cleanPkg.duration || 0, 10), // Parse duration as an integer
                durationUnit: cleanPkg.durationUnit || 'DAYS', // Default to 'DAYS' if not provided
                speed: cleanPkg.speed || null,
                locationNetworkList: Array.isArray(cleanPkg.locationNetworkList)
                    ? cleanPkg.locationNetworkList
                    : [],
                status: 'active' // Default status for new packages
            };
        });
    } catch (error) {
        console.error('Error fetching packages from eSIM API:', error);
        throw error;
    }
};

/**
 * Save packages to the database
 * @param {Array} packages - Array of package data to be saved
 * @returns {Boolean} - Success status
 */
const savePackagesToDB = async (packages) => {
    const transaction = await Package.sequelize.transaction();
    try {
        for (const packageData of packages) {
            await Package.upsert(packageData, { transaction });
        }
        await transaction.commit();
        console.log(`Packages saved successfully to the database. Total: ${packages.length}`);
        return true;
    } catch (error) {
        await transaction.rollback();
        console.error('Error saving packages to DB:', error);
        throw error;
    }
};

module.exports = router;