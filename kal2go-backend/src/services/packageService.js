const axios = require('axios');
const db = require('../config/db');

require('dotenv').config();

const ESIM_ACCESS_URL = "https://api.esimaccess.com/api/v1/open/package/list";
const ESIM_ACCESS_CODE = process.env.ESIM_ACCESS_CODE;

const HEADERS_ESIM = {
    "RT-AccessCode": ESIM_ACCESS_CODE,
    "Content-Type": "application/json",
};

// Fetch packages from eSIM API
const fetchEsimPackages = async () => {
    try {
        const response = await axios.post(ESIM_ACCESS_URL, {}, { headers: HEADERS_ESIM });
        const packages = response.data?.obj?.packageList || [];
        console.log(`Fetched ${packages.length} packages from eSIM API.`);
        return packages;
    } catch (error) {
        console.error('Error fetching eSIM packages:', error.message);
        return [];
    }
};

// Save packages to the database
const savePackagesToDB = async (packages) => {
    for (const packageData of packages) {
        await db.Package.upsert({
            packageCode: packageData.packageCode,
            name: packageData.name,
            description: packageData.description || 'No description available',
            price: parseFloat(packageData.price) || 0.0,
        });
    }
};

module.exports = { fetchEsimPackages, savePackagesToDB };