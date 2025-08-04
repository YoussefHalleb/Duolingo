import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../../config/firebase';
import Layout from '../shared/layout';
import './CulturalDiscovery.css';

const CulturalDiscovery = () => {
  const { user, loading: authLoading } = useAuth();
  const { selectedLanguage } = useLanguage();
  const [cards, setCards] = useState([]);
  const [terminatedLessons, setTerminatedLessons] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCulturalCards = async () => {
      if (user && selectedLanguage) {
        console.log('Fetching cultural cards for language:', selectedLanguage);
        try {
          const response = await fetch(`/api/cultural-cards?language=${selectedLanguage}`);
          console.log('Response status:', response.status);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          console.log('Fetched data:', data);
          setCards(data);
        } catch (error) {
          console.error('Error fetching cultural cards:', error);
          setCards([]); // Fallback if API fails
        }
        setLoading(false);
      }
    };
  
    if (user && selectedLanguage) {
      fetchCulturalCards();
  
      const terminatedLessonsRef = ref(rtdb, `users/${user.uid}/terminatedLessons`);
      const unsubscribe = onValue(terminatedLessonsRef, (snapshot) => {
        const data = snapshot.val() || {};
        setTerminatedLessons(data);
      });
      return () => unsubscribe();
    }
  }, [user, selectedLanguage]);

  const isCardUnlocked = (card) => {
    return terminatedLessons[card.related_lesson_id]?.progress === 100;
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="cultural-discovery-container">
          <p className="cultural-discovery-subtitle">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="cultural-discovery-container">
        <h1 className="cultural-discovery-title">Cultural Discovery</h1>
        <p className="cultural-discovery-subtitle">Explore the traditions of {selectedLanguage} that you have unlocked!</p>
        <div className="cultural-gallery">
          {cards.length > 0 ? (
            cards.map((card) => (
              <div key={card.id} className={`cultural-card ${isCardUnlocked(card) ? '' : 'locked'}`}>
                <img
                  src={card.image_url}
                  alt={card.title}
                  className="cultural-card-image"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/default-image.jpg'; }}
                />
                <h2 className="cultural-card-title">{card.title}</h2>
                <h6 className="cultural-discovery-text">{card.text}</h6>
                {!isCardUnlocked(card) && <span className="lock-icon">🔒</span>}
                {isCardUnlocked(card) && (
                  <button
                    className="view-details-button"
                    onClick={() => window.open(card.external_link, '_blank')}
                  >
                    View Details
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="cultural-discovery-subtitle">No cultural cards available for this language.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CulturalDiscovery;