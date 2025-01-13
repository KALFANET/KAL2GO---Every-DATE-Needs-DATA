const express = require('express');
const packageController = require('../controllers/packageController');
const router = express.Router();

router.get("/packages", packageController.getAllPackages);
router.post('/sync', packageController.syncPackages);

module.exports = router;