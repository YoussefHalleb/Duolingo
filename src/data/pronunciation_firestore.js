import { ref, set, get } from "firebase/database";
import { rtdb } from "../config/firebase.js";
import { languageData } from "./languageData.js";

// Convert difficulty level to numerical value for sorting
const getDifficultyValue = (text) => {
  // Calculate difficulty based on length and complexity
  return Math.min(3, Math.max(1, Math.ceil(text.length / 10)));
};

// Structure the pronunciation data with difficulty levels
const structurePronunciationData = () => {
  const pronunciationData = {};

  Object.entries(languageData).forEach(([language, data]) => {
    pronunciationData[language] = {
      categories: {}
    };

    Object.entries(data.categories).forEach(([category, phrases]) => {
      pronunciationData[language].categories[category] = {
        phrases: phrases.map(phrase => ({
          ...phrase,
          difficulty: getDifficultyValue(phrase.text),
          audio: `/audio/${language}-${category}-${phrase.text}.mp3` // You'll need to update this path based on your actual audio files
        }))
      };
    });
  });

  return pronunciationData;
};

// Function to initialize the pronunciation data in Firebase
export const initializePronunciationData = async () => {
  try {
    console.log('1. Structuring pronunciation data...');
    const pronunciationData = structurePronunciationData();
    console.log('Data structured successfully, languages:', Object.keys(pronunciationData));

    console.log('2. Creating Firebase reference to /pronunciation...');
    const pronunciationRef = ref(rtdb, 'pronunciation');
    
    console.log('3. Starting data upload to Firebase...');
    console.log('RTDB instance:', rtdb?._databaseId?.namespace);
    
    // Upload data in chunks to handle large datasets
    for (const [language, data] of Object.entries(pronunciationData)) {
      console.log(`Uploading ${language} data...`);
      const languageRef = ref(rtdb, `pronunciation/${language}`);
      await set(languageRef, data);
      console.log(`✅ ${language} data uploaded successfully`);
    }
    
    console.log('4. Verifying data...');
    const snapshot = await get(ref(rtdb, 'pronunciation'));
    if (snapshot.exists()) {
      console.log('✅ Data verification successful. Available languages:', Object.keys(snapshot.val()));
    } else {
      console.log('❌ No data found after upload');
    }
    
    return pronunciationData;
  } catch (error) {
    console.error('❌ Error initializing pronunciation data:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    throw error;
  }
};


