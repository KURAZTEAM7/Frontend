import React from 'react';
import './App.css';
import Navbar from 'C:/Users/Windows 10 Pro/Desktop/search feature/Frontend/search-page/search-page/src/Navbar.jsx';
import './index.css';
import Footer from './Footer';
import CategoryList from './CategoryList';
import SponsoredItems from './SponsoredItems';

function Homepage() {
  return (
    <div className="homepage-wrapper">
      <Navbar />
      <br />
      <h1 className="product">Product Categories</h1>
      <div className="cat">
      <CategoryList />
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
