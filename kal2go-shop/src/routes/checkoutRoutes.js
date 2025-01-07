const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
    const { cart, totalPrice } = req.body;

    try {
        const paymentResponse = await axios.post("https://sandbox-api.paddle.com/payments", {
            amount: totalPrice,
            currency: "USD",
            items: cart.map((item) => ({
                name: item.name,
                price: item.price,
                quantity: 1,
            })),
        });

        res.status(200).json(paymentResponse.data);
    } catch (error) {
        res.status(500).json({ message: "Payment failed", error: error.message });
    }
});

module.exports = router;