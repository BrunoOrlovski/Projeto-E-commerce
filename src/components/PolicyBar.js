// src/components/PolicyBar.js

import React from 'react';

const PolicyBar = ({ policies }) => {
  return (
    <section className="policy-bar-container">
      {policies.map((item, index) => (
        <div key={index} className="policy-item">
          <item.icon size={28} className="policy-icon" />
          <span className="policy-text">{item.text}</span>
        </div>
      ))}
    </section>
  );
};

export default PolicyBar;