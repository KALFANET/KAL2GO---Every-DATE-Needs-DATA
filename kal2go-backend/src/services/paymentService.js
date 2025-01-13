const axios = require('axios');
require('dotenv').config();

const PADDLE_API_URL = "https://sandbox-vendors.paddle.com/api/2.0"; 
const PADDLE_API_KEY = process.env.PADDLE_API_KEY; 
const VENDOR_ID = process.env.PADDLE_VENDOR_ID; 
const VENDOR_AUTH_CODE = process.env.PADDLE_VENDOR_AUTH_CODE; 

const HEADERS_PADDLE = {
    "Content-Type": "application/json"
};

const createPayment = async (customerEmail, packageCode, price) => {
    const payload = {
        vendor_id: VENDOR_ID,
        vendor_auth_code: VENDOR_AUTH_CODE,
        title: `Purchase for Package ${packageCode}`,
        customer_email: customerEmail,
        prices: [`USD:${price}`],
        quantity: 1,
        return_url: "http://localhost:${PORT}/success",
        webhook_url: "http://localhost:${PORT}/webhook"
    };

    try {
        const response = await axios.post(`${PADDLE_API_URL}/checkout/generate`, payload, { headers: HEADERS_PADDLE });
        if (response.data && response.data.success) {
            return response.data.response.url;
        } else {
            console.error("Failed to create payment:", response.data.error);
            return null;
        }
    } catch (error) {
        console.error("Error creating payment:", error.message);
        return null;
    }
};

module.exports = { createPayment };