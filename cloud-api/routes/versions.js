const express = require('express');
const { Storage } = require('@google-cloud/storage');

const router = express.Router();
const storage = new Storage();
const bucket = storage.bucket(process.env.BUCKET_NAME);

const GAMES_FILE = 'data/games.json';

// GET /api/versions - List all versions of games.json
router.get('/', async (req, res) => {
  try {
    const [files] = await bucket.getFiles({
      prefix: GAMES_FILE,
      versions: true,
    });

    // Sort by generation (newest first)
    files.sort((a, b) => Number(b.metadata.generation) - Number(a.metadata.generation));

    // Find the highest generation to mark as latest
    const latestGeneration = files.length > 0 ? files[0].metadata.generation : null;

    const versions = files.map((file) => ({
      name: file.name,
      generation: file.metadata.generation,
      size: file.metadata.size,
      updated: file.metadata.updated,
      isLatest: file.metadata.generation === latestGeneration,
    }));

    res.json({ versions, total: versions.length });
  } catch (error) {
    console.error('Error listing versions:', error);
    res.status(500).json({ error: 'Failed to list versions' });
  }
});

// GET /api/versions/:generation - Restore a specific version
router.get('/:generation', async (req, res) => {
  try {
    const { generation } = req.params;
    const file = bucket.file(GAMES_FILE, { generation: Number(generation) });

    const [exists] = await file.exists();
    if (!exists) {
      return res.status(404).json({ error: 'Version not found' });
    }

    const [contents] = await file.download();
    res.json(JSON.parse(contents.toString()));
  } catch (error) {
    console.error('Error fetching version:', error);
    res.status(500).json({ error: 'Failed to fetch version' });
  }
});

module.exports = router;
