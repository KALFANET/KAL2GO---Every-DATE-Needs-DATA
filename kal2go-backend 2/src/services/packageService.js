const axios = require('axios');
const db = require('../models');
const ESIM_ACCESS_URL = process.env.ESIM_ACCESS_URL;
const HEADERS_ESIM = {
    "RT-AccessCode": process.env.ESIM_ACCESS_CODE,
    "Content-Type": "application/json"
};

async function fetchEsimPackages() {
    try {
        const response = await axios.post(ESIM_ACCESS_URL, {}, { headers: HEADERS_ESIM });
        const packages = response.data?.obj?.packageList || [];
        console.log(`Fetched ${packages.length} packages from ESIM API.`);
        return packages;
    } catch (error) {
        console.error("Error fetching packages:", error);
        throw error;
    }
}

async function updatePackagesInDatabase() {
    try {
        const packages = await fetchEsimPackages();

        for (const pkg of packages) {
            const [packageRecord, created] = await db.Package.upsert({
                packageCode: pkg.packageCode,
                name: pkg.name,
                description: pkg.description || '',
                price: parseInt(pkg.price, 10),
            });

            console.log(created ? `Package created: ${pkg.name}` : `Package updated: ${pkg.name}`);
        }
    } catch (error) {
        console.error("Error updating packages in database:", error);
    }
}

module.exports = {
    fetchEsimPackages,
    updatePackagesInDatabase,
};