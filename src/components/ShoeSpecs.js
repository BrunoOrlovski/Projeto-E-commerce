import React from 'react';
import '../styles/ShoeSpecs.css';

const ShoeSpecs = ({ specs }) => {
  return (
    <section className="shoe-specs">
      {specs.map((item, index) => (
        <div key={index} className="spec-item">
          <img src={item.image} alt={item.label} className="spec-image" />
          <div className="spec-text">
            <span className="spec-label">{item.label}</span>
            <span className="spec-value">{item.value}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ShoeSpecs;
