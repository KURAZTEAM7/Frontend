import React from 'react';
import './ItemCard.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ItemCard = ({ id, img, name, description, price }) => {
  const navigate = useNavigate(); // Create a navigate instance

  const handleCardClick = () => {
    // On card click, navigate to the detail page with the id
    navigate(`/detailpage/${id}`);
  };

  return (
    <div className="item-card" onClick={handleCardClick}> {/* Add onClick event */}
      <img
        src={img} // Generate unique image with the id
        alt={name}
        className="card-img-to"
      />
      <div className="space">
        <h4 className="item-info name">{name}</h4>
        <p className="item-description"> {description}</p>
        <p className="item-price">Price: {price}</p>
      </div>
    </div>
  );
};

export default ItemCard;
