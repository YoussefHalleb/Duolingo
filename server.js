import express from 'express';
import { readFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const port = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors());

app.get('/cultural-cards', async (req, res) => {
  console.log('Request received for:', req.path, 'with query:', req.query);
  try {
    const filePath = resolve(__dirname, 'src/data/cultural_cards.json');
    const data = await readFile(filePath, 'utf8');
    console.log('File content length:', data.length);
    const culturalCards = JSON.parse(data);

    const language = req.query.language;
    console.log('Filtering for language:', language);
    if (language) {
      const filteredCards = culturalCards.filter(card => card.language.toLowerCase() === language.toLowerCase());
      console.log('Filtered cards count:', filteredCards.length);
      res.json(filteredCards);
    } else {
      res.json(culturalCards);
    }
  } catch (error) {
    console.error('Error reading cultural_cards.json:', error);
    res.status(500).json({ error: 'Failed to load cultural cards' });
  }
});

// Endpoint pour rechercher par lessonId
app.get('/cultural-cards/by-lesson/:lessonId', async (req, res) => {
  console.log('Request received for by-lesson:', req.path, 'with lessonId:', req.params.lessonId);
  try {
    const filePath = resolve(__dirname, 'src/data/cultural_cards.json');
    const data = await readFile(filePath, 'utf8');
    const culturalCards = JSON.parse(data);

    const lessonId = req.params.lessonId;
    const relatedCard = culturalCards.find(card => card.related_lesson_id === lessonId);
    console.log('Related card found:', relatedCard);

    if (relatedCard) {
      res.json([relatedCard]); // Retourne un tableau avec la carte trouvée
    } else {
      res.status(404).json({ error: `No cultural card found for lessonId: ${lessonId}` });
    }
  } catch (error) {
    console.error('Error reading cultural_cards.json:', error);
    res.status(500).json({ error: 'Failed to load cultural cards' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});