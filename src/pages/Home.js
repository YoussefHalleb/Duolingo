
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <h1>Bienvenue sur notre application</h1>
      <p>Vous êtes maintenant connecté !</p>
      <Link to="/signin" className="btn btn-primary">
        Se déconnecter
      </Link>
    </div>
  );
};

export default Home;