const { fetchPackagesFromEsim } = require("../services/packageService");

const getPackages = async (req, res) => {
    try {
        const packages = await fetchPackagesFromEsim();
        res.status(200).json(packages);
    } catch (error) {
        console.error("Error fetching packages:", error);
        res.status(500).json({ error: "Failed to fetch packages." });
    }
};

module.exports = { getPackages };