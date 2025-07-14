import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you, ${email}! You are now subscribed.`);
    setEmail('');
  };

  return (
    <footer className="main-footer">
      <div className="footer-content flex flex-col md:flex-row justify-between items-center p-4 md:p-6">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <div className="footer-title">Language Explorer</div>
          <div className="footer-tips">Stay updated with our language tips!</div>
        </div>
        <form onSubmit={handleSubscribe} className="footer-subscribe flex items-center gap-2">
          <input
            type="email"
            className="footer-input"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn-footer-subscribe">Subscribe</button>
        </form>
      </div>
      <div className="footer-bottom text-center p-2">
        <div className="footer-copyright">© 2025 Language Explorer.</div>
      </div>
    </footer>
  );
};

export default Footer;