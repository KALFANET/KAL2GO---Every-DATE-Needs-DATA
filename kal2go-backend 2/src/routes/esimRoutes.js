const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

// Endpoint to trigger eSIM-Paddle sync
router.post('/sync', async (req, res) => {
    try {
        exec('python3 services/esim_paddle_sync.py', (error, stdout, stderr) => {
            if (error) {
                console.error(`Execution error: ${error.message}`);
                return res.status(500).json({ error: 'Sync failed' });
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            res.status(200).json({ message: 'Sync completed successfully', output: stdout });
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while syncing.' });
    }
});

module.exports = router;