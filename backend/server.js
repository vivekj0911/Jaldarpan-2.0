const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// File paths
const alertFilePath = path.join(__dirname, 'alert.json');

// Utility functions
async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return { alert: false }; // Default alert status if file doesn't exist
    }
    throw err;
  }
}

async function writeFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Alert Endpoint (POST)
app.post('/api/alert', async (req, res) => {
  try {
    const { alert, telemetryUID, district, tahsil, village, latitude, longitude } = req.body;

    if (typeof alert !== 'boolean' || !latitude || !longitude) {
      return res.status(400).json({ message: 'Invalid data. Ensure all fields are provided.' });
    }

    const alertData = {
      alert,
      telemetryUID,
      district,
      tahsil,
      village,
      latitude,
      longitude,
    };

    await writeFile(alertFilePath, alertData);
    res.status(200).json({ message: 'Alert status updated successfully.' });
  } catch (error) {
    console.error('Error updating alert status:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Alert Endpoint (GET)
app.get('/api/alert', async (req, res) => {
  try {
    const alertData = await readFile(alertFilePath);
    res.status(200).json(alertData);
  } catch (error) {
    console.error('Error fetching alert status:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
