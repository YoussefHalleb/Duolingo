// src/data/lessonData.js
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
      { phrase: 'Hello', translation: 'salut', audio: '/audio/en-1-0.mp3' },
      { phrase: 'Good morning', translation: 'Bonjour', audio: '/audio/en-1-1.mp3' },
      { phrase: 'Goodbye', translation: 'Au revoir', audio: '/audio/en-1-2.mp3' },
      { phrase: 'Thank you', translation: 'Merci', audio: '/audio/en-1-3.mp3' },
      { phrase: 'Please', translation: 'S\'il te plaît', audio: '/audio/en-1-4.mp3' }
    ]
  },
  {
    id: 'en-2',
    language: 'english',
    title: 'Ordering Food',
    category: 'Intermediate',
    image: '/flags/royaume-uni.png',
    summary: 'Learn to order food in English restaurants.',
    phrases: [
      { phrase: 'I would like a sandwich', translation: 'Je voudrais un sandwich', audio: '/audio/en-2-0.mp3' },
      { phrase: 'Can I see the menu?', translation: 'Puis-je voir le menu ?', audio: '/audio/en-2-1.mp3' },
      { phrase: 'The bill, please.', translation: 'L’addition, s’il vous plaît.', audio: '/audio/en-2-2.mp3' },
      { phrase: 'Thank you', translation: 'Merci', audio: '/audio/en-2-3.mp3' },
      { phrase: 'Please wait', translation: 'Attendez, s’il vous plaît', audio: '/audio/en-2-4.mp3' }
    ]
  },
  {
    id: 'en-3',
    language: 'english',
    title: 'Business English',
    category: 'Advanced',
    image: '/flags/royaume-uni.png',
    summary: 'Improve your formal English for meetings and emails.',
    phrases: [
      { phrase: 'Let’s schedule a meeting', translation: 'Planifions une réunion', audio: '/audio/en-3-0.mp3' },
      { phrase: 'I look forward to your reply', translation: 'J’attends votre réponse avec impatience', audio: '/audio/en-3-1.mp3' },
      { phrase: 'Best regards', translation: 'Cordialement', audio: '/audio/en-3-2.mp3' },
      { phrase: 'Thank you for your time', translation: 'Merci pour votre temps', audio: '/audio/en-3-3.mp3' },
      { phrase: 'Please confirm', translation: 'Veuillez confirmer', audio: '/audio/en-3-4.mp3' }
    ]
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
      { phrase: 'Hallo', translation: 'Hello', audio: '/audio/de-1-0.mp3' },
      { phrase: 'Guten Morgen', translation: 'Good morning', audio: '/audio/de-1-1.mp3' },
      { phrase: 'Tschüss', translation: 'Bye', audio: '/audio/de-1-2.mp3' },
      { phrase: 'Danke', translation: 'Thank you', audio: '/audio/de-1-3.mp3' },
      { phrase: 'Bitte', translation: 'Please', audio: '/audio/de-1-4.mp3' }
    ]
  },
  {
    id: 'de-2',
    language: 'german',
    title: 'Shopping',
    category: 'Intermediate',
    image: '/flags/allemagne.png',
    summary: 'Useful phrases for shopping in Germany.',
    phrases: [
      { phrase: 'Wie viel kostet das?', translation: 'How much is that?', audio: '/audio/de-2-0.mp3' },
      { phrase: 'Ich möchte das kaufen', translation: 'I want to buy this', audio: '/audio/de-2-1.mp3' },
      { phrase: 'Karte oder bar?', translation: 'Card or cash?', audio: '/audio/de-2-2.mp3' },
      { phrase: 'Danke schön', translation: 'Thank you very much', audio: '/audio/de-2-3.mp3' },
      { phrase: 'Bitte warten', translation: 'Please wait', audio: '/audio/de-2-4.mp3' }
    ]
  },
  {
    id: 'de-3',
    language: 'german',
    title: 'Formal Conversation',
    category: 'Advanced',
    image: '/flags/allemagne.png',
    summary: 'Speak professionally in German settings.',
    phrases: [
      { phrase: 'Könnten Sie das bitte wiederholen?', translation: 'Could you please repeat that?', audio: '/audio/de-3-0.mp3' },
      { phrase: 'Ich freue mich auf die Zusammenarbeit', translation: 'I look forward to working together', audio: '/audio/de-3-1.mp3' },
      { phrase: 'Mit freundlichen Grüßen', translation: 'Sincerely', audio: '/audio/de-3-2.mp3' },
      { phrase: 'Vielen Dank', translation: 'Many thanks', audio: '/audio/de-3-3.mp3' },
      { phrase: 'Bitte bestätigen', translation: 'Please confirm', audio: '/audio/de-3-4.mp3' }
    ]
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
      { phrase: 'Ciao', translation: 'Hi/Bye', audio: '/audio/it-1-0.mp3' },
      { phrase: 'Buongiorno', translation: 'Good morning', audio: '/audio/it-1-1.mp3' },
      { phrase: 'Arrivederci', translation: 'Goodbye', audio: '/audio/it-1-2.mp3' },
      { phrase: 'Grazie', translation: 'Thank you', audio: '/audio/it-1-3.mp3' },
      { phrase: 'Per favore', translation: 'Please', audio: '/audio/it-1-4.mp3' }
    ]
  },
  {
    id: 'it-2',
    language: 'italian',
    title: 'At the Airport',
    category: 'Intermediate',
    image: '/flags/italie.png',
    summary: 'Common phrases used at the airport.',
    phrases: [
      { phrase: 'Dove è il gate?', translation: 'Where is the gate?', audio: '/audio/it-2-0.mp3' },
      { phrase: 'Ho perso il mio bagaglio', translation: 'I lost my luggage', audio: '/audio/it-2-1.mp3' },
      { phrase: 'Questo è il mio passaporto', translation: 'This is my passport', audio: '/audio/it-2-2.mp3' },
      { phrase: 'Grazie mille', translation: 'Thank you very much', audio: '/audio/it-2-3.mp3' },
      { phrase: 'Aspetta un momento', translation: 'Wait a moment', audio: '/audio/it-2-4.mp3' }
    ]
  },
  {
    id: 'it-3',
    language: 'italian',
    title: 'Cultural Expressions',
    category: 'Advanced',
    image: '/flags/italie.png',
    summary: 'Understand Italian idiomatic expressions.',
    phrases: [
      { phrase: 'In bocca al lupo', translation: 'Good luck', audio: '/audio/it-3-0.mp3' },
      { phrase: 'Chi dorme non piglia pesci', translation: 'You snooze, you lose', audio: '/audio/it-3-1.mp3' },
      { phrase: 'È acqua passata', translation: 'It’s water under the bridge', audio: '/audio/it-3-2.mp3' },
      { phrase: 'Grazie ancora', translation: 'Thanks again', audio: '/audio/it-3-3.mp3' },
      { phrase: 'Per piacere', translation: 'Please', audio: '/audio/it-3-4.mp3' }
    ]
  },

  // === FRENCH ===
  {
    id: 'fr-1',
    language: 'french',
    title: 'Greetings',
    category: 'Beginner',
    image: '/flags/la-france.png',
    summary: 'Learn basic French greetings.',
    phrases: [
      { phrase: 'Bonjour', translation: 'Hello', audio: '/audio/fr-1-0.mp3' },
      { phrase: 'Bonsoir', translation: 'Good evening', audio: '/audio/fr-1-1.mp3' },
      { phrase: 'Au revoir', translation: 'Goodbye', audio: '/audio/fr-1-2.mp3' },
      { phrase: 'Merci', translation: 'Thank you', audio: '/audio/fr-1-3.mp3' },
      { phrase: 'S\'il vous plaît', translation: 'Please', audio: '/audio/fr-1-4.mp3' }
    ]
  },
  {
    id: 'fr-2',
    language: 'french',
    title: 'Food',
    category: 'Intermediate',
    image: '/flags/la-france.png',
    summary: 'Discover vocabulary related to food and meals.',
    phrases: [
      { phrase: 'Pain', translation: 'Bread', audio: '/audio/fr-2-0.mp3' },
      { phrase: 'Vin', translation: 'Wine', audio: '/audio/fr-2-1.mp3' },
      { phrase: 'Fromage', translation: 'Cheese', audio: '/audio/fr-2-2.mp3' },
      { phrase: 'Merci beaucoup', translation: 'Thank you very much', audio: '/audio/fr-2-3.mp3' },
      { phrase: 'Attendez', translation: 'Wait', audio: '/audio/fr-2-4.mp3' }
    ]
  },
  {
    id: 'fr-3',
    language: 'french',
    title: 'Travel',
    category: 'Intermediate',
    image: '/flags/la-france.png',
    summary: 'Learn useful phrases for traveling in French.',
    phrases: [
      { phrase: 'Où est la gare ?', translation: 'Where is the train station?', audio: '/audio/fr-3-0.mp3' },
      { phrase: 'Un billet, s\'il vous plaît.', translation: 'One ticket, please.', audio: '/audio/fr-3-1.mp3' },
      { phrase: 'Je voudrais une chambre.', translation: 'I would like a room.', audio: '/audio/fr-3-2.mp3' },
      { phrase: 'Merci bien', translation: 'Thank you kindly', audio: '/audio/fr-3-3.mp3' },
      { phrase: 'Veuillez attendre', translation: 'Please wait', audio: '/audio/fr-3-4.mp3' }
    ]
  },

  // === SPANISH ===
  {
    id: 'es-1',
    language: 'spanish',
    title: 'Greetings',
    category: 'Beginner',
    image: '/flags/monde.png',
    summary: 'Master basic Spanish greetings.',
    phrases: [
      { phrase: 'Hola', translation: 'Hello', audio: '/audio/es-1-0.mp3' },
      { phrase: 'Gracias', translation: 'Thank you', audio: '/audio/es-1-1.mp3' },
      { phrase: 'Me llamo...', translation: 'My name is...', audio: '/audio/es-1-2.mp3' },
      { phrase: 'Buenos días', translation: 'Good morning', audio: '/audio/es-1-3.mp3' },
      { phrase: 'Por favor', translation: 'Please', audio: '/audio/es-1-4.mp3' }
    ]
  },
  {
    id: 'es-2',
    language: 'spanish',
    title: 'Food',
    category: 'Intermediate',
    image: '/flags/monde.png',
    summary: 'Learn vocabulary related to food.',
    phrases: [
      { phrase: 'Pan', translation: 'Bread', audio: '/audio/es-2-0.mp3' },
      { phrase: 'Vino', translation: 'Wine', audio: '/audio/es-2-1.mp3' },
      { phrase: 'Queso', translation: 'Cheese', audio: '/audio/es-2-2.mp3' },
      { phrase: 'Gracias de nuevo', translation: 'Thank you again', audio: '/audio/es-2-3.mp3' },
      { phrase: 'Espere un momento', translation: 'Wait a moment', audio: '/audio/es-2-4.mp3' }
    ]
  },
  {
    id: 'es-3',
    language: 'spanish',
    title: 'Travel',
    category: 'Intermediate',
    image: '/flags/monde.png',
    summary: 'Useful phrases for traveling in Spanish.',
    phrases: [
      { phrase: '¿Dónde está la estación?', translation: 'Where is the station?', audio: '/audio/es-3-0.mp3' },
      { phrase: 'Un billete, por favor.', translation: 'One ticket, please.', audio: '/audio/es-3-1.mp3' },
      { phrase: 'Quiero una habitación.', translation: 'I want a room.', audio: '/audio/es-3-2.mp3' },
      { phrase: 'Muchas gracias', translation: 'Thank you very much', audio: '/audio/es-3-3.mp3' },
      { phrase: 'Por favor, espera', translation: 'Please wait', audio: '/audio/es-3-4.mp3' }
    ]
  },

  // === PORTUGUESE ===
  {
    id: 'pt-1',
    language: 'portuguese',
    title: 'Greetings',
    category: 'Beginner',
    image: '/flags/le-portugal.png',
    summary: 'Learn basic Portuguese greetings.',
    phrases: [
      { phrase: 'Olá', translation: 'Hello', audio: '/audio/pt-1-0.mp3' },
      { phrase: 'Bom dia', translation: 'Good morning', audio: '/audio/pt-1-1.mp3' },
      { phrase: 'Tchau', translation: 'Goodbye', audio: '/audio/pt-1-2.mp3' },
      { phrase: 'Obrigado', translation: 'Thank you', audio: '/audio/pt-1-3.mp3' },
      { phrase: 'Por favor', translation: 'Please', audio: '/audio/pt-1-4.mp3' }
    ]
  },
  {
    id: 'pt-2',
    language: 'portuguese',
    title: 'At the Restaurant',
    category: 'Intermediate',
    image: '/flags/le-portugal.png',
    summary: 'Useful phrases for dining out in Portugal.',
    phrases: [
      { phrase: 'Eu gostaria de um café', translation: 'I would like a coffee', audio: '/audio/pt-2-0.mp3' },
      { phrase: 'Pode me trazer o cardápio?', translation: 'Can you bring me the menu?', audio: '/audio/pt-2-1.mp3' },
      { phrase: 'A conta, por favor.', translation: 'The bill, please.', audio: '/audio/pt-2-2.mp3' },
      { phrase: 'Obrigado pela ajuda', translation: 'Thank you for the help', audio: '/audio/pt-2-3.mp3' },
      { phrase: 'Aguarde um momento', translation: 'Wait a moment', audio: '/audio/pt-2-4.mp3' }
    ]
  },
  {
    id: 'pt-3',
    language: 'portuguese',
    title: 'Business',
    category: 'Advanced',
    image: '/flags/le-portugal.png',
    summary: 'Communicate formally in work situations.',
    phrases: [
      { phrase: 'Vamos agendar uma reunião', translation: 'Let’s schedule a meeting', audio: '/audio/pt-3-0.mp3' },
      { phrase: 'Aguardo seu retorno', translation: 'I look forward to your response', audio: '/audio/pt-3-1.mp3' },
      { phrase: 'Atenciosamente', translation: 'Best regards', audio: '/audio/pt-3-2.mp3' },
      { phrase: 'Muito obrigado', translation: 'Thank you very much', audio: '/audio/pt-3-3.mp3' },
      { phrase: 'Por favor, confirme', translation: 'Please confirm', audio: '/audio/pt-3-4.mp3' }
    ]
  },

  // === DUTCH ===
  {
    id: 'nl-1',
    language: 'dutch',
    title: 'Greetings',
    category: 'Beginner',
    image: '/flags/pays-bas.png',
    summary: 'Learn basic Dutch greetings.',
    phrases: [
      { phrase: 'Hallo', translation: 'Hello', audio: '/audio/nl-1-0.mp3' },
      { phrase: 'Goedemorgen', translation: 'Good morning', audio: '/audio/nl-1-1.mp3' },
      { phrase: 'Tot ziens', translation: 'Goodbye', audio: '/audio/nl-1-2.mp3' },
      { phrase: 'Dank je', translation: 'Thank you', audio: '/audio/nl-1-3.mp3' },
      { phrase: 'Alsjeblieft', translation: 'Please', audio: '/audio/nl-1-4.mp3' }
    ]
  },
  {
    id: 'nl-2',
    language: 'dutch',
    title: 'In the Shop',
    category: 'Intermediate',
    image: '/flags/pays-bas.png',
    summary: 'Phrases useful for shopping.',
    phrases: [
      { phrase: 'Hoeveel kost dit?', translation: 'How much does this cost?', audio: '/audio/nl-2-0.mp3' },
      { phrase: 'Ik wil dit graag kopen', translation: 'I would like to buy this', audio: '/audio/nl-2-1.mp3' },
      { phrase: 'Kan ik met kaart betalen?', translation: 'Can I pay by card?', audio: '/audio/nl-2-2.mp3' },
      { phrase: 'Dank u wel', translation: 'Thank you very much', audio: '/audio/nl-2-3.mp3' },
      { phrase: 'Wacht even', translation: 'Wait a moment', audio: '/audio/nl-2-4.mp3' }
    ]
  },
  {
    id: 'nl-3',
    language: 'dutch',
    title: 'Business Communication',
    category: 'Advanced',
    image: '/flags/pays-bas.png',
    summary: 'Use formal expressions for work and emails.',
    phrases: [
      { phrase: 'Laten we een afspraak maken', translation: 'Let’s make an appointment', audio: '/audio/nl-3-0.mp3' },
      { phrase: 'Ik zie uw reactie graag tegemoet', translation: 'I look forward to your response', audio: '/audio/nl-3-1.mp3' },
      { phrase: 'Met vriendelijke groet', translation: 'Kind regards', audio: '/audio/nl-3-2.mp3' },
      { phrase: 'Hartelijk dank', translation: 'Heartfelt thanks', audio: '/audio/nl-3-3.mp3' },
      { phrase: 'Bevestig alstublieft', translation: 'Please confirm', audio: '/audio/nl-3-4.mp3' }
    ]
  },

  // === RUSSIAN ===
  {
    id: 'ru-1',
    language: 'russian',
    title: 'Greetings',
    category: 'Beginner',
    image: '/flags/rusia.png',
    summary: 'Learn basic Russian greetings.',
    phrases: [
      { phrase: 'Привет', translation: 'Hi', audio: '/audio/ru-1-0.mp3' },
      { phrase: 'Доброе утро', translation: 'Good morning', audio: '/audio/ru-1-1.mp3' },
      { phrase: 'До свидания', translation: 'Goodbye', audio: '/audio/ru-1-2.mp3' },
      { phrase: 'Спасибо', translation: 'Thank you', audio: '/audio/ru-1-3.mp3' },
      { phrase: 'Пожалуйста', translation: 'Please', audio: '/audio/ru-1-4.mp3' }
    ]
  },
  {
    id: 'ru-2',
    language: 'russian',
    title: 'At the Café',
    category: 'Intermediate',
    image: '/flags/rusia.png',
    summary: 'Phrases for visiting a café or restaurant.',
    phrases: [
      { phrase: 'Можно меню, пожалуйста?', translation: 'Can I see the menu, please?', audio: '/audio/ru-2-0.mp3' },
      { phrase: 'Я хочу чай', translation: 'I want tea', audio: '/audio/ru-2-1.mp3' },
      { phrase: 'Счёт, пожалуйста.', translation: 'The bill, please.', audio: '/audio/ru-2-2.mp3' },
      { phrase: 'Большое спасибо', translation: 'Thank you very much', audio: '/audio/ru-2-3.mp3' },
      { phrase: 'Подождите', translation: 'Wait', audio: '/audio/ru-2-4.mp3' }
    ]
  },
  {
    id: 'ru-3',
    language: 'russian',
    title: 'Business Russian',
    category: 'Advanced',
    image: '/flags/rusia.png',
    summary: 'Formal expressions for work.',
    phrases: [
      { phrase: 'Давайте назначим встречу', translation: 'Let’s schedule a meeting', audio: '/audio/ru-3-0.mp3' },
      { phrase: 'Жду вашего ответа', translation: 'I await your reply', audio: '/audio/ru-3-1.mp3' },
      { phrase: 'С уважением', translation: 'Sincerely', audio: '/audio/ru-3-2.mp3' },
      { phrase: 'Спасибо большое', translation: 'Thank you very much', audio: '/audio/ru-3-3.mp3' },
      { phrase: 'Пожалуйста, подтвердите', translation: 'Please confirm', audio: '/audio/ru-3-4.mp3' }
    ]
  },

  // === JAPANESE ===
  {
    id: 'ja-1',
    language: 'japanese',
    title: 'Greetings',
    category: 'Beginner',
    image: '/flags/japon.png',
    summary: 'Learn basic Japanese greetings.',
    phrases: [
      { phrase: 'こんにちは', translation: 'Hello', audio: '/audio/ja-1-0.mp3' },
      { phrase: 'おはようございます', translation: 'Good morning', audio: '/audio/ja-1-1.mp3' },
      { phrase: 'さようなら', translation: 'Goodbye', audio: '/audio/ja-1-2.mp3' },
      { phrase: 'ありがとう', translation: 'Thank you', audio: '/audio/ja-1-3.mp3' },
      { phrase: 'お願いします', translation: 'Please', audio: '/audio/ja-1-4.mp3' }
    ]
  },
  {
    id: 'ja-2',
    language: 'japanese',
    title: 'At the Restaurant',
    category: 'Intermediate',
    image: '/flags/japon.png',
    summary: 'Expressions useful in restaurants.',
    phrases: [
      { phrase: 'メニューをお願いします', translation: 'Menu, please', audio: '/audio/ja-2-0.mp3' },
      { phrase: '水をください', translation: 'Please give me water', audio: '/audio/ja-2-1.mp3' },
      { phrase: 'お会計お願いします', translation: 'The check, please', audio: '/audio/ja-2-2.mp3' },
      { phrase: 'ありがとうございます', translation: 'Thank you very much', audio: '/audio/ja-2-3.mp3' },
      { phrase: 'お待ちください', translation: 'Please wait', audio: '/audio/ja-2-4.mp3' }
    ]
  },
  {
    id: 'ja-3',
    language: 'japanese',
    title: 'Business Japanese',
    category: 'Advanced',
    image: '/flags/japon.png',
    summary: 'Polite expressions for meetings and emails.',
    phrases: [
      { phrase: '会議を予定しましょう', translation: 'Let’s schedule a meeting', audio: '/audio/ja-3-0.mp3' },
      { phrase: 'ご連絡お待ちしております', translation: 'I look forward to hearing from you', audio: '/audio/ja-3-1.mp3' },
      { phrase: 'よろしくお願いいたします', translation: 'Best regards', audio: '/audio/ja-3-2.mp3' },
      { phrase: 'ありがとうございました', translation: 'Thank you very much', audio: '/audio/ja-3-3.mp3' },
      { phrase: 'ご確認ください', translation: 'Please confirm', audio: '/audio/ja-3-4.mp3' }
    ]
  },

  // === CHINESE ===
  {
    id: 'zh-1',
    language: 'chinese',
    title: 'Greetings',
    category: 'Beginner',
    image: '/flags/chine.png',
    summary: 'Learn basic Chinese greetings.',
    phrases: [
      { phrase: '你好', translation: 'Hello', audio: '/audio/zh-1-0.mp3' },
      { phrase: '早上好', translation: 'Good morning', audio: '/audio/zh-1-1.mp3' },
      { phrase: '再见', translation: 'Goodbye', audio: '/audio/zh-1-2.mp3' },
      { phrase: '谢谢', translation: 'Thank you', audio: '/audio/zh-1-3.mp3' },
      { phrase: '请', translation: 'Please', audio: '/audio/zh-1-4.mp3' }
    ]
  },
  {
    id: 'zh-2',
    language: 'chinese',
    title: 'At the Restaurant',
    category: 'Intermediate',
    image: '/flags/chine.png',
    summary: 'Common sentences used in Chinese restaurants.',
    phrases: [
      { phrase: '我要点菜', translation: 'I want to order food', audio: '/audio/zh-2-0.mp3' },
      { phrase: '请给我菜单', translation: 'Please give me the menu', audio: '/audio/zh-2-1.mp3' },
      { phrase: '请结账', translation: 'Please bring the bill', audio: '/audio/zh-2-2.mp3' },
      { phrase: '谢谢你', translation: 'Thank you', audio: '/audio/zh-2-3.mp3' },
      { phrase: '请稍等', translation: 'Please wait', audio: '/audio/zh-2-4.mp3' }
    ]
  },
  {
    id: 'zh-3',
    language: 'chinese',
    title: 'Business Chinese',
    category: 'Advanced',
    image: '/flags/chine.png',
    summary: 'Expressions for meetings and formal emails.',
    phrases: [
      { phrase: '我们安排一个会议', translation: 'Let’s arrange a meeting', audio: '/audio/zh-3-0.mp3' },
      { phrase: '期待您的回复', translation: 'Looking forward to your reply', audio: '/audio/zh-3-1.mp3' },
      { phrase: '此致敬礼', translation: 'Sincerely', audio: '/audio/zh-3-2.mp3' },
      { phrase: '非常感谢', translation: 'Thank you very much', audio: '/audio/zh-3-3.mp3' },
      { phrase: '请确认', translation: 'Please confirm', audio: '/audio/zh-3-4.mp3' }
    ]
  },

  // === KOREAN ===
  {
    id: 'ko-1',
    language: 'korean',
    title: 'Greetings',
    category: 'Beginner',
    image: '/flags/coree-du-sud.png',
    summary: 'Learn basic Korean greetings.',
    phrases: [
      { phrase: '안녕하세요', translation: 'Hello', audio: '/audio/ko-1-0.mp3' },
      { phrase: '좋은 아침입니다', translation: 'Good morning', audio: '/audio/ko-1-1.mp3' },
      { phrase: '안녕히 가세요', translation: 'Goodbye', audio: '/audio/ko-1-2.mp3' },
      { phrase: '감사합니다', translation: 'Thank you', audio: '/audio/ko-1-3.mp3' },
      { phrase: '제발', translation: 'Please', audio: '/audio/ko-1-4.mp3' }
    ]
  },
  {
    id: 'ko-2',
    language: 'korean',
    title: 'At the Restaurant',
    category: 'Intermediate',
    image: '/flags/coree-du-sud.png',
    summary: 'Common expressions used in restaurants.',
    phrases: [
      { phrase: '메뉴 주세요', translation: 'Menu, please', audio: '/audio/ko-2-0.mp3' },
      { phrase: '물 주세요', translation: 'Water, please', audio: '/audio/ko-2-1.mp3' },
      { phrase: '계산서 주세요', translation: 'Check, please', audio: '/audio/ko-2-2.mp3' },
      { phrase: '감사합니다', translation: 'Thank you', audio: '/audio/ko-2-3.mp3' },
      { phrase: '잠시만 기다리세요', translation: 'Please wait a moment', audio: '/audio/ko-2-4.mp3' }
    ]
  },
  {
    id: 'ko-3',
    language: 'korean',
    title: 'Business Korean',
    category: 'Advanced',
    image: '/flags/coree-du-sud.png',
    summary: 'Formal expressions for meetings and emails.',
    phrases: [
      { phrase: '회의를 일정 잡읍시다', translation: 'Let’s schedule a meeting', audio: '/audio/ko-3-0.mp3' },
      { phrase: '회신 기다리겠습니다', translation: 'I’ll wait for your reply', audio: '/audio/ko-3-1.mp3' },
      { phrase: '감사합니다', translation: 'Thank you / Sincerely', audio: '/audio/ko-3-2.mp3' },
      { phrase: '대단히 감사합니다', translation: 'Thank you very much', audio: '/audio/ko-3-3.mp3' },
      { phrase: '확인해 주세요', translation: 'Please confirm', audio: '/audio/ko-3-4.mp3' }
    ]
  }
];