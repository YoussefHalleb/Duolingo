import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import LessonList from './LessonList';
import Layout from '../shared/layout';
import './Learn.css';

const Learn = () => {
  const { selectedLanguage } = useLanguage();

  return (
    <Layout>
      <div className="learn-container">
        <header className="learn-header">
          <h1 className="learn-title">Learn Lessons</h1>
          <p className="learn-subtitle">Explore interactive lessons to master {selectedLanguage || 'your selected language'}.</p>
        </header>
        {selectedLanguage ? (
          <LessonList filterLanguage={selectedLanguage} />
        ) : (
          <p className="text-center">Please select a language to view lessons.</p>
        )}
      </div>
    </Layout>
  );
};

export default Learn;