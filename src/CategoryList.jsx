// CategoryList.js
import React, { useEffect, useState } from 'react';
import ItemCards from './ItemCard';
import './CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch all categories from the API
    fetch('https://cf6458b0bf95e3f5ee35cb7f2495b44f.serveo.net/api/category/list')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error('Error fetching categories:', error));  
  }, []);

  return (
    <div>
      {categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.id}>
            <h2>{category.name}</h2>
            {/* Passing category_slug to the ItemCards component */}
            <ItemCards categorySlug={category.slug} />
          </div>
        ))
      ) : (
        <p>Loading categories...</p>
      )}
    </div>
  );
};

export default CategoryList;
