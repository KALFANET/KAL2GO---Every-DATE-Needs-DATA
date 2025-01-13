const { fetchEsimPlans } = require('../services/esimService');

const getEsimPlans = async (req, res) => {
    try {
        const plans = await fetchEsimPlans();
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch eSIM plans' });
    }
};

module.exports = { getEsimPlans };