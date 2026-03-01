require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const { Storage } = require('@google-cloud/storage');
const admin = require('firebase-admin');

const app = express();
const storage = new Storage();

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

// ═══════════════════════════════════════════════════════════════════
// 📍 CORS CONFIGURATION - Must include all domains that call this Cloud API
// These are read from environment variables
// ═══════════════════════════════════════════════════════════════════
app.use(cors({
  origin: [
    'http://localhost:5173',                         // Local development
    `https://${process.env.PERSONAL_DOMAIN}`,        // plusy.nomoreboringtimes.com
    `https://${process.env.CLIENT_DOMAIN}`,          // cloud.taikentokyo.com
    'https://www.taikentokyo.com',                   // Client's Wix site
  ],
}));
app.use(express.json());

// Auth middleware (see middleware/auth.js)
const { verifyToken } = require('./middleware/auth');

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Protected routes
app.use('/api', verifyToken);
app.use('/api/games', require('./routes/games'));
app.use('/api/versions', require('./routes/versions'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Cloud API server running on port ${PORT}`);
});
