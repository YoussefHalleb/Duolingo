import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { rtdb } from '../../config/firebase';

export const usePronunciationData = (language) => {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDifficulty, setCurrentDifficulty] = useState('all');

  useEffect(() => {
    const fetchPronunciationData = async () => {
      try {
        const pronunciationRef = ref(rtdb, `pronunciation/${language}`);
        const snapshot = await get(pronunciationRef);
        
        if (snapshot.exists()) {
          setCategories(snapshot.val().categories);
        } else {
          setError('No pronunciation data found for this language');
        }
      } catch (err) {
        setError('Error fetching pronunciation data');
        console.error('Error fetching pronunciation data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (language) {
      fetchPronunciationData();
    }
  }, [language]);

  const filterPhrasesByDifficulty = (phrases) => {
    if (currentDifficulty === 'all') return phrases;
    return phrases.filter(phrase => 
      currentDifficulty === 'beginner' ? phrase.difficulty === 1 :
      currentDifficulty === 'intermediate' ? phrase.difficulty === 2 :
      phrase.difficulty === 3
    );
  };

  const getCurrentPhrases = (category) => {
    if (!categories[category]?.phrases) return [];
    return filterPhrasesByDifficulty(categories[category].phrases);
  };

  return {
    categories,
    loading,
    error,
    currentDifficulty,
    setCurrentDifficulty,
    getCurrentPhrases
  };
};
