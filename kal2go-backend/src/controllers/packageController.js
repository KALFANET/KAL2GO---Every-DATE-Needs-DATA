const { fetchPackages } = require('../services/packageService');

const getPackages = async (req, res) => {
    try {
        const packages = await fetchPackages();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch packages' });
    }
};

module.exports = { getPackages };