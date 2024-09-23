import React, { useState } from 'react';
import './ProductDetail.css';
import { FaSearch, FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../assets/image.png';
import image0 from '../assets/image0.jpg';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const ProductDetail = () => {
  const [rating, setRating] = useState(0);

  const handleRatingClick = (starValue) => {
    setRating(starValue);
  };

  return (
    <div className="container product-detail-container mt-5">
      {/* Header Section */}
      <header className="header d-flex justify-content-between align-items-center fixed-top bg-custom shadow p-2">
        <div className="logo">PRICO</div>
        <div className="input-group search-bar mx-auto">
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Headphone WH1000XM5..."
          />
          <div className="input-group-append">
            <span className="input-group-text bg-transparent border-0"><FaSearch /></span>
          </div>
        </div>
        <div className="header-icons d-flex align-items-center">
          <span className="mx-2">Order</span>
          <span className="mx-2">Wishlist</span>
          <i className="profile-icon fas fa-user mx-2"></i>
        </div>
      </header>

      {/* Product Info Section */}
      <div className="product-info row mt-5 pt-5">
        <div className="product-image col-md-6 text-center">
          <img src={image} alt="Sony WH1000XM5" className="img-fluid" />
        </div>
        <div className="product-details col-md-6">
          <h2 className="product-title">Sony WH1000XM5</h2>
          <p className="product-description">
            The Best Wireless Noise Canceling Headphones with Auto Noise Canceling Optimizer, Crystal Clear Hands-Free Calling, and Alexa Voice Control.
          </p>
          <p className="product-price">ETB 7,700</p>
          <div className="about-item">
            <h3>About the Item</h3>
            <p style={{ color: '#400090' }}>Color: Black</p>
            <p style={{ color: '#400090' }}>Brand: <span style={{ color: 'black' }}>Sony</span></p>
            <p style={{ color: '#400090' }}>Retailer: <span style={{ color: 'black' }}>Amar Inc.</span></p>
            <p style={{ color: '#400090' }}>Retailer Rating: <span style={{ color: 'black' }}>4.6 stars</span></p>
          </div>

          {/* Add to Cart Button */}
          <button className="custom-btn add-to-cart-btn mt-2">Add to Cart</button>

          {/* Feedback Section */}
          <div className="feedback-container mt-3">
            <textarea className="form-control" placeholder="Give us feedback on your experience" style={{ height: '80px' }}></textarea>
            <div className="d-flex justify-content-end mt-2">
              <button className="custom-btn submit-feedback-btn mt-2">Submit</button>
            </div>
          </div>

          {/* Retailer Contact Info */}
          <button className="contact-btn mt-2">Retailer Contact</button>

          {/* Rating Section */}
          <div className="rating-section mt-3">
            <h4>Rate this retailer</h4>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star, index) => (
                <FaStar
                  key={index}
                  className={`star ${rating >= star ? 'active' : ''}`}
                  onClick={() => handleRatingClick(star)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Items Section */}
      <div className="similar-items mt-5">
        <h3>Similar Items</h3>
        <div className="items-list d-flex overflow-auto">
          {[image0, image1, image2, image3].map((img, index) => (
            <div className="item text-center mx-2" key={index}>
              <img src={img} alt={`Item ${index}`} className="img-fluid" />
              <p>Item {index + 1}</p>
              <p>ETB {Math.floor(Math.random() * 10000)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;