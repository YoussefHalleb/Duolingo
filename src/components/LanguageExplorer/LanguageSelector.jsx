import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import Navbar from '../shared/Navbar';

const LanguageSelector = () => {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();

  const languages = {
    english: {
      nativeName: 'English',
      name: 'English',
      flagIcon: '/flags/royaume-uni.png'
    },
    french: {
      nativeName: 'Français',
      name: 'French',
      flagIcon: '/flags/la-france.png'
    },
    spanish: {
      nativeName: 'Español',
      name: 'Spanish',
      flagIcon: '/flags/monde.png'
    },
    german: {
      nativeName: 'Deutsch',
      name: 'German',
      flagIcon: '/flags/allemagne.png'
    },
    italian: {
      nativeName: 'Italiano',
      name: 'Italian',
      flagIcon: '/flags/italie.png'
    },
    portuguese: {
      nativeName: 'Português',
      name: 'Portuguese',
      flagIcon: '/flags/le-portugal.png'
    },
    dutch: {
      nativeName: 'Nederlands',
      name: 'Dutch',
      flagIcon: '/flags/pays-bas.png'
    },
    russian: {
      nativeName: 'Русский',
      name: 'Russian',
      flagIcon: '/flags/rusia.png'
    },
    japanese: {
      nativeName: '日本語',
      name: 'Japanese',
      flagIcon: '/flags/japon.png'
    },
    chinese: {
      nativeName: '中文',
      name: 'Chinese',
      flagIcon: '/flags/chine.png'
    },
    korean: {
      nativeName: '한국어',
      name: 'Korean',
      flagIcon: '/flags/coree-du-sud.png'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Language</h1>
            <p className="text-gray-600 text-lg">Select the language you want to learn</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(languages).map(([lang, langInfo]) => (
              <div
                key={lang}
                onClick={() => {
                  setSelectedLanguage(lang);
                }}
                className={`
                  cursor-pointer rounded-xl p-6 transition-all duration-300 transform hover:scale-105
                  ${selectedLanguage === lang 
                    ? 'bg-white shadow-lg border-2 border-blue-500' 
                    : 'bg-white shadow-md hover:shadow-lg border border-gray-100'
                  }
                `}
            >
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-lg shadow-sm">
                  <img 
                    src={langInfo.flagIcon} 
                    alt={`${langInfo.name} flag`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+';
                    }}
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {langInfo.nativeName}
                  </h3>
                  <p className="text-gray-500">
                    {langInfo.name}
                  </p>
                </div>
                {selectedLanguage === lang && (
                  <div className="text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
          </div>

          {selectedLanguage && (
            <div className="mt-12 text-center">
              <Link
                to="/home"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-700 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Start Learning
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
