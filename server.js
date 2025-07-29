import express from 'express';
import { readFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = 3001;

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

app.get('/cultural-cards', async (req, res) => {
  console.log('Request received for:', req.path, 'with query:', req.query);
  try {
    const filePath = resolve(__dirname, './src/data/cultural_cards.json');
    console.log('File path:', filePath);
    const data = await readFile(filePath, 'utf8');
    console.log('File content length:', data.length);
    const culturalCards = JSON.parse(data);

    const language = req.query.language;
    console.log('Filtering for language:', language);
    if (language) {
      const filteredCards = culturalCards.filter(card => card.language === language);
      res.json(filteredCards);
    } else {
      res.json(culturalCards);
    }
  } catch (error) {
    console.error('Error reading cultural_cards.json:', error);
    res.status(500).json({ error: 'Failed to load cultural cards' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});