import React from 'react';
import './wish.css';

export default function WishCard({ id, name, image, rating, retailer, price, onRemove }) {
  return (
    <div className="card-content">
      <div className="product-image-container">
        <img
          src={image || "https://via.placeholder.com/130x150"} // Fallback if no image provided
          alt={name}
          className="product-image"
        />
      </div>
      <div className="card-details">
        <div className="product-rating">
          <span className="star">⭐</span> {rating}/5
        </div>
        <div>
          <h3 className="product-name">{name}</h3>
          <p className="product-retailer">
            <strong>Retailer:</strong> {retailer}
          </p>
        </div>
      </div>
      <div className="card-price-trash">
        <div className="product-price">ETB {price}</div>
        {/* Trash icon to remove item */}
        <div className="trash-icon" onClick={() => onRemove(id)}>🗑️</div>
      </div>
    </div>
  );
}
