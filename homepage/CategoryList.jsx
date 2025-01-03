import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';
import './CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch category list
        const categoryResponse = await axios.get('http://127.0.0.1:8000/api/category/list');
        const categoryList = categoryResponse.data;

        // Fetch products for each category by slug
        const categoryWithProducts = await Promise.all(
          categoryList.map(async (category) => {
            try {
              const productResponse = await axios.get(
                `http://127.0.0.1:8000/api/category/products/${category.slug}`
              );

              // Log product response to verify structure
              console.log(`Products for ${category.slug}: `, productResponse.data.products);

              return { ...category, items: productResponse.data.products || [] }; // Merge products into category
            } catch (err) {
              console.error(`Error fetching products for category ${category.slug}`, err);
              return { ...category, items: [] }; // Handle case where no items or error occurs
            }
          })
        );

        // Filter categories that have products
        const filteredCategories = categoryWithProducts.filter(category => category.items && category.items.length > 0);

        setCategories(filteredCategories);
      } catch (err) {
        console.error('Error fetching categories:', err); // Log error for debugging
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="category-list">
      {categories.length > 0 ? (
        categories.map((category) => (
          <div className="category-section" key={category.id}>
            <h2>{category.name}</h2>
            <div className="category-items">
              {category.items.slice(0, 6).map((item) => (
                <ItemCard
                  img={item.image_urls[0]}
                  key={item.id}
                  id={item.id}
                  rating={item.rating} // Adjust if rating is available
                  name={item.title} // Update this field to 'title'
                  description={item.description} // Assuming 'brand' is shown as description
                  price={item.price} // Ensure price is displayed
                />
              )
              )}
              {console.log(category.items)}
            </div>
          </div>
        ))
      ) : (
        <p>No items here yet</p> // Show if no categories have items
      )}
    </div>
  );
};

export default CategoryList;
