import React from 'react';
import Layout from '../shared/layout';
import LessonList from './LessonList';
import './Learn.css';

const Learn = () => {
  return (
    <Layout>
      <div className="learn-container">
        <header className="learn-header">
          <h1 className="learn-title">Learn Lessons</h1>
          <p className="learn-subtitle">Explore interactive lessons to master new languages.</p>
        </header>
        <LessonList />
      </div>
    </Layout>
  );
};

export default Learn;