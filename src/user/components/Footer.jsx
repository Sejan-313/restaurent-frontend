import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={`bg-dark text-white text-center py-4 ${styles.footer3D}`}>
      <div className="container">
        <p>&copy; 2025 MyRestaurant. All rights reserved.</p>
        <p className="mb-0">
          <a href="#" className="text-white mx-2">Privacy</a> |
          <a href="#" className="text-white mx-2">Terms</a> |
          <a href="#" className="text-white mx-2">Contact</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
