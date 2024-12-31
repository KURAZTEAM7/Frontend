import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="about">
      <div className="footer-content">
        <div className="footer-left">
          <h2>price compare</h2>
          <p>Trust your purchase.</p>
        </div>
        <div className="footer-middle">
          <div className="footer-column">
            <h3>Contact</h3>
            <ul>
              <li><a href="#">09-xx-xx-xx-xx</a></li>
              <li><a href="#">Socials</a></li>
              <li><a href="#">22, Hanan K building</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-right">
          <div className="social-media">
            <a href="#"><img src="src/assets/Social(2).png" alt="Facebook" /></a>
            <a href="#"><img src="src/assets/Social(1).png" alt="Instagram" /></a>
            <a href="#"><img src="src/assets/Social.png" alt="Twitter" /></a>
          </div>
          <p>Discover our app</p>
          <div className="app-links">
            <a href="#"><img src="src/assets/Google Play.png" alt="Google Play" /></a>
            <a href="#"><img src="src/assets/Play Store.png" alt="App Store" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>All rights reserved @pricecompare.com 2024&copy;</p>
      </div>
    </footer>
  );
};

export default Footer;
