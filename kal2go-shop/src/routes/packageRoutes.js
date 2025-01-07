const express = require("express");
const router = express.Router();

const packages = [
    { id: 1, name: "Basic Package", description: "1GB data for 7 days", price: 10 },
    { id: 2, name: "Standard Package", description: "5GB data for 15 days", price: 25 },
    { id: 3, name: "Premium Package", description: "10GB data for 30 days", price:

30 },
];

router.get("/", (req, res) => {
    res.json(packages);
});

module.exports = router;