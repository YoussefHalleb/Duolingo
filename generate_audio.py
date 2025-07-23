from gtts import gTTS
import os

# Toutes les leçons avec 5 phrases chacune
lessons = [
    # === ENGLISH ===
    {
        'id': 'en-1',
        'language': 'english',
        'phrases': [
            {'phrase': 'Hello', 'index': 0},
            {'phrase': 'Good morning', 'index': 1},
            {'phrase': 'Goodbye', 'index': 2},
            {'phrase': 'Thank you', 'index': 3},
            {'phrase': 'Please', 'index': 4}
        ]
    },
    {
        'id': 'en-2',
        'language': 'english',
        'phrases': [
            {'phrase': 'I would like a sandwich', 'index': 0},
            {'phrase': 'Can I see the menu?', 'index': 1},
            {'phrase': 'The bill, please.', 'index': 2},
            {'phrase': 'Thank you', 'index': 3},
            {'phrase': 'Please wait', 'index': 4}
        ]
    },
    {
        'id': 'en-3',
        'language': 'english',
        'phrases': [
            {'phrase': 'Let\'s schedule a meeting', 'index': 0},
            {'phrase': 'I look forward to your reply', 'index': 1},
            {'phrase': 'Best regards', 'index': 2},
            {'phrase': 'Thank you for your time', 'index': 3},
            {'phrase': 'Please confirm', 'index': 4}
        ]
    },

    # === GERMAN ===
    {
        'id': 'de-1',
        'language': 'german',
        'phrases': [
            {'phrase': 'Hallo', 'index': 0},
            {'phrase': 'Guten Morgen', 'index': 1},
            {'phrase': 'Tschüss', 'index': 2},
            {'phrase': 'Danke', 'index': 3},
            {'phrase': 'Bitte', 'index': 4}
        ]
    },
    {
        'id': 'de-2',
        'language': 'german',
        'phrases': [
            {'phrase': 'Wie viel kostet das?', 'index': 0},
            {'phrase': 'Ich möchte das kaufen', 'index': 1},
            {'phrase': 'Karte oder bar?', 'index': 2},
            {'phrase': 'Danke schön', 'index': 3},
            {'phrase': 'Bitte warten', 'index': 4}
        ]
    },
    {
        'id': 'de-3',
        'language': 'german',
        'phrases': [
            {'phrase': 'Könnten Sie das bitte wiederholen?', 'index': 0},
            {'phrase': 'Ich freue mich auf die Zusammenarbeit', 'index': 1},
            {'phrase': 'Mit freundlichen Grüßen', 'index': 2},
            {'phrase': 'Vielen Dank', 'index': 3},
            {'phrase': 'Bitte bestätigen', 'index': 4}
        ]
    },

    # === ITALIAN ===
    {
        'id': 'it-1',
        'language': 'italian',
        'phrases': [
            {'phrase': 'Ciao', 'index': 0},
            {'phrase': 'Buongiorno', 'index': 1},
            {'phrase': 'Arrivederci', 'index': 2},
            {'phrase': 'Grazie', 'index': 3},
            {'phrase': 'Per favore', 'index': 4}
        ]
    },
    {
        'id': 'it-2',
        'language': 'italian',
        'phrases': [
            {'phrase': 'Dove è il gate?', 'index': 0},
            {'phrase': 'Ho perso il mio bagaglio', 'index': 1},
            {'phrase': 'Questo è il mio passaporto', 'index': 2},
            {'phrase': 'Grazie mille', 'index': 3},
            {'phrase': 'Aspetta un momento', 'index': 4}
        ]
    },
    {
        'id': 'it-3',
        'language': 'italian',
        'phrases': [
            {'phrase': 'In bocca al lupo', 'index': 0},
            {'phrase': 'Chi dorme non piglia pesci', 'index': 1},
            {'phrase': 'È acqua passata', 'index': 2},
            {'phrase': 'Grazie ancora', 'index': 3},
            {'phrase': 'Per piacere', 'index': 4}
        ]
    },

    # === FRENCH ===
    {
        'id': 'fr-1',
        'language': 'french',
        'phrases': [
            {'phrase': 'Bonjour', 'index': 0},
            {'phrase': 'Bonsoir', 'index': 1},
            {'phrase': 'Au revoir', 'index': 2},
            {'phrase': 'Merci', 'index': 3},
            {'phrase': 'S\'il vous plaît', 'index': 4}
        ]
    },
    {
        'id': 'fr-2',
        'language': 'french',
        'phrases': [
            {'phrase': 'Pain', 'index': 0},
            {'phrase': 'Vin', 'index': 1},
            {'phrase': 'Fromage', 'index': 2},
            {'phrase': 'Merci beaucoup', 'index': 3},
            {'phrase': 'Attendez', 'index': 4}
        ]
    },
    {
        'id': 'fr-3',
        'language': 'french',
        'phrases': [
            {'phrase': 'Où est la gare ?', 'index': 0},
            {'phrase': 'Un billet, s\'il vous plaît.', 'index': 1},
            {'phrase': 'Je voudrais une chambre.', 'index': 2},
            {'phrase': 'Merci bien', 'index': 3},
            {'phrase': 'Veuillez attendre', 'index': 4}
        ]
    },

    # === SPANISH ===
    {
        'id': 'es-1',
        'language': 'spanish',
        'phrases': [
            {'phrase': 'Hola', 'index': 0},
            {'phrase': 'Gracias', 'index': 1},
            {'phrase': 'Me llamo...', 'index': 2},
            {'phrase': 'Buenos días', 'index': 3},
            {'phrase': 'Por favor', 'index': 4}
        ]
    },
    {
        'id': 'es-2',
        'language': 'spanish',
        'phrases': [
            {'phrase': 'Pan', 'index': 0},
            {'phrase': 'Vino', 'index': 1},
            {'phrase': 'Queso', 'index': 2},
            {'phrase': 'Gracias de nuevo', 'index': 3},
            {'phrase': 'Espere un momento', 'index': 4}
        ]
    },
    {
        'id': 'es-3',
        'language': 'spanish',
        'phrases': [
            {'phrase': '¿Dónde está la estación?', 'index': 0},
            {'phrase': 'Un billete, por favor.', 'index': 1},
            {'phrase': 'Quiero una habitación.', 'index': 2},
            {'phrase': 'Muchas gracias', 'index': 3},
            {'phrase': 'Por favor, espera', 'index': 4}
        ]
    },

    # === PORTUGUESE ===
    {
        'id': 'pt-1',
        'language': 'portuguese',
        'phrases': [
            {'phrase': 'Olá', 'index': 0},
            {'phrase': 'Bom dia', 'index': 1},
            {'phrase': 'Tchau', 'index': 2},
            {'phrase': 'Obrigado', 'index': 3},
            {'phrase': 'Por favor', 'index': 4}
        ]
    },
    {
        'id': 'pt-2',
        'language': 'portuguese',
        'phrases': [
            {'phrase': 'Eu gostaria de um café', 'index': 0},
            {'phrase': 'Pode me trazer o cardápio?', 'index': 1},
            {'phrase': 'A conta, por favor.', 'index': 2},
            {'phrase': 'Obrigado pela ajuda', 'index': 3},
            {'phrase': 'Aguarde um momento', 'index': 4}
        ]
    },
    {
        'id': 'pt-3',
        'language': 'portuguese',
        'phrases': [
            {'phrase': 'Vamos agendar uma reunião', 'index': 0},
            {'phrase': 'Aguardo seu retorno', 'index': 1},
            {'phrase': 'Atenciosamente', 'index': 2},
            {'phrase': 'Muito obrigado', 'index': 3},
            {'phrase': 'Por favor, confirme', 'index': 4}
        ]
    },

    # === DUTCH ===
    {
        'id': 'nl-1',
        'language': 'dutch',
        'phrases': [
            {'phrase': 'Hallo', 'index': 0},
            {'phrase': 'Goedemorgen', 'index': 1},
            {'phrase': 'Tot ziens', 'index': 2},
            {'phrase': 'Dank je', 'index': 3},
            {'phrase': 'Alsjeblieft', 'index': 4}
        ]
    },
    {
        'id': 'nl-2',
        'language': 'dutch',
        'phrases': [
            {'phrase': 'Hoeveel kost dit?', 'index': 0},
            {'phrase': 'Ik wil dit graag kopen', 'index': 1},
            {'phrase': 'Kan ik met kaart betalen?', 'index': 2},
            {'phrase': 'Dank u wel', 'index': 3},
            {'phrase': 'Wacht even', 'index': 4}
        ]
    },
    {
        'id': 'nl-3',
        'language': 'dutch',
        'phrases': [
            {'phrase': 'Laten we een afspraak maken', 'index': 0},
            {'phrase': 'Ik zie uw reactie graag tegemoet', 'index': 1},
            {'phrase': 'Met vriendelijke groet', 'index': 2},
            {'phrase': 'Hartelijk dank', 'index': 3},
            {'phrase': 'Bevestig alstublieft', 'index': 4}
        ]
    },

    # === RUSSIAN ===
    {
        'id': 'ru-1',
        'language': 'russian',
        'phrases': [
            {'phrase': 'Привет', 'index': 0},
            {'phrase': 'Доброе утро', 'index': 1},
            {'phrase': 'До свидания', 'index': 2},
            {'phrase': 'Спасибо', 'index': 3},
            {'phrase': 'Пожалуйста', 'index': 4}
        ]
    },
    {
        'id': 'ru-2',
        'language': 'russian',
        'phrases': [
            {'phrase': 'Можно меню, пожалуйста?', 'index': 0},
            {'phrase': 'Я хочу чай', 'index': 1},
            {'phrase': 'Счёт, пожалуйста.', 'index': 2},
            {'phrase': 'Большое спасибо', 'index': 3},
            {'phrase': 'Подождите', 'index': 4}
        ]
    },
    {
        'id': 'ru-3',
        'language': 'russian',
        'phrases': [
            {'phrase': 'Давайте назначим встречу', 'index': 0},
            {'phrase': 'Жду вашего ответа', 'index': 1},
            {'phrase': 'С уважением', 'index': 2},
            {'phrase': 'Спасибо большое', 'index': 3},
            {'phrase': 'Пожалуйста, подтвердите', 'index': 4}
        ]
    },

    # === JAPANESE ===
    {
        'id': 'ja-1',
        'language': 'japanese',
        'phrases': [
            {'phrase': 'こんにちは', 'index': 0},
            {'phrase': 'おはようございます', 'index': 1},
            {'phrase': 'さようなら', 'index': 2},
            {'phrase': 'ありがとう', 'index': 3},
            {'phrase': 'お願いします', 'index': 4}
        ]
    },
    {
        'id': 'ja-2',
        'language': 'japanese',
        'phrases': [
            {'phrase': 'メニューをお願いします', 'index': 0},
            {'phrase': '水をください', 'index': 1},
            {'phrase': 'お会計お願いします', 'index': 2},
            {'phrase': 'ありがとうございます', 'index': 3},
            {'phrase': 'お待ちください', 'index': 4}
        ]
    },
    {
        'id': 'ja-3',
        'language': 'japanese',
        'phrases': [
            {'phrase': '会議を予定しましょう', 'index': 0},
            {'phrase': 'ご連絡お待ちしております', 'index': 1},
            {'phrase': 'よろしくお願いいたします', 'index': 2},
            {'phrase': 'ありがとうございました', 'index': 3},
            {'phrase': 'ご確認ください', 'index': 4}
        ]
    },

    # === CHINESE ===
    {
        'id': 'zh-1',
        'language': 'chinese',
        'phrases': [
            {'phrase': '你好', 'index': 0},
            {'phrase': '早上好', 'index': 1},
            {'phrase': '再见', 'index': 2},
            {'phrase': '谢谢', 'index': 3},
            {'phrase': '请', 'index': 4}
        ]
    },
    {
        'id': 'zh-2',
        'language': 'chinese',
        'phrases': [
            {'phrase': '我要点菜', 'index': 0},
            {'phrase': '请给我菜单', 'index': 1},
            {'phrase': '请结账', 'index': 2},
            {'phrase': '谢谢你', 'index': 3},
            {'phrase': '请稍等', 'index': 4}
        ]
    },
    {
        'id': 'zh-3',
        'language': 'chinese',
        'phrases': [
            {'phrase': '我们安排一个会议', 'index': 0},
            {'phrase': '期待您的回复', 'index': 1},
            {'phrase': '此致敬礼', 'index': 2},
            {'phrase': '非常感谢', 'index': 3},
            {'phrase': '请确认', 'index': 4}
        ]
    },

    # === KOREAN ===
    {
        'id': 'ko-1',
        'language': 'korean',
        'phrases': [
            {'phrase': '안녕하세요', 'index': 0},
            {'phrase': '좋은 아침입니다', 'index': 1},
            {'phrase': '안녕히 가세요', 'index': 2},
            {'phrase': '감사합니다', 'index': 3},
            {'phrase': '제발', 'index': 4}
        ]
    },
    {
        'id': 'ko-2',
        'language': 'korean',
        'phrases': [
            {'phrase': '메뉴 주세요', 'index': 0},
            {'phrase': '물 주세요', 'index': 1},
            {'phrase': '계산서 주세요', 'index': 2},
            {'phrase': '감사합니다', 'index': 3},
            {'phrase': '잠시만 기다리세요', 'index': 4}
        ]
    },
    {
        'id': 'ko-3',
        'language': 'korean',
        'phrases': [
            {'phrase': '회의를 일정 잡읍시다', 'index': 0},
            {'phrase': '회신 기다리겠습니다', 'index': 1},
            {'phrase': '감사합니다', 'index': 2},
            {'phrase': '대단히 감사합니다', 'index': 3},
            {'phrase': '확인해 주세요', 'index': 4}
        ]
    }
]

# Générer les fichiers audio
output_dir = 'public/audio/'
os.makedirs(output_dir, exist_ok=True)  # Crée le dossier s'il n'existe pas

# Map des langues à leurs codes gTTS
lang_map = {
    'english': 'en',
    'german': 'de',
    'italian': 'it',
    'french': 'fr',
    'spanish': 'es',
    'portuguese': 'pt',
    'dutch': 'nl',
    'russian': 'ru',
    'japanese': 'ja',
    'chinese': 'zh',
    'korean': 'ko'
}

for lesson in lessons:
    lesson_id = lesson['id']
    language = lesson['language']
    lang_code = lang_map.get(language, 'en')  # Utilise 'en' comme fallback
    
    for phrase_data in lesson['phrases']:
        text = phrase_data['phrase']
        index = phrase_data['index']
        
        try:
            # Configuration spéciale pour le chinois
            if language == 'chinese':
                tts = gTTS(text=text, lang='zh')
            else:
                tts = gTTS(text=text, lang=lang_code)
            
            file_path = os.path.join(output_dir, f'{lesson_id}-{index}.mp3')
            tts.save(file_path)
            print(f'Généré : {file_path}')
            
        except Exception as e:
            print(f"Erreur avec la phrase '{text}' (leçon {lesson_id}): {str(e)}")

print('Terminé ! Tous les fichiers audio ont été générés.')