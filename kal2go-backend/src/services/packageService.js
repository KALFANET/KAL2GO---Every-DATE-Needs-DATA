const axios = require('axios');
const db = require('../config/db');
require('dotenv').config();

const ESIM_ACCESS_URL = "https://api.esimaccess.com/api/v1/open/package/list";
const ESIM_ACCESS_CODE = process.env.ESIM_ACCESS_CODE;

const HEADERS_ESIM = {
    "RT-AccessCode": ESIM_ACCESS_CODE,
    "Content-Type": "application/json"
};

// משיכת חבילות
const fetchEsimPackages = async () => {
    try {
        const response = await axios.post(ESIM_ACCESS_URL, {}, { headers: HEADERS_ESIM });
        const packages = response.data?.obj?.packageList || [];
        console.log(`Fetched ${packages.length} packages from eSIM API.`);
        return packages;
    } catch (error) {
        console.error("Error fetching eSIM packages:", error.message);
        return [];
    }
};

// עדכון החבילות ב-DB
const updatePackagesInDatabase = async (packages) => {
    for (const package of packages) {
        const existingPackage = await db.Package.findOne({ where: { packageCode: package.packageCode } });

        if (existingPackage) {
            await existingPackage.update({
                name: package.name,
                description: package.description,
                price: package.price
            });
            console.log(`Updated package: ${package.packageCode}`);
        } else {
            await db.Package.create({
                packageCode: package.packageCode,
                name: package.name,
                description: package.description,
                price: package.price
            });
            console.log(`Added new package: ${package.packageCode}`);
        }
    }
};

module.exports = { fetchEsimPackages, updatePackagesInDatabase };