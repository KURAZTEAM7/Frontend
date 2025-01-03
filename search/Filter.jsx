import React, { useState } from "react";
import filter from "./assets/filter.png";
import twoStars from "./assets/2stars.png";
import threeStars from "./assets/3stars.png";
import fourStars from "./assets/4stars.png";
import fiveStars from "./assets/5stars.png";
import "./styles/Filter.css";

export default function Filter({ onFilterChange }) {
    const [price, setPrice] = useState(7000);
    const [rating, setRating] = useState("all");

    const handlePriceChange = (event) => {
        const newPrice = event.target.value;
        setPrice(newPrice);
        // Send filter updates to the parent component
        onFilterChange({ price: newPrice, rating });
    };

    const handleRatingChange = (event) => {
        const newRating = event.target.value;
        setRating(newRating);
        // Send filter updates to the parent component
        onFilterChange({ price, rating: newRating });
    };

    const handleSubmit = () => {
        // Optional: Add further logic here if necessary for form submission
        onFilterChange({ price, rating });
    };

    return (
        <div className="filter-container">
            {/* Filter Header */}
            <div className="filter">
                <img src={filter} alt="filter" className="filter-image" />
                <p className="filter-text">Filter</p>
            </div>

            {/* Price Slider */}
            <div className="price-slider-container">
                <label htmlFor="priceSlider" className="price-label">Price</label>
                <div className="slider-wrapper">
                    <span className="min-value">0</span>
                    <input
                        type="range"
                        className="slider"
                        id="priceSlider"
                        min="0"
                        max="7000"
                        value={price}
                        onChange={handlePriceChange}
                    />
                    <span className="max-value">7k+</span>
                </div>
                <div className="price-bubble">{price}</div>
            </div>

            

            {/* Submit Button */}
            <button className="submit-button" onClick={handleSubmit}>
                Apply Filters
            </button>
        </div>
    );
}
