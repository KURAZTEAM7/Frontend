import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import WishCard from './WishCard.jsx';
import './wishApp.css';

export default function WishApp() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching data from the API
    const fetchWishlistItems = async () => {
      try {
        const response = await fetch('https://api.example.com/wishlist'); // Replace with actual API endpoint
        const data = await response.json();
        setWishlistItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist items: ", error);
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, []);

  // Function to handle item removal
  const handleRemoveItem = async (id) => {
    try {
      // Send DELETE request or update API with the new wishlist
      const response = await fetch(`https://api.example.com/wishlist/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove item from the local state
        const updatedItems = wishlistItems.filter((item) => item.id !== id);
        setWishlistItems(updatedItems);
      } else {
        console.error("Error removing item from the API");
      }
    } catch (error) {
      console.error("Error removing item: ", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="main-part">
        <h2 className="wish-title">Wishlist</h2>
        
        {/* Display loading spinner or message */}
        {loading ? (
          <p>Loading items...</p>
        ) : wishlistItems.length === 0 ? (
          <p>No items currently in the wishlist.</p>
        ) : (
          wishlistItems.map((item) => (
            <WishCard
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              rating={item.rating}
              retailer={item.retailer}
              price={item.price}
              onRemove={handleRemoveItem}  // Pass the remove handler as a prop
            />
          ))
        )}
      </div>
    </div>
  );
}
