const { fetchPackages } = require('../services/packageService');

const getPackages = async (req, res) => {
    try {
        const packages = await fetchPackages();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch packages' });
    }
};

module.exports = { getPackages };const packageService = require('../services/packageService');
const Package = require('../models/package');

async function getPackages(req, res) {
    try {
        const packages = await Package.findAll();
        res.status(200).json(packages);
    } catch (error) {
        console.error("Error fetching packages:", error);
        res.status(500).json({ error: "Failed to fetch packages." });
    }
}

async function syncPackages(req, res) {
    try {
        await packageService.updatePackagesInDatabase();
        res.status(200).json({ message: "Packages synchronized successfully." });
    } catch (error) {
        console.error("Error syncing packages:", error);
        res.status(500).json({ error: "Failed to synchronize packages." });
    }
}

module.exports = {
    getPackages,
    syncPackages,
};