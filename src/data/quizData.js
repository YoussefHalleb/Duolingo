export const quizData = [
  // Français - Basics 1 (fr-1)
  {
    id: "quiz-fr-1-greetings",
    title: "Quiz - Salutations en Français",
    language: "français",
    questions: [
      {
        id: "q-fr-1-1",
        type: "multiple_choice",
        question: "Comment dit-on 'Good evening' en français ?",
        options: ["Bonjour", "Bonsoir", "Au revoir", "Bonne journée"],
        correctAnswer: "Bonsoir",
        lessonId: "fr-1",
      },
      {
        id: "q-fr-1-2",
        type: "matching",
        question: "Associez les salutations aux traductions",
        pairs: [
          { word: "Bonjour", translation: "Hello" },
          { word: "Au revoir", translation: "Goodbye" },
          { word: "À bientôt", translation: "See you soon" },
        ],
        correctAnswer: ["Bonjour:Hello", "Au revoir:Goodbye", "À bientôt:See you soon"],
        lessonId: "fr-1",
      },
      {
        id: "q-fr-1-3",
        type: "free_text",
        question: "Traduisez 'Nice to meet you' en français.",
        correctAnswer: "Enchanté",
        lessonId: "fr-1",
      },
    ],
  },
  {
    id: "quiz-fr-1-introductions",
    title: "Quiz - Présentations en Français",
    language: "français",
    questions: [
      {
        id: "q-fr-1-4",
        type: "multiple_choice",
        question: "Comment demander 'How are you?' en français ?",
        options: ["D'où venez-vous?", "Comment allez-vous?", "Je m'appelle...", "Enchanté"],
        correctAnswer: "Comment allez-vous?",
        lessonId: "fr-1",
      },
      {
        id: "q-fr-1-5",
        type: "matching",
        question: "Associez les phrases d'introduction",
        pairs: [
          { word: "Je m'appelle", translation: "My name is" },
          { word: "Comment allez-vous?", translation: "How are you?" },
        ],
        correctAnswer: ["Je m'appelle:My name is", "Comment allez-vous?:How are you?"],
        lessonId: "fr-1",
      },
      {
        id: "q-fr-1-6",
        type: "free_text",
        question: "Traduisez 'I'm fine, thank you' en français.",
        correctAnswer: "Je vais bien, merci",
        lessonId: "fr-1",
      },
    ],
  },
  {
    id: "quiz-fr-2-food",
    title: "Quiz - Nourriture en Français",
    language: "français",
    questions: [
      {
        id: "q-fr-2-1",
        type: "multiple_choice",
        question: "Comment dit-on 'I'm hungry' en français ?",
        options: ["C'est délicieux", "J'ai faim", "Bon appétit", "Je voudrais..."],
        correctAnswer: "J'ai faim",
        lessonId: "fr-2",
      },
      {
        id: "q-fr-2-2",
        type: "matching",
        question: "Associez les mots de nourriture",
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
        question: "Traduisez 'It's delicious' en français.",
        correctAnswer: "C'est délicieux",
        lessonId: "fr-2",
      },
    ],
  },

  // Espagnol - Greetings (es-1)
  {
    id: "quiz-es-1-greetings",
    title: "Quiz - Saludos en Español",
    language: "español",
    questions: [
      {
        id: "q-es-1-1",
        type: "multiple_choice",
        question: "Comment dit-on 'Good night' en espagnol ?",
        options: ["¡Hola!", "Buenos días", "Buenas noches", "Adiós"],
        correctAnswer: "Buenas noches",
        lessonId: "es-1",
      },
      {
        id: "q-es-1-2",
        type: "matching",
        question: "Associez les salutations",
        pairs: [
          { word: "¡Hola!", translation: "Hello" },
          { word: "Adiós", translation: "Goodbye" },
          { word: "¡Hasta luego!", translation: "See you later" },
        ],
        correctAnswer: ["¡Hola!:Hello", "Adiós:Goodbye", "¡Hasta luego!:See you later"],
        lessonId: "es-1",
      },
      {
        id: "q-es-1-3",
        type: "free_text",
        question: "Traduisez 'Nice to meet you' en espagnol.",
        correctAnswer: "Mucho gusto",
        lessonId: "es-1",
      },
    ],
  },

  // English - Greetings (based on fr-1 lesson structure)
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
        lessonId: "fr-1", // Reused for English greetings
      },
      {
        id: "q-en-1-2",
        type: "matching",
        question: "Match the greetings",
        pairs: [
          { word: "Hello", translation: "Bonjour" },
          { word: "Goodbye", translation: "Au revoir" },
        ],
        correctAnswer: ["Hello:Bonjour", "Goodbye:Au revoir"],
        lessonId: "fr-1",
      },
      {
        id: "q-en-1-3",
        type: "free_text",
        question: "Translate 'Enchanté' into English.",
        correctAnswer: "Nice to meet you",
        lessonId: "fr-1",
      },
    ],
  },

  // Spanish - Introductions (based on es-1 lesson structure)
  {
    id: "quiz-es-1-introductions",
    title: "Quiz - Presentaciones en Español",
    language: "español",
    questions: [
      {
        id: "q-es-1-4",
        type: "multiple_choice",
        question: "Comment demander 'How are you?' en espagnol ?",
        options: ["¿De dónde eres?", "¿Cómo estás?", "Me llamo...", "Mucho gusto"],
        correctAnswer: "¿Cómo estás?",
        lessonId: "es-1",
      },
      {
        id: "q-es-1-5",
        type: "matching",
        question: "Associez les introductions",
        pairs: [
          { word: "Me llamo", translation: "My name is" },
          { word: "¿Cómo estás?", translation: "How are you?" },
        ],
        correctAnswer: ["Me llamo:My name is", "¿Cómo estás?:How are you?"],
        lessonId: "es-1",
      },
      {
        id: "q-es-1-6",
        type: "free_text",
        question: "Traduisez 'I'm fine, thanks' en espagnol.",
        correctAnswer: "Estoy bien, gracias",
        lessonId: "es-1",
      },
    ],
  },

  // German - Greetings (based on fr-1 lesson structure)
  {
    id: "quiz-de-1-greetings",
    title: "Quiz - Grüße auf Deutsch",
    language: "deutsch",
    questions: [
      {
        id: "q-de-1-1",
        type: "multiple_choice",
        question: "What is 'Bonjour' in German?",
        options: ["Hallo", "Gute Nacht", "Auf Wiedersehen", "Danke"],
        correctAnswer: "Hallo",
        lessonId: "fr-1",
      },
      {
        id: "q-de-1-2",
        type: "matching",
        question: "Match the greetings",
        pairs: [
          { word: "Hallo", translation: "Hello" },
          { word: "Auf Wiedersehen", translation: "Goodbye" },
        ],
        correctAnswer: ["Hallo:Hello", "Auf Wiedersehen:Goodbye"],
        lessonId: "fr-1",
      },
      {
        id: "q-de-1-3",
        type: "free_text",
        question: "Translate 'Nice to meet you' into German.",
        correctAnswer: "Freut mich",
        lessonId: "fr-1",
      },
    ],
  },

  // Italian - Greetings (based on fr-1 lesson structure)
  {
    id: "quiz-it-1-greetings",
    title: "Quiz - Saluti in Italiano",
    language: "italiano",
    questions: [
      {
        id: "q-it-1-1",
        type: "multiple_choice",
        question: "What is 'Bonjour' in Italian?",
        options: ["Ciao", "Buonanotte", "Arrivederci", "Grazie"],
        correctAnswer: "Ciao",
        lessonId: "fr-1",
      },
      {
        id: "q-it-1-2",
        type: "matching",
        question: "Match the greetings",
        pairs: [
          { word: "Ciao", translation: "Hello" },
          { word: "Arrivederci", translation: "Goodbye" },
        ],
        correctAnswer: ["Ciao:Hello", "Arrivederci:Goodbye"],
        lessonId: "fr-1",
      },
      {
        id: "q-it-1-3",
        type: "free_text",
        question: "Translate 'Nice to meet you' into Italian.",
        correctAnswer: "Piacere",
        lessonId: "fr-1",
      },
    ],
  },

  // Japanese - Greetings (based on fr-1 lesson structure)
  {
    id: "quiz-ja-1-greetings",
    title: "Quiz - 挨拶 (Aisatsu) in Japanese",
    language: "japanese",
    questions: [
      {
        id: "q-ja-1-1",
        type: "multiple_choice",
        question: "What is 'Bonjour' in Japanese?",
        options: ["こんにちは", "おやすみなさい", "さようなら", "ありがとう"],
        correctAnswer: "こんにちは",
        lessonId: "fr-1",
      },
      {
        id: "q-ja-1-2",
        type: "matching",
        question: "Match the greetings",
        pairs: [
          { word: "こんにちは", translation: "Hello" },
          { word: "さようなら", translation: "Goodbye" },
        ],
        correctAnswer: ["こんにちは:Hello", "さようなら:Goodbye"],
        lessonId: "fr-1",
      },
      {
        id: "q-ja-1-3",
        type: "free_text",
        question: "Translate 'Nice to meet you' into Japanese.",
        correctAnswer: "はじめまして",
        lessonId: "fr-1",
      },
    ],
  },

  // Chinese - Greetings (based on fr-1 lesson structure)
  {
    id: "quiz-zh-1-greetings",
    title: "Quiz - 问候 (Wènhòu) in Chinese",
    language: "chinese",
    questions: [
      {
        id: "q-zh-1-1",
        type: "multiple_choice",
        question: "What is 'Bonjour' in Chinese?",
        options: ["你好", "晚安", "再见", "谢谢"],
        correctAnswer: "你好",
        lessonId: "fr-1",
      },
      {
        id: "q-zh-1-2",
        type: "matching",
        question: "Match the greetings",
        pairs: [
          { word: "你好", translation: "Hello" },
          { word: "再见", translation: "Goodbye" },
        ],
        correctAnswer: ["你好:Hello", "再见:Goodbye"],
        lessonId: "fr-1",
      },
      {
        id: "q-zh-1-3",
        type: "free_text",
        question: "Translate 'Nice to meet you' into Chinese.",
        correctAnswer: "很高兴认识你",
        lessonId: "fr-1",
      },
    ],
  },

  // Korean - Greetings (based on fr-1 lesson structure)
  {
    id: "quiz-ko-1-greetings",
    title: "Quiz - 인사 (Insa) in Korean",
    language: "korean",
    questions: [
      {
        id: "q-ko-1-1",
        type: "multiple_choice",
        question: "What is 'Bonjour' in Korean?",
        options: ["안녕하세요", "안녕히 주무세요", "안녕히 가세요", "감사합니다"],
        correctAnswer: "안녕하세요",
        lessonId: "fr-1",
      },
      {
        id: "q-ko-1-2",
        type: "matching",
        question: "Match the greetings",
        pairs: [
          { word: "안녕하세요", translation: "Hello" },
          { word: "안녕히 가세요", translation: "Goodbye" },
        ],
        correctAnswer: ["안녕하세요:Hello", "안녕히 가세요:Goodbye"],
        lessonId: "fr-1",
      },
      {
        id: "q-ko-1-3",
        type: "free_text",
        question: "Translate 'Nice to meet you' into Korean.",
        correctAnswer: "만나서 반갑습니다",
        lessonId: "fr-1",
      },
    ],
  },

  // Portuguese - Greetings (based on fr-1 lesson structure)
  {
    id: "quiz-pt-1-greetings",
    title: "Quiz - Saudações em Português",
    language: "português",
    questions: [
      {
        id: "q-pt-1-1",
        type: "multiple_choice",
        question: "What is 'Bonjour' in Portuguese?",
        options: ["Olá", "Boa noite", "Adeus", "Obrigado"],
        correctAnswer: "Olá",
        lessonId: "fr-1",
      },
      {
        id: "q-pt-1-2",
        type: "matching",
        question: "Match the greetings",
        pairs: [
          { word: "Olá", translation: "Hello" },
          { word: "Adeus", translation: "Goodbye" },
        ],
        correctAnswer: ["Olá:Hello", "Adeus:Goodbye"],
        lessonId: "fr-1",
      },
      {
        id: "q-pt-1-3",
        type: "free_text",
        question: "Translate 'Nice to meet you' into Portuguese.",
        correctAnswer: "Prazer em conhecê-lo",
        lessonId: "fr-1",
      },
    ],
  },

  // Dutch - Greetings (based on fr-1 lesson structure)
  {
    id: "quiz-nl-1-greetings",
    title: "Quiz - Groeten in Nederlands",
    language: "nederlands",
    questions: [
      {
        id: "q-nl-1-1",
        type: "multiple_choice",
        question: "What is 'Bonjour' in Dutch?",
        options: ["Hallo", "Goedenacht", "Tot ziens", "Dank je wel"],
        correctAnswer: "Hallo",
        lessonId: "fr-1",
      },
      {
        id: "q-nl-1-2",
        type: "matching",
        question: "Match the greetings",
        pairs: [
          { word: "Hallo", translation: "Hello" },
          { word: "Tot ziens", translation: "Goodbye" },
        ],
        correctAnswer: ["Hallo:Hello", "Tot ziens:Goodbye"],
        lessonId: "fr-1",
      },
      {
        id: "q-nl-1-3",
        type: "free_text",
        question: "Translate 'Nice to meet you' into Dutch.",
        correctAnswer: "Aangenaam",
        lessonId: "fr-1",
      },
    ],
  },

  // Russian - Greetings (based on fr-1 lesson structure)
  {
    id: "quiz-ru-1-greetings",
    title: "Quiz - Приветствия на русском",
    language: "русский",
    questions: [
      {
        id: "q-ru-1-1",
        type: "multiple_choice",
        question: "What is 'Bonjour' in Russian?",
        options: ["Здравствуйте", "Спокойной ночи", "До свидания", "Спасибо"],
        correctAnswer: "Здравствуйте",
        lessonId: "fr-1",
      },
      {
        id: "q-ru-1-2",
        type: "matching",
        question: "Match the greetings",
        pairs: [
          { word: "Здравствуйте", translation: "Hello" },
          { word: "До свидания", translation: "Goodbye" },
        ],
        correctAnswer: ["Здравствуйте:Hello", "До свидания:Goodbye"],
        lessonId: "fr-1",
      },
      {
        id: "q-ru-1-3",
        type: "free_text",
        question: "Translate 'Nice to meet you' into Russian.",
        correctAnswer: "Приятно познакомиться",
        lessonId: "fr-1",
      },
    ],
  },
];