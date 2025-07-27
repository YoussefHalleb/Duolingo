//endpoint API cultural-cards
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fs = require('fs').promises;
const path = require('path');

admin.initializeApp();

exports.getCulturalCards = functions.https.onRequest(async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../src/data/cultural_cards.json');
    const data = await fs.readFile(filePath, 'utf8');
    const culturalCards = JSON.parse(data);
    res.json(culturalCards);
  } catch (error) {
    console.error('Error reading cultural_cards.json:', error);
    res.status(500).json({ error: 'Failed to load cultural cards' });
  }
});