export const quizData = [
  // === ENGLISH ===
  // English - Greetings (en-1)
  {
    id: "quiz-en-1-greetings",
    title: "Quiz - Greetings in English",
    language: "english",
    questions: [
      {
        id: "q-en-1-1",
        type: "multiple_choice",
        question: "What is 'Bonjour' in English?",
        options: ["Hello", "Goodbye", "Good evening", "Thank you"],
        correctAnswer: "Hello",
        lessonId: "en-1",
      },
      {
        id: "q-en-1-2",
        type: "matching",
        question: "Match the English greetings to their translations",
        pairs: [
          { word: "Hello", translation: "salut" },
          { word: "Good morning", translation: "Bonjour" },
          { word: "Goodbye", translation: "Au revoir" },
        ],
        correctAnswer: ["Hello:salut", "Good morning:Bonjour", "Goodbye:Au revoir"],
        lessonId: "en-1",
      },
      {
        id: "q-en-1-3",
        type: "free_text",
        question: "Translate 'Merci' into English.",
        correctAnswer: "Thank you",
        lessonId: "en-1",
      },
      {
        id: "q-en-1-4",
        type: "sentence_builder",
        nativeSentence: "Hello",
        targetWords: ["salut"],
        lessonId: "en-1",
      },
    ],
  },
  // English - Ordering Food (en-2)
  {
    id: "quiz-en-2-food",
    title: "Quiz - Ordering Food in English",
    language: "english",
    questions: [
      {
        id: "q-en-2-1",
        type: "multiple_choice",
        question: "What is 'Je voudrais un sandwich' in English?",
        options: ["I would like a sandwich", "Can I see the menu?", "The bill, please", "Thank you"],
        correctAnswer: "I would like a sandwich",
        lessonId: "en-2",
      },
      {
        id: "q-en-2-2",
        type: "matching",
        question: "Match the English phrases to their translations",
        pairs: [
          { word: "I would like a sandwich", translation: "Je voudrais un sandwich" },
          { word: "Can I see the menu?", translation: "Puis-je voir le menu ?" },
          { word: "The bill, please.", translation: "L’addition, s’il vous plaît." },
        ],
        correctAnswer: ["I would like a sandwich:Je voudrais un sandwich", "Can I see the menu?:Puis-je voir le menu ?", "The bill, please.:L’addition, s’il vous plaît."],
        lessonId: "en-2",
      },
      {
        id: "q-en-2-3",
        type: "free_text",
        question: "Translate 'Attendez, s’il vous plaît' into English.",
        correctAnswer: "Please wait",
        lessonId: "en-2",
      },
      {
        id: "q-en-2-4",
        type: "sentence_builder",
        nativeSentence: "I would like a sandwich",
        targetWords: ["Je", "voudrais", "un", "sandwich"],
        lessonId: "en-2",
      },
    ],
  },
  // English - Business English (en-3)
  {
    id: "quiz-en-3-business",
    title: "Quiz - Business English",
    language: "english",
    questions: [
      {
        id: "q-en-3-1",
        type: "multiple_choice",
        question: "What is 'Planifions une réunion' in English?",
        options: ["Let’s schedule a meeting", "I look forward to your reply", "Best regards", "Thank you for your time"],
        correctAnswer: "Let’s schedule a meeting",
        lessonId: "en-3",
      },
      {
        id: "q-en-3-2",
        type: "matching",
        question: "Match the English phrases to their translations",
        pairs: [
          { word: "Let’s schedule a meeting", translation: "Planifions une réunion" },
          { word: "I look forward to your reply", translation: "J’attends votre réponse avec impatience" },
          { word: "Best regards", translation: "Cordialement" },
        ],
        correctAnswer: ["Let’s schedule a meeting:Planifions une réunion", "I look forward to your reply:J’attends votre réponse avec impatience", "Best regards:Cordialement"],
        lessonId: "en-3",
      },
      {
        id: "q-en-3-3",
        type: "free_text",
        question: "Translate 'Veuillez confirmer' into English.",
        correctAnswer: "Please confirm",
        lessonId: "en-3",
      },
      {
        id: "q-en-3-4",
        type: "sentence_builder",
        nativeSentence: "Let’s schedule a meeting",
        targetWords: ["Planifions", "une", "réunion"],
        lessonId: "en-3",
      },
    ],
  },

  // === GERMAN ===
  // German - Greetings (de-1)
  {
    id: "quiz-de-1-greetings",
    title: "Quiz - Grüße auf Deutsch",
    language: "german",
    questions: [
      {
        id: "q-de-1-1",
        type: "multiple_choice",
        question: "What is 'Hello' in German?",
        options: ["Gute Nacht", "Hallo", "Auf Wiedersehen", "Danke"],
        correctAnswer: "Hallo",
        lessonId: "de-1",
      },
      {
        id: "q-de-1-2",
        type: "matching",
        question: "Match the German greetings to their translations",
        pairs: [
          { word: "Hallo", translation: "Hello" },
          { word: "Guten Morgen", translation: "Good morning" },
          { word: "Tschüss", translation: "Bye" },
        ],
        correctAnswer: ["Hallo:Hello", "Guten Morgen:Good morning", "Tschüss:Bye"],
        lessonId: "de-1",
      },
      {
        id: "q-de-1-3",
        type: "free_text",
        question: "Translate 'Thank you' into German.",
        correctAnswer: "Danke",
        lessonId: "de-1",
      },
      {
        id: "q-de-1-4",
        type: "sentence_builder",
        nativeSentence: "Hallo",
        targetWords: ["Hello"],
        lessonId: "de-1",
      },
    ],
  },
  // German - Shopping (de-2)
  {
    id: "quiz-de-2-shopping",
    title: "Quiz - Einkaufen auf Deutsch",
    language: "german",
    questions: [
      {
        id: "q-de-2-1",
        type: "multiple_choice",
        question: "What is 'How much is that?' in German?",
        options: ["Wie viel kostet das?", "Ich möchte das kaufen", "Karte oder bar?", "Danke schön"],
        correctAnswer: "Wie viel kostet das?",
        lessonId: "de-2",
      },
      {
        id: "q-de-2-2",
        type: "matching",
        question: "Match the German phrases to their translations",
        pairs: [
          { word: "Wie viel kostet das?", translation: "How much is that?" },
          { word: "Ich möchte das kaufen", translation: "I want to buy this" },
          { word: "Karte oder bar?", translation: "Card or cash?" },
        ],
        correctAnswer: ["Wie viel kostet das?:How much is that?", "Ich möchte das kaufen:I want to buy this", "Karte oder bar?:Card or cash?"],
        lessonId: "de-2",
      },
      {
        id: "q-de-2-3",
        type: "free_text",
        question: "Translate 'Please wait' into German.",
        correctAnswer: "Bitte warten",
        lessonId: "de-2",
      },
      {
        id: "q-de-2-4",
        type: "sentence_builder",
        nativeSentence: "Wie viel kostet das?",
        targetWords: ["How", "much", "is", "that?"],
        lessonId: "de-2",
      },
    ],
  },
  // German - Formal Conversation (de-3)
  {
    id: "quiz-de-3-formal",
    title: "Quiz - Formale Unterhaltung",
    language: "german",
    questions: [
      {
        id: "q-de-3-1",
        type: "multiple_choice",
        question: "What is 'Could you please repeat that?' in German?",
        options: ["Könnten Sie das bitte wiederholen?", "Ich freue mich auf die Zusammenarbeit", "Mit freundlichen Grüßen", "Vielen Dank"],
        correctAnswer: "Könnten Sie das bitte wiederholen?",
        lessonId: "de-3",
      },
      {
        id: "q-de-3-2",
        type: "matching",
        question: "Match the German phrases to their translations",
        pairs: [
          { word: "Könnten Sie das bitte wiederholen?", translation: "Could you please repeat that?" },
          { word: "Ich freue mich auf die Zusammenarbeit", translation: "I look forward to working together" },
          { word: "Mit freundlichen Grüßen", translation: "Sincerely" },
        ],
        correctAnswer: ["Könnten Sie das bitte wiederholen?:Could you please repeat that?", "Ich freue mich auf die Zusammenarbeit:I look forward to working together", "Mit freundlichen Grüßen:Sincerely"],
        lessonId: "de-3",
      },
      {
        id: "q-de-3-3",
        type: "free_text",
        question: "Translate 'Please confirm' into German.",
        correctAnswer: "Bitte bestätigen",
        lessonId: "de-3",
      },
      {
        id: "q-de-3-4",
        type: "sentence_builder",
        nativeSentence: "Könnten Sie das bitte wiederholen?",
        targetWords: ["Could", "you", "please", "repeat", "that?"],
        lessonId: "de-3",
      },
    ],
  },

  // === ITALIAN ===
  // Italian - Greetings (it-1)
  {
    id: "quiz-it-1-greetings",
    title: "Quiz - Saluti in Italiano",
    language: "italian",
    questions: [
      {
        id: "q-it-1-1",
        type: "multiple_choice",
        question: "What is 'Hello' in Italian?",
        options: ["Arrivederci", "Ciao", "Buonanotte", "Grazie"],
        correctAnswer: "Ciao",
        lessonId: "it-1",
      },
      {
        id: "q-it-1-2",
        type: "matching",
        question: "Match the Italian greetings to their translations",
        pairs: [
          { word: "Ciao", translation: "Hi/Bye" },
          { word: "Buongiorno", translation: "Good morning" },
          { word: "Arrivederci", translation: "Goodbye" },
        ],
        correctAnswer: ["Ciao:Hi/Bye", "Buongiorno:Good morning", "Arrivederci:Goodbye"],
        lessonId: "it-1",
      },
      {
        id: "q-it-1-3",
        type: "free_text",
        question: "Translate 'Thank you' into Italian.",
        correctAnswer: "Grazie",
        lessonId: "it-1",
      },
      {
        id: "q-it-1-4",
        type: "sentence_builder",
        nativeSentence: "Ciao",
        targetWords: ["Hi"],
        lessonId: "it-1",
      },
    ],
  },
  // Italian - At the Airport (it-2)
  {
    id: "quiz-it-2-airport",
    title: "Quiz - All'aeroporto in Italiano",
    language: "italian",
    questions: [
      {
        id: "q-it-2-1",
        type: "multiple_choice",
        question: "What is 'Where is the gate?' in Italian?",
        options: ["Dove è il gate?", "Ho perso il mio bagaglio", "Questo è il mio passaporto", "Grazie mille"],
        correctAnswer: "Dove è il gate?",
        lessonId: "it-2",
      },
      {
        id: "q-it-2-2",
        type: "matching",
        question: "Match the Italian phrases to their translations",
        pairs: [
          { word: "Dove è il gate?", translation: "Where is the gate?" },
          { word: "Ho perso il mio bagaglio", translation: "I lost my luggage" },
          { word: "Questo è il mio passaporto", translation: "This is my passport" },
        ],
        correctAnswer: ["Dove è il gate?:Where is the gate?", "Ho perso il mio bagaglio:I lost my luggage", "Questo è il mio passaporto:This is my passport"],
        lessonId: "it-2",
      },
      {
        id: "q-it-2-3",
        type: "free_text",
        question: "Translate 'Wait a moment' into Italian.",
        correctAnswer: "Aspetta un momento",
        lessonId: "it-2",
      },
      {
        id: "q-it-2-4",
        type: "sentence_builder",
        nativeSentence: "Dove è il gate?",
        targetWords: ["Where", "is", "the", "gate?"],
        lessonId: "it-2",
      },
    ],
  },
  // Italian - Cultural Expressions (it-3)
  {
    id: "quiz-it-3-culture",
    title: "Quiz - Espressioni Culturali",
    language: "italian",
    questions: [
      {
        id: "q-it-3-1",
        type: "multiple_choice",
        question: "What is 'Good luck' in Italian?",
        options: ["In bocca al lupo", "Chi dorme non piglia pesci", "È acqua passata", "Grazie ancora"],
        correctAnswer: "In bocca al lupo",
        lessonId: "it-3",
      },
      {
        id: "q-it-3-2",
        type: "matching",
        question: "Match the Italian phrases to their translations",
        pairs: [
          { word: "In bocca al lupo", translation: "Good luck" },
          { word: "Chi dorme non piglia pesci", translation: "You snooze, you lose" },
          { word: "È acqua passata", translation: "It’s water under the bridge" },
        ],
        correctAnswer: ["In bocca al lupo:Good luck", "Chi dorme non piglia pesci:You snooze, you lose", "È acqua passata:It’s water under the bridge"],
        lessonId: "it-3",
      },
      {
        id: "q-it-3-3",
        type: "free_text",
        question: "Translate 'Thanks again' into Italian.",
        correctAnswer: "Grazie ancora",
        lessonId: "it-3",
      },
      {
        id: "q-it-3-4",
        type: "sentence_builder",
        nativeSentence: "In bocca al lupo",
        targetWords: ["Good", "luck"],
        lessonId: "it-3",
      },
    ],
  },

  // === FRENCH ===
  // French - Greetings (fr-1)
  {
    id: "quiz-fr-1-greetings",
    title: "Quiz - Salutations en Français",
    language: "french",
    questions: [
      {
        id: "q-fr-1-1",
        type: "multiple_choice",
        question: "What is 'Hello' in French?",
        options: ["Bonjour", "Bonsoir", "Au revoir", "Merci"],
        correctAnswer: "Bonjour",
        lessonId: "fr-1",
      },
      {
        id: "q-fr-1-2",
        type: "matching",
        question: "Match the French greetings to their translations",
        pairs: [
          { word: "Bonjour", translation: "Hello" },
          { word: "Bonsoir", translation: "Good evening" },
          { word: "Au revoir", translation: "Goodbye" },
        ],
        correctAnswer: ["Bonjour:Hello", "Bonsoir:Good evening", "Au revoir:Goodbye"],
        lessonId: "fr-1",
      },
      {
        id: "q-fr-1-3",
        type: "free_text",
        question: "Translate 'Thank you' into French.",
        correctAnswer: "Merci",
        lessonId: "fr-1",
      },
      {
        id: "q-fr-1-4",
        type: "sentence_builder",
        nativeSentence: "Bonjour",
        targetWords: ["Hello"],
        lessonId: "fr-1",
      },
    ],
  },
  // French - Food (fr-2)
  {
    id: "quiz-fr-2-food",
    title: "Quiz - Nourriture en Français",
    language: "french",
    questions: [
      {
        id: "q-fr-2-1",
        type: "multiple_choice",
        question: "What is 'Bread' in French?",
        options: ["Vin", "Pain", "Fromage", "Eau"],
        correctAnswer: "Pain",
        lessonId: "fr-2",
      },
      {
        id: "q-fr-2-2",
        type: "matching",
        question: "Match the French food words to their translations",
        pairs: [
          { word: "Pain", translation: "Bread" },
          { word: "Vin", translation: "Wine" },
          { word: "Fromage", translation: "Cheese" },
        ],
        correctAnswer: ["Pain:Bread", "Vin:Wine", "Fromage:Cheese"],
        lessonId: "fr-2",
      },
      {
        id: "q-fr-2-3",
        type: "free_text",
        question: "Translate 'Wait' into French.",
        correctAnswer: "Attendez",
        lessonId: "fr-2",
      },
      {
        id: "q-fr-2-4",
        type: "sentence_builder",
        nativeSentence: "Pain",
        targetWords: ["Bread"],
        lessonId: "fr-2",
      },
    ],
  },
  // French - Travel (fr-3)
  {
    id: "quiz-fr-3-travel",
    title: "Quiz - Voyage en Français",
    language: "french",
    questions: [
      {
        id: "q-fr-3-1",
        type: "multiple_choice",
        question: "What is 'Where is the train station?' in French?",
        options: ["Où est la gare ?", "Un billet, s’il vous plaît.", "Je voudrais une chambre.", "Merci bien"],
        correctAnswer: "Où est la gare ?",
        lessonId: "fr-3",
      },
      {
        id: "q-fr-3-2",
        type: "matching",
        question: "Match the French phrases to their translations",
        pairs: [
          { word: "Où est la gare ?", translation: "Where is the train station?" },
          { word: "Un billet, s’il vous plaît.", translation: "One ticket, please." },
          { word: "Je voudrais une chambre.", translation: "I would like a room." },
        ],
        correctAnswer: ["Où est la gare ?:Where is the train station?", "Un billet, s’il vous plaît.:One ticket, please.", "Je voudrais une chambre.:I would like a room."],
        lessonId: "fr-3",
      },
      {
        id: "q-fr-3-3",
        type: "free_text",
        question: "Translate 'Thank you kindly' into French.",
        correctAnswer: "Merci bien",
        lessonId: "fr-3",
      },
      {
        id: "q-fr-3-4",
        type: "sentence_builder",
        nativeSentence: "Où est la gare ?",
        targetWords: ["Where", "is", "the", "train", "station?"],
        lessonId: "fr-3",
      },
    ],
  },

  // === SPANISH ===
  // Spanish - Greetings (es-1)
  {
    id: "quiz-es-1-greetings",
    title: "Quiz - Saludos en Español",
    language: "spanish",
    questions: [
      {
        id: "q-es-1-1",
        type: "multiple_choice",
        question: "What is 'Hello' in Spanish?",
        options: ["¡Adiós!", "¡Hola!", "¡Gracias!", "¡Buenas noches!"],
        correctAnswer: "¡Hola!",
        lessonId: "es-1",
      },
      {
        id: "q-es-1-2",
        type: "matching",
        question: "Match the Spanish greetings to their translations",
        pairs: [
          { word: "¡Hola!", translation: "Hello" },
          { word: "¡Gracias!", translation: "Thank you" },
          { word: "¡Buenos días!", translation: "Good morning" },
        ],
        correctAnswer: ["¡Hola!:Hello", "¡Gracias!:Thank you", "¡Buenos días!:Good morning"],
        lessonId: "es-1",
      },
      {
        id: "q-es-1-3",
        type: "free_text",
        question: "Translate 'Please' into Spanish.",
        correctAnswer: "Por favor",
        lessonId: "es-1",
      },
      {
        id: "q-es-1-4",
        type: "sentence_builder",
        nativeSentence: "¡Hola!",
        targetWords: ["Hello"],
        lessonId: "es-1",
      },
    ],
  },
  // Spanish - Food (es-2)
  {
    id: "quiz-es-2-food",
    title: "Quiz - Comida en Español",
    language: "spanish",
    questions: [
      {
        id: "q-es-2-1",
        type: "multiple_choice",
        question: "What is 'Bread' in Spanish?",
        options: ["Vino", "Pan", "Queso", "Agua"],
        correctAnswer: "Pan",
        lessonId: "es-2",
      },
      {
        id: "q-es-2-2",
        type: "matching",
        question: "Match the Spanish food words to their translations",
        pairs: [
          { word: "Pan", translation: "Bread" },
          { word: "Vino", translation: "Wine" },
          { word: "Queso", translation: "Cheese" },
        ],
        correctAnswer: ["Pan:Bread", "Vino:Wine", "Queso:Cheese"],
        lessonId: "es-2",
      },
      {
        id: "q-es-2-3",
        type: "free_text",
        question: "Translate 'Wait a moment' into Spanish.",
        correctAnswer: "Espere un momento",
        lessonId: "es-2",
      },
      {
        id: "q-es-2-4",
        type: "sentence_builder",
        nativeSentence: "Pan",
        targetWords: ["Bread"],
        lessonId: "es-2",
      },
    ],
  },
  // Spanish - Travel (es-3)
  {
    id: "quiz-es-3-travel",
    title: "Quiz - Viajes en Español",
    language: "spanish",
    questions: [
      {
        id: "q-es-3-1",
        type: "multiple_choice",
        question: "What is 'Where is the station?' in Spanish?",
        options: ["¿Dónde está la estación?", "Un billete, por favor.", "Quiero una habitación.", "Muchas gracias"],
        correctAnswer: "¿Dónde está la estación?",
        lessonId: "es-3",
      },
      {
        id: "q-es-3-2",
        type: "matching",
        question: "Match the Spanish phrases to their translations",
        pairs: [
          { word: "¿Dónde está la estación?", translation: "Where is the station?" },
          { word: "Un billete, por favor.", translation: "One ticket, please." },
          { word: "Quiero una habitación.", translation: "I want a room." },
        ],
        correctAnswer: ["¿Dónde está la estación?:Where is the station?", "Un billete, por favor.:One ticket, please.", "Quiero una habitación.:I want a room."],
        lessonId: "es-3",
      },
      {
        id: "q-es-3-3",
        type: "free_text",
        question: "Translate 'Thank you very much' into Spanish.",
        correctAnswer: "Muchas gracias",
        lessonId: "es-3",
      },
      {
        id: "q-es-3-4",
        type: "sentence_builder",
        nativeSentence: "¿Dónde está la estación?",
        targetWords: ["Where", "is", "the", "station?"],
        lessonId: "es-3",
      },
    ],
  },

  // === PORTUGUESE ===
  // Portuguese - Greetings (pt-1)
  {
    id: "quiz-pt-1-greetings",
    title: "Quiz - Saudações em Português",
    language: "portuguese",
    questions: [
      {
        id: "q-pt-1-1",
        type: "multiple_choice",
        question: "What is 'Hello' in Portuguese?",
        options: ["Adeus", "Olá", "Boa noite", "Obrigado"],
        correctAnswer: "Olá",
        lessonId: "pt-1",
      },
      {
        id: "q-pt-1-2",
        type: "matching",
        question: "Match the Portuguese greetings to their translations",
        pairs: [
          { word: "Olá", translation: "Hello" },
          { word: "Bom dia", translation: "Good morning" },
          { word: "Tchau", translation: "Goodbye" },
        ],
        correctAnswer: ["Olá:Hello", "Bom dia:Good morning", "Tchau:Goodbye"],
        lessonId: "pt-1",
      },
      {
        id: "q-pt-1-3",
        type: "free_text",
        question: "Translate 'Thank you' into Portuguese.",
        correctAnswer: "Obrigado",
        lessonId: "pt-1",
      },
      {
        id: "q-pt-1-4",
        type: "sentence_builder",
        nativeSentence: "Olá",
        targetWords: ["Hello"],
        lessonId: "pt-1",
      },
    ],
  },
  // Portuguese - At the Restaurant (pt-2)
  {
    id: "quiz-pt-2-restaurant",
    title: "Quiz - No Restaurante em Português",
    language: "portuguese",
    questions: [
      {
        id: "q-pt-2-1",
        type: "multiple_choice",
        question: "What is 'I would like a coffee' in Portuguese?",
        options: ["Eu gostaria de um café", "Pode me trazer o cardápio?", "A conta, por favor.", "Obrigado pela ajuda"],
        correctAnswer: "Eu gostaria de um café",
        lessonId: "pt-2",
      },
      {
        id: "q-pt-2-2",
        type: "matching",
        question: "Match the Portuguese phrases to their translations",
        pairs: [
          { word: "Eu gostaria de um café", translation: "I would like a coffee" },
          { word: "Pode me trazer o cardápio?", translation: "Can you bring me the menu?" },
          { word: "A conta, por favor.", translation: "The bill, please." },
        ],
        correctAnswer: ["Eu gostaria de um café:I would like a coffee", "Pode me trazer o cardápio?:Can you bring me the menu?", "A conta, por favor.:The bill, please."],
        lessonId: "pt-2",
      },
      {
        id: "q-pt-2-3",
        type: "free_text",
        question: "Translate 'Wait a moment' into Portuguese.",
        correctAnswer: "Aguarde um momento",
        lessonId: "pt-2",
      },
      {
        id: "q-pt-2-4",
        type: "sentence_builder",
        nativeSentence: "Eu gostaria de um café",
        targetWords: ["I", "would", "like", "a", "coffee"],
        lessonId: "pt-2",
      },
    ],
  },
  // Portuguese - Business (pt-3)
  {
    id: "quiz-pt-3-business",
    title: "Quiz - Negócios em Português",
    language: "portuguese",
    questions: [
      {
        id: "q-pt-3-1",
        type: "multiple_choice",
        question: "What is 'Let’s schedule a meeting' in Portuguese?",
        options: ["Vamos agendar uma reunião", "Aguardo seu retorno", "Atenciosamente", "Muito obrigado"],
        correctAnswer: "Vamos agendar uma reunião",
        lessonId: "pt-3",
      },
      {
        id: "q-pt-3-2",
        type: "matching",
        question: "Match the Portuguese phrases to their translations",
        pairs: [
          { word: "Vamos agendar uma reunião", translation: "Let’s schedule a meeting" },
          { word: "Aguardo seu retorno", translation: "I look forward to your response" },
          { word: "Atenciosamente", translation: "Best regards" },
        ],
        correctAnswer: ["Vamos agendar uma reunião:Let’s schedule a meeting", "Aguardo seu retorno:I look forward to your response", "Atenciosamente:Best regards"],
        lessonId: "pt-3",
      },
      {
        id: "q-pt-3-3",
        type: "free_text",
        question: "Translate 'Thank you very much' into Portuguese.",
        correctAnswer: "Muito obrigado",
        lessonId: "pt-3",
      },
      {
        id: "q-pt-3-4",
        type: "sentence_builder",
        nativeSentence: "Vamos agendar uma reunião",
        targetWords: ["Let’s", "schedule", "a", "meeting"],
        lessonId: "pt-3",
      },
    ],
  },

  // === DUTCH ===
  // Dutch - Greetings (nl-1)
  {
    id: "quiz-nl-1-greetings",
    title: "Quiz - Groeten in Nederlands",
    language: "dutch",
    questions: [
      {
        id: "q-nl-1-1",
        type: "multiple_choice",
        question: "What is 'Hello' in Dutch?",
        options: ["Tot ziens", "Hallo", "Goedenacht", "Dank je wel"],
        correctAnswer: "Hallo",
        lessonId: "nl-1",
      },
      {
        id: "q-nl-1-2",
        type: "matching",
        question: "Match the Dutch greetings to their translations",
        pairs: [
          { word: "Hallo", translation: "Hello" },
          { word: "Goedemorgen", translation: "Good morning" },
          { word: "Tot ziens", translation: "Goodbye" },
        ],
        correctAnswer: ["Hallo:Hello", "Goedemorgen:Good morning", "Tot ziens:Goodbye"],
        lessonId: "nl-1",
      },
      {
        id: "q-nl-1-3",
        type: "free_text",
        question: "Translate 'Thank you' into Dutch.",
        correctAnswer: "Dank je",
        lessonId: "nl-1",
      },
      {
        id: "q-nl-1-4",
        type: "sentence_builder",
        nativeSentence: "Hallo",
        targetWords: ["Hello"],
        lessonId: "nl-1",
      },
    ],
  },
  // Dutch - In the Shop (nl-2)
  {
    id: "quiz-nl-2-shop",
    title: "Quiz - In de Winkel",
    language: "dutch",
    questions: [
      {
        id: "q-nl-2-1",
        type: "multiple_choice",
        question: "What is 'How much does this cost?' in Dutch?",
        options: ["Hoeveel kost dit?", "Ik wil dit graag kopen", "Kan ik met kaart betalen?", "Dank u wel"],
        correctAnswer: "Hoeveel kost dit?",
        lessonId: "nl-2",
      },
      {
        id: "q-nl-2-2",
        type: "matching",
        question: "Match the Dutch phrases to their translations",
        pairs: [
          { word: "Hoeveel kost dit?", translation: "How much does this cost?" },
          { word: "Ik wil dit graag kopen", translation: "I would like to buy this" },
          { word: "Kan ik met kaart betalen?", translation: "Can I pay by card?" },
        ],
        correctAnswer: ["Hoeveel kost dit?:How much does this cost?", "Ik wil dit graag kopen:I would like to buy this", "Kan ik met kaart betalen?:Can I pay by card?"],
        lessonId: "nl-2",
      },
      {
        id: "q-nl-2-3",
        type: "free_text",
        question: "Translate 'Thank you very much' into Dutch.",
        correctAnswer: "Dank u wel",
        lessonId: "nl-2",
      },
      {
        id: "q-nl-2-4",
        type: "sentence_builder",
        nativeSentence: "Hoeveel kost dit?",
        targetWords: ["How", "much", "does", "this", "cost?"],
        lessonId: "nl-2",
      },
    ],
  },
  // Dutch - Business Communication (nl-3)
  {
    id: "quiz-nl-3-business",
    title: "Quiz - Bedrijfscommunicatie",
    language: "dutch",
    questions: [
      {
        id: "q-nl-3-1",
        type: "multiple_choice",
        question: "What is 'Let’s make an appointment' in Dutch?",
        options: ["Laten we een afspraak maken", "Ik zie uw reactie graag tegemoet", "Met vriendelijke groet", "Hartelijk dank"],
        correctAnswer: "Laten we een afspraak maken",
        lessonId: "nl-3",
      },
      {
        id: "q-nl-3-2",
        type: "matching",
        question: "Match the Dutch phrases to their translations",
        pairs: [
          { word: "Laten we een afspraak maken", translation: "Let’s make an appointment" },
          { word: "Ik zie uw reactie graag tegemoet", translation: "I look forward to your response" },
          { word: "Met vriendelijke groet", translation: "Kind regards" },
        ],
        correctAnswer: ["Laten we een afspraak maken:Let’s make an appointment", "Ik zie uw reactie graag tegemoet:I look forward to your response", "Met vriendelijke groet:Kind regards"],
        lessonId: "nl-3",
      },
      {
        id: "q-nl-3-3",
        type: "free_text",
        question: "Translate 'Please confirm' into Dutch.",
        correctAnswer: "Bevestig alstublieft",
        lessonId: "nl-3",
      },
      {
        id: "q-nl-3-4",
        type: "sentence_builder",
        nativeSentence: "Laten we een afspraak maken",
        targetWords: ["Let’s", "make", "an", "appointment"],
        lessonId: "nl-3",
      },
    ],
  },

  // === RUSSIAN ===
  // Russian - Greetings (ru-1)
  {
    id: "quiz-ru-1-greetings",
    title: "Quiz - Приветствия на русском",
    language: "russian",
    questions: [
      {
        id: "q-ru-1-1",
        type: "multiple_choice",
        question: "What is 'Hello' in Russian?",
        options: ["До свидания", "Привет", "Спокойной ночи", "Спасибо"],
        correctAnswer: "Привет",
        lessonId: "ru-1",
      },
      {
        id: "q-ru-1-2",
        type: "matching",
        question: "Match the Russian greetings to their translations",
        pairs: [
          { word: "Привет", translation: "Hi" },
          { word: "Доброе утро", translation: "Good morning" },
          { word: "До свидания", translation: "Goodbye" },
        ],
        correctAnswer: ["Привет:Hi", "Доброе утро:Good morning", "До свидания:Goodbye"],
        lessonId: "ru-1",
      },
      {
        id: "q-ru-1-3",
        type: "free_text",
        question: "Translate 'Thank you' into Russian.",
        correctAnswer: "Спасибо",
        lessonId: "ru-1",
      },
      {
        id: "q-ru-1-4",
        type: "sentence_builder",
        nativeSentence: "Привет",
        targetWords: ["Hi"],
        lessonId: "ru-1",
      },
    ],
  },
  // Russian - At the Café (ru-2)
  {
    id: "quiz-ru-2-cafe",
    title: "Quiz - В кафе на русском",
    language: "russian",
    questions: [
      {
        id: "q-ru-2-1",
        type: "multiple_choice",
        question: "What is 'Can I see the menu, please?' in Russian?",
        options: ["Можно меню, пожалуйста?", "Я хочу чай", "Счёт, пожалуйста.", "Большое спасибо"],
        correctAnswer: "Можно меню, пожалуйста?",
        lessonId: "ru-2",
      },
      {
        id: "q-ru-2-2",
        type: "matching",
        question: "Match the Russian phrases to their translations",
        pairs: [
          { word: "Можно меню, пожалуйста?", translation: "Can I see the menu, please?" },
          { word: "Я хочу чай", translation: "I want tea" },
          { word: "Счёт, пожалуйста.", translation: "The bill, please." },
        ],
        correctAnswer: ["Можно меню, пожалуйста?:Can I see the menu, please?", "Я хочу чай:I want tea", "Счёт, пожалуйста.:The bill, please."],
        lessonId: "ru-2",
      },
      {
        id: "q-ru-2-3",
        type: "free_text",
        question: "Translate 'Wait' into Russian.",
        correctAnswer: "Подождите",
        lessonId: "ru-2",
      },
      {
        id: "q-ru-2-4",
        type: "sentence_builder",
        nativeSentence: "Можно меню, пожалуйста?",
        targetWords: ["Can", "I", "see", "the", "menu", "please?"],
        lessonId: "ru-2",
      },
    ],
  },
  // Russian - Business Russian (ru-3)
  {
    id: "quiz-ru-3-business",
    title: "Quiz - Деловой русский",
    language: "russian",
    questions: [
      {
        id: "q-ru-3-1",
        type: "multiple_choice",
        question: "What is 'Let’s schedule a meeting' in Russian?",
        options: ["Давайте назначим встречу", "Жду вашего ответа", "С уважением", "Спасибо большое"],
        correctAnswer: "Давайте назначим встречу",
        lessonId: "ru-3",
      },
      {
        id: "q-ru-3-2",
        type: "matching",
        question: "Match the Russian phrases to their translations",
        pairs: [
          { word: "Давайте назначим встречу", translation: "Let’s schedule a meeting" },
          { word: "Жду вашего ответа", translation: "I await your reply" },
          { word: "С уважением", translation: "Sincerely" },
        ],
        correctAnswer: ["Давайте назначим встречу:Let’s schedule a meeting", "Жду вашего ответа:I await your reply", "С уважением:Sincerely"],
        lessonId: "ru-3",
      },
      {
        id: "q-ru-3-3",
        type: "free_text",
        question: "Translate 'Thank you very much' into Russian.",
        correctAnswer: "Спасибо большое",
        lessonId: "ru-3",
      },
      {
        id: "q-ru-3-4",
        type: "sentence_builder",
        nativeSentence: "Давайте назначим встречу",
        targetWords: ["Let’s", "schedule", "a", "meeting"],
        lessonId: "ru-3",
      },
    ],
  },

  // === JAPANESE ===
  // Japanese - Greetings (ja-1)
  {
    id: "quiz-ja-1-greetings",
    title: "Quiz - 挨拶 (Aisatsu) in Japanese",
    language: "japanese",
    questions: [
      {
        id: "q-ja-1-1",
        type: "multiple_choice",
        question: "What is 'Hello' in Japanese?",
        options: ["さようなら", "こんにちは", "おやすみなさい", "ありがとう"],
        correctAnswer: "こんにちは",
        lessonId: "ja-1",
      },
      {
        id: "q-ja-1-2",
        type: "matching",
        question: "Match the Japanese greetings to their translations",
        pairs: [
          { word: "こんにちは", translation: "Hello" },
          { word: "おはようございます", translation: "Good morning" },
          { word: "さようなら", translation: "Goodbye" },
        ],
        correctAnswer: ["こんにちは:Hello", "おはようございます:Good morning", "さようなら:Goodbye"],
        lessonId: "ja-1",
      },
      {
        id: "q-ja-1-3",
        type: "free_text",
        question: "Translate 'Thank you' into Japanese.",
        correctAnswer: "ありがとう",
        lessonId: "ja-1",
      },
      {
        id: "q-ja-1-4",
        type: "sentence_builder",
        nativeSentence: "こんにちは",
        targetWords: ["Hello"],
        lessonId: "ja-1",
      },
    ],
  },
  // Japanese - At the Restaurant (ja-2)
  {
    id: "quiz-ja-2-restaurant",
    title: "Quiz - レストラン (Resutoran) in Japanese",
    language: "japanese",
    questions: [
      {
        id: "q-ja-2-1",
        type: "multiple_choice",
        question: "What is 'Menu, please' in Japanese?",
        options: ["メニューをお願いします", "水をください", "お会計お願いします", "ありがとうございます"],
        correctAnswer: "メニューをお願いします",
        lessonId: "ja-2",
      },
      {
        id: "q-ja-2-2",
        type: "matching",
        question: "Match the Japanese phrases to their translations",
        pairs: [
          { word: "メニューをお願いします", translation: "Menu, please" },
          { word: "水をください", translation: "Please give me water" },
          { word: "お会計お願いします", translation: "The check, please" },
        ],
        correctAnswer: ["メニューをお願いします:Menu, please", "水をください:Please give me water", "お会計お願いします:The check, please"],
        lessonId: "ja-2",
      },
      {
        id: "q-ja-2-3",
        type: "free_text",
        question: "Translate 'Please wait' into Japanese.",
        correctAnswer: "お待ちください",
        lessonId: "ja-2",
      },
      {
        id: "q-ja-2-4",
        type: "sentence_builder",
        nativeSentence: "メニューをお願いします",
        targetWords: ["Menu", "please"],
        lessonId: "ja-2",
      },
    ],
  },
  // Japanese - Business Japanese (ja-3)
  {
    id: "quiz-ja-3-business",
    title: "Quiz - ビジネス日本語 (Bijinesu Nihongo)",
    language: "japanese",
    questions: [
      {
        id: "q-ja-3-1",
        type: "multiple_choice",
        question: "What is 'Let’s schedule a meeting' in Japanese?",
        options: ["会議を予定しましょう", "ご連絡お待ちしております", "よろしくお願いいたします", "ありがとうございました"],
        correctAnswer: "会議を予定しましょう",
        lessonId: "ja-3",
      },
      {
        id: "q-ja-3-2",
        type: "matching",
        question: "Match the Japanese phrases to their translations",
        pairs: [
          { word: "会議を予定しましょう", translation: "Let’s schedule a meeting" },
          { word: "ご連絡お待ちしております", translation: "I look forward to hearing from you" },
          { word: "よろしくお願いいたします", translation: "Best regards" },
        ],
        correctAnswer: ["会議を予定しましょう:Let’s schedule a meeting", "ご連絡お待ちしております:I look forward to hearing from you", "よろしくお願いいたします:Best regards"],
        lessonId: "ja-3",
      },
      {
        id: "q-ja-3-3",
        type: "free_text",
        question: "Translate 'Please confirm' into Japanese.",
        correctAnswer: "ご確認ください",
        lessonId: "ja-3",
      },
      {
        id: "q-ja-3-4",
        type: "sentence_builder",
        nativeSentence: "会議を予定しましょう",
        targetWords: ["Let’s", "schedule", "a", "meeting"],
        lessonId: "ja-3",
      },
    ],
  },

  // === CHINESE ===
  // Chinese - Greetings (zh-1)
  {
    id: "quiz-zh-1-greetings",
    title: "Quiz - 问候 (Wènhòu) in Chinese",
    language: "chinese",
    questions: [
      {
        id: "q-zh-1-1",
        type: "multiple_choice",
        question: "What is 'Hello' in Chinese?",
        options: ["再见", "你好", "晚安", "谢谢"],
        correctAnswer: "你好",
        lessonId: "zh-1",
      },
      {
        id: "q-zh-1-2",
        type: "matching",
        question: "Match the Chinese greetings to their translations",
        pairs: [
          { word: "你好", translation: "Hello" },
          { word: "早上好", translation: "Good morning" },
          { word: "再见", translation: "Goodbye" },
        ],
        correctAnswer: ["你好:Hello", "早上好:Good morning", "再见:Goodbye"],
        lessonId: "zh-1",
      },
      {
        id: "q-zh-1-3",
        type: "free_text",
        question: "Translate 'Thank you' into Chinese.",
        correctAnswer: "谢谢",
        lessonId: "zh-1",
      },
      {
        id: "q-zh-1-4",
        type: "sentence_builder",
        nativeSentence: "你好",
        targetWords: ["Hello"],
        lessonId: "zh-1",
      },
    ],
  },
  // Chinese - At the Restaurant (zh-2)
  {
    id: "quiz-zh-2-restaurant",
    title: "Quiz - 餐厅 (Cāntīng) in Chinese",
    language: "chinese",
    questions: [
      {
        id: "q-zh-2-1",
        type: "multiple_choice",
        question: "What is 'I want to order food' in Chinese?",
        options: ["我要点菜", "请给我菜单", "请结账", "谢谢你"],
        correctAnswer: "我要点菜",
        lessonId: "zh-2",
      },
      {
        id: "q-zh-2-2",
        type: "matching",
        question: "Match the Chinese phrases to their translations",
        pairs: [
          { word: "我要点菜", translation: "I want to order food" },
          { word: "请给我菜单", translation: "Please give me the menu" },
          { word: "请结账", translation: "Please bring the bill" },
        ],
        correctAnswer: ["我要点菜:I want to order food", "请给我菜单:Please give me the menu", "请结账:Please bring the bill"],
        lessonId: "zh-2",
      },
      {
        id: "q-zh-2-3",
        type: "free_text",
        question: "Translate 'Please wait' into Chinese.",
        correctAnswer: "请稍等",
        lessonId: "zh-2",
      },
      {
        id: "q-zh-2-4",
        type: "sentence_builder",
        nativeSentence: "我要点菜",
        targetWords: ["I", "want", "to", "order", "food"],
        lessonId: "zh-2",
      },
    ],
  },
  // Chinese - Business Chinese (zh-3)
  {
    id: "quiz-zh-3-business",
    title: "Quiz - 商务中文 (Shāngwù Zhōngwén)",
    language: "chinese",
    questions: [
      {
        id: "q-zh-3-1",
        type: "multiple_choice",
        question: "What is 'Let’s arrange a meeting' in Chinese?",
        options: ["我们安排一个会议", "期待您的回复", "此致敬礼", "非常感谢"],
        correctAnswer: "我们安排一个会议",
        lessonId: "zh-3",
      },
      {
        id: "q-zh-3-2",
        type: "matching",
        question: "Match the Chinese phrases to their translations",
        pairs: [
          { word: "我们安排一个会议", translation: "Let’s arrange a meeting" },
          { word: "期待您的回复", translation: "Looking forward to your reply" },
          { word: "此致敬礼", translation: "Sincerely" },
        ],
        correctAnswer: ["我们安排一个会议:Let’s arrange a meeting", "期待您的回复:Looking forward to your reply", "此致敬礼:Sincerely"],
        lessonId: "zh-3",
      },
      {
        id: "q-zh-3-3",
        type: "free_text",
        question: "Translate 'Thank you very much' into Chinese.",
        correctAnswer: "非常感谢",
        lessonId: "zh-3",
      },
      {
        id: "q-zh-3-4",
        type: "sentence_builder",
        nativeSentence: "我们安排一个会议",
        targetWords: ["Let’s", "arrange", "a", "meeting"],
        lessonId: "zh-3",
      },
    ],
  },

  // === KOREAN ===
  // Korean - Greetings (ko-1)
  {
    id: "quiz-ko-1-greetings",
    title: "Quiz - 인사 (Insa) in Korean",
    language: "korean",
    questions: [
      {
        id: "q-ko-1-1",
        type: "multiple_choice",
        question: "What is 'Hello' in Korean?",
        options: ["안녕히 가세요", "안녕하세요", "감사합니다", "안녕히 주무세요"],
        correctAnswer: "안녕하세요",
        lessonId: "ko-1",
      },
      {
        id: "q-ko-1-2",
        type: "matching",
        question: "Match the Korean greetings to their translations",
        pairs: [
          { word: "안녕하세요", translation: "Hello" },
          { word: "좋은 아침입니다", translation: "Good morning" },
          { word: "안녕히 가세요", translation: "Goodbye" },
        ],
        correctAnswer: ["안녕하세요:Hello", "좋은 아침입니다:Good morning", "안녕히 가세요:Goodbye"],
        lessonId: "ko-1",
      },
      {
        id: "q-ko-1-3",
        type: "free_text",
        question: "Translate 'Thank you' into Korean.",
        correctAnswer: "감사합니다",
        lessonId: "ko-1",
      },
      {
        id: "q-ko-1-4",
        type: "sentence_builder",
        nativeSentence: "안녕하세요",
        targetWords: ["Hello"],
        lessonId: "ko-1",
      },
    ],
  },
  // Korean - At the Restaurant (ko-2)
  {
    id: "quiz-ko-2-restaurant",
    title: "Quiz - 레스토랑 (Resutorang) in Korean",
    language: "korean",
    questions: [
      {
        id: "q-ko-2-1",
        type: "multiple_choice",
        question: "What is 'Menu, please' in Korean?",
        options: ["메뉴 주세요", "물 주세요", "계산서 주세요", "감사합니다"],
        correctAnswer: "메뉴 주세요",
        lessonId: "ko-2",
      },
      {
        id: "q-ko-2-2",
        type: "matching",
        question: "Match the Korean phrases to their translations",
        pairs: [
          { word: "메뉴 주세요", translation: "Menu, please" },
          { word: "물 주세요", translation: "Water, please" },
          { word: "계산서 주세요", translation: "Check, please" },
        ],
        correctAnswer: ["메뉴 주세요:Menu, please", "물 주세요:Water, please", "계산서 주세요:Check, please"],
        lessonId: "ko-2",
      },
      {
        id: "q-ko-2-3",
        type: "free_text",
        question: "Translate 'Please wait a moment' into Korean.",
        correctAnswer: "잠시만 기다리세요",
        lessonId: "ko-2",
      },
      {
        id: "q-ko-2-4",
        type: "sentence_builder",
        nativeSentence: "메뉴 주세요",
        targetWords: ["Menu", "please"],
        lessonId: "ko-2",
      },
    ],
  },
  // Korean - Business Korean (ko-3)
  {
    id: "quiz-ko-3-business",
    title: "Quiz - 비즈니스 한국어 (Bijiseu Hangukeo)",
    language: "korean",
    questions: [
      {
        id: "q-ko-3-1",
        type: "multiple_choice",
        question: "What is 'Let’s schedule a meeting' in Korean?",
        options: ["회의를 일정 잡읍시다", "회신 기다리겠습니다", "감사합니다", "대단히 감사합니다"],
        correctAnswer: "회의를 일정 잡읍시다",
        lessonId: "ko-3",
      },
      {
        id: "q-ko-3-2",
        type: "matching",
        question: "Match the Korean phrases to their translations",
        pairs: [
          { word: "회의를 일정 잡읍시다", translation: "Let’s schedule a meeting" },
          { word: "회신 기다리겠습니다", translation: "I’ll wait for your reply" },
          { word: "감사합니다", translation: "Thank you / Sincerely" },
        ],
        correctAnswer: ["회의를 일정 잡읍시다:Let’s schedule a meeting", "회신 기다리겠습니다:I’ll wait for your reply", "감사합니다:Thank you / Sincerely"],
        lessonId: "ko-3",
      },
      {
        id: "q-ko-3-3",
        type: "free_text",
        question: "Translate 'Thank you very much' into Korean.",
        correctAnswer: "대단히 감사합니다",
        lessonId: "ko-3",
      },
      {
        id: "q-ko-3-4",
        type: "sentence_builder",
        nativeSentence: "회의를 일정 잡읍시다",
        targetWords: ["Let’s", "schedule", "a", "meeting"],
        lessonId: "ko-3",
      },
    ],
  },
];