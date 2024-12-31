import React from 'react';

const ItemCard = ({ img, rating, name, description, price }) => {
  return (
    <div className="card shadow-sm" style={{ width: '18rem' }}>
      <img src={img} className="card-img-top" alt={name} />
      <div className="card-body text-center">
        <p className="card-text">{rating}/5</p>
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text text-purple">{price}</p>
      </div>
    </div>
  );
};

export default ItemCard;
