const express = require("express");
const Package = require("../models/package");

const router = express.Router();

// שליפת כל החבילות
router.get("/", async (req, res) => {
  try {
    const packages = await Package.findAll();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch packages." });
  }
});

// שליפת פרטי חבילה לפי ID
router.get("/:id", async (req, res) => {
  try {
    const packageData = await Package.findOne({
      where: { packageCode: req.params.id },
    });

    if (!packageData) {
      return res.status(404).json({ error: "Package not found." });
    }

    res.status(200).json(packageData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch package details." });
  }
});

module.exports = router;