// ItemCards.js
import React, { useEffect, useState } from 'react';
import './ItemCard.css'; // Make sure to import your CSS file

const ItemCard = ({ categorySlug }) => {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://cf6458b0bf95e3f5ee35cb7f2495b44f.serveo.net/api/category/products/${categorySlug}`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data.category);
        setProducts(data.products);
      }) 
      .catch((error) => console.error('Error fetching products:', error));
  }, [categorySlug]);

  return (
    <div className="item-cards">
      {category ? (
        <div>
          {products.length > 0 ? (
            <div className="item-list">
              {products.map((product) => (
                <div key={product.product_id} className="item-card">
                  <img src={product.image_urls[0]} alt={product.title} className="item-image" />
                  <div className="space">
                  <div>
                  <h4 className="item-info name">{product.title}</h4>
                  </div>
                  <div>
                  <p className='p'>Brand: {product.brand}</p>
                  <p className="item-price">Price: birr {product.price}</p>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No products available for this category.</p>
          )}
        </div>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default ItemCard;
