import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/App.css';
import Navbar from '../Navbar.jsx';
import Card from './Card.jsx';  // Ensure the file name is correct
import Filter from './Filter.jsx';

export default function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryFromUrl = queryParams.get('query') || '';
  const navigate = useNavigate(); // For navigation to detail page

  const [searchTerm, setSearchTerm] = useState(queryFromUrl);  // Initialize with query from URL
  const [apiResults, setApiResults] = useState([]);  // To hold API data
  const [isLoading, setIsLoading] = useState(false);

  // Handle search input from Navbar
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Effect to fetch the data from the API based on searchTerm
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Sending the search query to the API endpoint
        const response = await fetch(`http://127.0.0.1:8000/api/product/search?query=${searchTerm}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the JSON data
        const data = await response.json();

        // Ensure data[1] contains an array of products
        const productData = Array.isArray(data[1]) ? data[1] : [];

        // Update state with the fetched data
        setApiResults(productData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);  // Only fetch data when the search term changes

  // Function to handle card click and navigate to the detail page
  const handleCardClick = (id) => {
    navigate(`/detailpage/${id}`); // Navigate to the detail page with the item's ID
  };

  return (
    <div className="app-container">
      <Navbar onSearch={handleSearch} />  {/* Passing handleSearch to update search term */}
      <div className="main-content">
        <Filter />
        <div className="card-display">
          {isLoading ? (
            <p className="waiting">Loading...</p>
          ) : apiResults.length > 0 ? (
            apiResults.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                price={`$${item.price}`}
                image={item.image_urls && item.image_urls[0]}  // Assuming API returns an array of image URLs
                description={item.description}
                onClick={() => handleCardClick(item.id)}  // Navigate to detail page on card click
              />
            ))
          ) : (
            <p>No results found for "{searchTerm}". Please try another search term.</p>
          )}
        </div>
      </div>
    </div>
  );
}
