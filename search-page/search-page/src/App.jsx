import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Filter from './Filter.jsx';
import Card from './card.jsx'; // Assuming Card component is ready



export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [apiResults, setApiResults] = useState([]);
  const [filters, setFilters] = useState({ price: 7000, rating: 'all' });
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle search from Navbar and call the API
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Function to handle filter changes from the Filter component
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Effect to call API when the searchTerm or filters change
  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true); // Start loading
      const ratingFilter = filters.rating !== 'all' ? `&rating=${filters.rating}` : '';
      
      fetch(`https://api.example.com/search?query=${searchTerm}&maxPrice=${filters.price}${ratingFilter}`)
        .then(response => response.json())
        .then(data => {
          setApiResults(data.items || []); // Fallback in case `items` is undefined
          setIsLoading(false); // End loading
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setIsLoading(false); // End loading
        });
    }
  }, [searchTerm, filters]);

  return (
    <div className="container">
      {/* Navbar passes search term to App */}
      <Navbar onSearch={handleSearch} />

      {/* Filter passes filter changes to App */}
      <Filter onFilterChange={handleFilterChange} />

      {/* Card display section */}
      <div className="card-display">
        {isLoading ? (
          <p className="waiting">Loading...</p>
        ) : apiResults.length > 0 ? (
          apiResults.map((item) => (
            <Card
              key={item.id} // Ensure `id` is unique in the API response
              title={item.title || 'No title available'}
              description={item.description || 'No description available'}
              price={item.price || 'N/A'}
              rating={item.rating || 'N/A'}
              image={item.image || 'placeholder.png'}  // Fallback to a placeholder image if needed
            />
          ))
        ) : (
          <p className="waiting">No results found for "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
}
