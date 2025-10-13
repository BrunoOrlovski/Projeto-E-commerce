import React from "react";
import { DiVim } from "react-icons/di";


function ProductCard ({product}) {
    if (!product) {
        return null;
    }

     return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <div className="product-image-container">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        
        {/* Renderiza as tags apenas se elas existirem */}
        {product.tags && product.tags.length > 0 && (
          <div className="product-tags">
            {product.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="product-pricing">
        <p className="product-price">
          Por R$ {product.price.toFixed(2).replace('.', ',')}
        </p>
        
        {/* Renderiza o parcelamento apenas se ele existir */}
        {product.installments && (
          <p className="product-installments">{product.installments}</p>
        )}
      </div>

      <button className="buy-button">COMPRAR</button>
    </div>
  );
}

export default ProductCard;