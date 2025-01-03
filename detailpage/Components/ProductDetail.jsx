import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from 'C:/Users/Windows 10 Pro/Desktop/search feature/Frontend/search-page/search-page/src/Navbar.jsx';
import './ProductDetail.css'
import Footer from 'C:/Users/Windows 10 Pro/Desktop/search feature/Frontend/search-page/search-page/src/homepage/Footer.jsx'

const DetailPage = () => {
  const { id } = useParams(); // Get the id from the route params
  const [product, setProduct] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/product/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data.');
        }
        const data = await response.json();
        setProduct(data);

        // Fetch vendor details using vendor_id from product data
        const vendorId = data.vendor_id;
        if (vendorId) {
          const vendorResponse = await fetch(`http://127.0.0.1:8000/api/vendor/${vendorId}`);
          if (!vendorResponse.ok) {
            throw new Error('Failed to fetch vendor data.');
          }
          const vendorData = await vendorResponse.json();
          setVendor(vendorData);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="detail-page-container">
        <div className="product-image-section">
          <img
            src={product.image_urls && product.image_urls.length > 0 ? product.image_urls[0] : 'https://via.placeholder.com/319x289'}
            alt={product.title}
            className="product-image"
          />
        </div>
        <div className="product-details-section">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ${product.price}</p>

          <div className="product-additional-info">
            <p>Stock: {product.remaining_stock}</p>
          </div>

          {vendor && (
            <div className="vendor-info">
              <h3 className="vendor-heading">Vendor Information</h3>
              <p className="vendor-store">Store: {vendor.store_name}</p>
              <p className="vendor-phone">Mobile: {vendor.phone_number}</p>
            </div>
          )}

          <button className="contact-vendor-button">Contact Vendor</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPage;
