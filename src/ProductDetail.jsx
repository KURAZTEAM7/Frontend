// ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Axios for the HTTP request
import Navbar from 'C:/Users/Windows 10 Pro/Desktop/search feature/Frontend/search-page/search-page/src/Navbar.jsx';
import './ProductDetail.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetail = () => {
  const { id } = useParams(); // Getting product ID from the URL
  const [product, setProduct] = useState(null); // Store the product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://192.168.8.14:8000/api/product/${id}`); // Use dynamic product ID from URL
        setProduct(response.data); // Set product data
      } catch (error) {
        setError('Failed to load product data');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  if (!product) return <div>No item to display</div>;

  return (
    <div className="container product-detail-container mt-5">
      <Navbar />

      <div className="product-info row mt-5 pt-5">
        <div className="product-image col-md-6 text-center">
          {product.image_urls.length > 0 ? (
            <img src={product.image_urls[0]} alt={product.title} className="img-fluid" />
          ) : (
            <div>No Image Available</div>
          )}
        </div>
        <div className="product-details col-md-6">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">ETB {product.price}</p>
          <div className="about-item">
            <h3>About the Item</h3>
            <p style={{ color: '#400090' }}>Model: <span style={{ color: 'black' }}>{product.model}</span></p>
            <p style={{ color: '#400090' }}>Brand: <span style={{ color: 'black' }}>{product.brand}</span></p>
            <p style={{ color: '#400090' }}>Stock Remaining: <span style={{ color: 'black' }}>{product.remaining_stock}</span></p>
            <p style={{ color: '#400090' }}>Tags: {product.tags.join(', ')}</p>
          </div>

          {/* Order Button */}
          <button className="custom-btn order-btn mt-2">Order</button>

          {/* Retailer Contact Info */}
          <button className="contact-btn mt-2">Retailer Contact</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
