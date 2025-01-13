const axios = require('axios');
const Package = require('../models/package');

const ESIM_ACCESS_URL = "https://api.esimaccess.com/api/v1/open/package/list";
const ESIM_ACCESS_CODE = process.env.ESIM_ACCESS_CODE;

const HEADERS_ESIM = {
    "RT-AccessCode": ESIM_ACCESS_CODE,
    "Content-Type": "application/json"
};

// משיכת חבילות מ-eSIM Access API
const fetchEsimPackages = async () => {
    const payload = {
        locationCode: "",
        type: "",
        slug: "",
        packageCode: "",
        iccid: ""
    };

    try {
        const response = await axios.post(ESIM_ACCESS_URL, payload, { headers: HEADERS_ESIM });

        if (response.data && response.data.obj && response.data.obj.packageList) {
            return response.data.obj.packageList;
        }

        return [];
    } catch (error) {
        console.error("Error fetching packages from eSIM Access API:", error.message);
        return [];
    }
};

// שמירת החבילות ב-DB
const savePackagesToDB = async (packages) => {
    for (const packageData of packages) {
        await Package.upsert({
            packageCode: packageData.packageCode,
            name: packageData.name,
            description: packageData.description || "No description available",
            price: parseFloat(packageData.price) || 0.0,
        });
    }
};

// פונקציית סנכרון
const syncPackages = async () => {
    const packages = await fetchEsimPackages();
    if (packages.length > 0) {
        await savePackagesToDB(packages);
        console.log("Packages synchronized successfully.");
    } else {
        console.log("No packages found to synchronize.");
    }
};

module.exports = syncPackages;