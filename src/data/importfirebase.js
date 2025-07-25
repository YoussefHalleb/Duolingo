// src/importfirebase.js
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Configuration pour les imports ES Modules
const __dirname = dirname(fileURLToPath(import.meta.url));
// 🔐 Lire dynamiquement le fichier JSON
const serviceAccountPath = join(__dirname, '../serviceAccountKey.json');
const serviceAccountRaw = await readFile(serviceAccountPath, 'utf8');
const serviceAccount = JSON.parse(serviceAccountRaw);

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://duolingo-3cca3.firebaseio.com"
});

const db = getFirestore();

async function importData() {
  try {
    const filePath = join(__dirname, '../lessons_firestore.json');
    const fileContent = await readFile(filePath, 'utf8');
    const { __collections__ } = JSON.parse(fileContent);

    for (const [collectionName, documents] of Object.entries(__collections__)) {
      for (const [docId, docData] of Object.entries(documents)) {
        await db.collection(collectionName).doc(docId).set(docData);
      }
    }

    console.log('✅ Import terminé avec succès !');
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    process.exit();
  }
}

importData();