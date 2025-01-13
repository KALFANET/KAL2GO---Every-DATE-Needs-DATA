const axios = require('axios');
require('dotenv').config();

const API_URL = 'https://api.esimaccess.com/v1/plans';

const fetchEsimPlans = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'AccessCode': process.env.ACCESS_CODE,
                'SecretKey': process.env.SECRET_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching eSIM Plans:', error.response?.data || error.message);
        throw error;
    }
};

module.exports = { fetchEsimPlans };