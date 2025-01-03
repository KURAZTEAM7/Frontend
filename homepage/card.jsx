import React from 'react';

const ItemCard = ({ img = '', rating = 0, name = 'No Name', description = 'No Description', price = 'Not Available' }) => {
  // Default values are provided for each prop to avoid undefined errors
  return (
    <div className="item-card">
      <img
        src={img && img.length > 0 ? img : 'https://via.placeholder.com/319x289'}  // Fallback to placeholder image
        className="item-image"
        alt={name}
      />
      <div className="card-body text-center">
        <p className="item-rating">{rating}/5</p>
        <h5 className="item-info">{name}</h5>
        <p className="item-description">{description}</p>
        <p className="item-price">{price}</p>
      </div>
    </div>
  );
};

export default ItemCard;
