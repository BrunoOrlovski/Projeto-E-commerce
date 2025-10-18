
import React from 'react';
import ProductCard from './ProductCard'; 
import '../styles/ProductSection.css'; 

const ProductSection = ({ title, products }) => {
  return (
    <section className="product-section">
      <h2 className="section-title">{title}</h2>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;