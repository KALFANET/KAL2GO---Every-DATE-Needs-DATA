const axios = require('axios');
const Package = require('../models/package');

const ESIM_API_URL = process.env.ESIM_API_URL;
const ESIM_ACCESS_CODE = process.env.ESIM_ACCESS_CODE;

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

        if (!response.data?.obj?.packageList) {
            throw new Error('Invalid response structure from eSIM API');
        }

        // עיבוד והמרת הנתונים לפורמט הנכון
        return response.data.obj.packageList.map(pkg => {
            const { meta, ...cleanPkg } = pkg; // הסרת תכונת meta
            return {
                packageCode: cleanPkg.packageCode,
                name: cleanPkg.name,
                description: cleanPkg.description || "No description available",
                price: parseFloat(cleanPkg.price || 0).toFixed(2),
                volume: BigInt(cleanPkg.volume || 0),
                duration: parseInt(cleanPkg.duration || 0),
                durationUnit: cleanPkg.durationUnit || 'DAYS',
                speed: cleanPkg.speed || null,
                locationNetworkList: Array.isArray(cleanPkg.locationNetworkList) 
                    ? cleanPkg.locationNetworkList 
                    : [],
                status: 'active'
            };
        });
    } catch (error) {
        console.error('Error fetching packages from eSIM API:', error);
        throw error;
    }
};

const savePackagesToDB = async (packages) => {
    const transaction = await Package.sequelize.transaction();
    try {
        for (const packageData of packages) {
            await Package.upsert(packageData, { transaction });
        }
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        console.error('Error saving packages to DB:', error);
        throw error;
    }
};
