import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';


const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-1 p-5">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;