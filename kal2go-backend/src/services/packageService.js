const Package = require('../models/package');

const fetchPackages = async () => {
    try {
        return await Package.findAll();
    } catch (error) {
        console.error('Error fetching packages:', error);
        throw error;
    }
};

module.exports = { fetchPackages };