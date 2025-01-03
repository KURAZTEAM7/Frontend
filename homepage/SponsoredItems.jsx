import React, { useEffect, useState } from 'react';
import './SponsoredItems.css'; // Create a separate CSS file for styling

const SponsoredItems = () => {
  const [sponsoredItems, setSponsoredItems] = useState([]);

  useEffect(() => {
    fetch('/data.json') // Assuming data.json is in the public folder
      .then(response => response.json())
      .then(data => {
        // Filter items that are sponsored
        const filteredItems = data.filter(item => item.sponsored);
        
        // Get 3 random items from the filtered list
        const selectedItems = getRandomItems(filteredItems, 3);
        setSponsoredItems(selectedItems);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Function to select random items
  const getRandomItems = (items, numItems) => {
    const shuffled = [...items].sort(() => 0.5 - Math.random()); // Shuffle array
    return shuffled.slice(0, numItems); // Return numItems from shuffled array
  };

  return (
    <div className="sponsored-items">
      <div className="sponsored-items-list">
        {sponsoredItems.map(item => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-info">
              <div className="item-rating">{item.rating}/5</div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="item-price">ETB {item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsoredItems;
