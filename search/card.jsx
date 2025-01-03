import React from 'react';
import star from './assets/star.png';  // Path to star image
import './styles/Card.css';  // Assume CSS for styling

export default function Card ({ image, title, description, rating, price, onClick }) {
    return (
        <div className="card-container" onClick={onClick} style={{ cursor: 'pointer' }}>
            <div className="card-img">
                <img src={image} alt={title} />
            </div>
            <div className="card-details">
                <h2 className="card-title">{title || 'No title available'}</h2>
                <p className="card-description">{description || 'No description available'}</p>
             
                <p className="card-price">ETB {price}</p>
            </div>
        </div>
    );
};
