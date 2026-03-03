const express = require('express');
const { Storage } = require('@google-cloud/storage');

const router = express.Router();
const storage = new Storage();
const bucket = storage.bucket(process.env.BUCKET_NAME);

const GAMES_FILE = 'data/games.json';

// GET /api/games - Fetch current games.json
router.get('/', async (req, res) => {
  try {
    const file = bucket.file(GAMES_FILE);
    const [exists] = await file.exists();

    if (!exists) {
      return res.json({ games: [] });
    }

    const [contents] = await file.download();
    res.json(JSON.parse(contents.toString()));
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games data' });
  }
});

// POST /api/games/upload-url - Get a signed URL for uploading
router.post('/upload-url', async (req, res) => {
  try {
    const file = bucket.file(GAMES_FILE);

    const [signedUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: 'application/json',
    });

    res.json({
      uploadUrl: signedUrl,
      expiresIn: '15 minutes',
      file: GAMES_FILE,
    });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
});

module.exports = router;
