export const lessons = [
  // === ENGLISH ===
  {
    id: 'en-1',
    language: 'english',
    title: 'Greetings',
    category: 'Beginner',
    image: '/flags/royaume-uni.png',
    summary: 'Basic English greetings and polite phrases.',
    phrases: [
      { phrase: 'Hello', translation: 'Bonjour' },
      { phrase: 'Good morning', translation: 'Bonjour (le matin)' },
      { phrase: 'Goodbye', translation: 'Au revoir' }
    ],
  },
  {
    id: 'en-2',
    language: 'english',
    title: 'Ordering Food',
    category: 'Intermediate',
    image: '/flags/royaume-uni.png',
    summary: 'Learn to order food in English restaurants.',
    phrases: [
      { phrase: 'I would like a sandwich', translation: 'Je voudrais un sandwich' },
      { phrase: 'Can I see the menu?', translation: 'Puis-je voir le menu ?' },
      { phrase: 'The bill, please.', translation: 'L’addition, s’il vous plaît.' }
    ],
  },
  {
    id: 'en-3',
    language: 'english',
    title: 'Business English',
    category: 'Advanced',
    image: '/flags/royaume-uni.png',
    summary: 'Improve your formal English for meetings and emails.',
    phrases: [
      { phrase: 'Let’s schedule a meeting', translation: 'Planifions une réunion' },
      { phrase: 'I look forward to your reply', translation: 'J’attends votre réponse avec impatience' },
      { phrase: 'Best regards', translation: 'Cordialement' }
    ],
  },

  // === GERMAN ===
  {
    id: 'de-1',
    language: 'german',
    title: 'Greetings',
    category: 'Beginner',
    image: '/flags/allemagne.png',
    summary: 'Learn common German greetings.',
    phrases: [
      { phrase: 'Hallo', translation: 'Hello' },
      { phrase: 'Guten Morgen', translation: 'Good morning' },
      { phrase: 'Tschüss', translation: 'Bye' }
    ],
  },
  {
    id: 'de-2',
    language: 'german',
    title: 'Shopping',
    category: 'Intermediate',
    image: '/flags/allemagne.png',
    summary: 'Useful phrases for shopping in Germany.',
    phrases: [
      { phrase: 'Wie viel kostet das?', translation: 'How much is that?' },
      { phrase: 'Ich möchte das kaufen', translation: 'I want to buy this' },
      { phrase: 'Karte oder bar?', translation: 'Card or cash?' }
    ],
  },
  {
    id: 'de-3',
    language: 'german',
    title: 'Formal Conversation',
    category: 'Advanced',
    image: '/flags/allemagne.png',
    summary: 'Speak professionally in German settings.',
    phrases: [
      { phrase: 'Könnten Sie das bitte wiederholen?', translation: 'Could you please repeat that?' },
      { phrase: 'Ich freue mich auf die Zusammenarbeit', translation: 'I look forward to working together' },
      { phrase: 'Mit freundlichen Grüßen', translation: 'Sincerely' }
    ],
  },

  // === ITALIAN ===
  {
    id: 'it-1',
    language: 'italian',
    title: 'Greetings',
    category: 'Beginner',
    image: '/flags/italie.png',
    summary: 'Basic Italian greetings.',
    phrases: [
      { phrase: 'Ciao', translation: 'Hi/Bye' },
      { phrase: 'Buongiorno', translation: 'Good morning' },
      { phrase: 'Arrivederci', translation: 'Goodbye' }
    ],
  },
  {
    id: 'it-2',
    language: 'italian',
    title: 'At the Airport',
    category: 'Intermediate',
    image: '/flags/italie.png',
    summary: 'Common phrases used at the airport.',
    phrases: [
      { phrase: 'Dove è il gate?', translation: 'Where is the gate?' },
      { phrase: 'Ho perso il mio bagaglio', translation: 'I lost my luggage' },
      { phrase: 'Questo è il mio passaporto', translation: 'This is my passport' }
    ],
  },
  {
    id: 'it-3',
    language: 'italian',
    title: 'Cultural Expressions',
    category: 'Advanced',
    image: '/flags/italie.png',
    summary: 'Understand Italian idiomatic expressions.',
    phrases: [
      { phrase: 'In bocca al lupo', translation: 'Good luck' },
      { phrase: 'Chi dorme non piglia pesci', translation: 'You snooze, you lose' },
      { phrase: 'È acqua passata', translation: 'It’s water under the bridge' }
    ],
  },

  // === FRENCH ===
  {
    id: 'fr-1',
    language: 'french',
    title: 'Salutations',
    category: 'Débutant',
    image: '/flags/la-france.png',
    summary: 'Apprenez les bases des salutations françaises.',
    phrases: [
      { phrase: 'Bonjour', translation: 'Hello', audio: null },
      { phrase: 'Bonsoir', translation: 'Good evening', audio: null },
      { phrase: 'Au revoir', translation: 'Goodbye', audio: null },
    ],
  },
  {
    id: 'fr-2',
    language: 'french',
    title: 'Nourriture',
    category: 'Intermédiaire',
    image: '/flags/la-france.png',
    summary: 'Découvrez le vocabulaire des aliments et des repas.',
    phrases: [
      { phrase: 'Pain', translation: 'Bread', audio: null },
      { phrase: 'Vin', translation: 'Wine', audio: null },
      { phrase: 'Fromage', translation: 'Cheese', audio: null },
    ],
  },
  {
    id: 'fr-3',
    language: 'french',
    title: 'Voyage',
    category: 'Intermédiaire',
    image: '/flags/la-france.png',
    summary: 'Apprenez les phrases utiles pour voyager en français.',
    phrases: [
      { phrase: 'Où est la gare ?', translation: 'Where is the train station?', audio: null },
      { phrase: 'Un billet, s\'il vous plaît.', translation: 'One ticket, please.', audio: null },
      { phrase: 'Je voudrais une chambre.', translation: 'I would like a room.', audio: null },
    ],
  },

  // === SPANISH ===
  {
    id: 'es-1',
    language: 'spanish',
    title: 'Saludos',
    category: 'Principiante',
    image: '/flags/monde.png',
    summary: 'Domine les salutations de base en espagnol.',
    phrases: [
      { phrase: 'Hola', translation: 'Hello', audio: null },
      { phrase: 'Gracias', translation: 'Thank you', audio: null },
      { phrase: 'Me llamo...', translation: 'My name is...', audio: null },
    ],
  },
  {
    id: 'es-2',
    language: 'spanish',
    title: 'Comida',
    category: 'Intermedio',
    image: '/flags/monde.png',
    summary: 'Aprenda el vocabulaire relacionado con la comida.',
    phrases: [
      { phrase: 'Pan', translation: 'Bread', audio: null },
      { phrase: 'Vino', translation: 'Wine', audio: null },
      { phrase: 'Queso', translation: 'Cheese', audio: null },
    ],
  },
  {
    id: 'es-3',
    language: 'spanish',
    title: 'Viaje',
    category: 'Intermedio',
    image: '/flags/monde.png',
    summary: 'Frases útiles para viajar en español.',
    phrases: [
      { phrase: '¿Dónde está la estación?', translation: 'Where is the station?', audio: null },
      { phrase: 'Un billete, por favor.', translation: 'One ticket, please.', audio: null },
      { phrase: 'Quiero una habitación.', translation: 'I want a room.', audio: null },
    ],
  },
];