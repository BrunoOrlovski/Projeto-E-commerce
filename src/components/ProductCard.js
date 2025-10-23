import React from "react";
import "../styles/CardProduct.css";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) return null;

  const handleAddToCart = () => {
    navigate("/Product");
  };

  return (
    <div className="product-card">
      {product.discount ? (
        <p className="product-discount">{product.discount}</p>
      ) : (
        <p className="product-discount" style={{ visibility: "hidden" }}>
          placeholder
        </p>
      )}

      <h3 className="product-name">{product.name}</h3>

      <div className="product-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />

        {product.tags && product.tags.length > 0 && (
          <div className="product-tags">
            {product.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="product-pricing">
        {product.originalPrice ? (
          <p className="original-price">
            DE R$ {product.originalPrice.toFixed(2).replace(".", ",")}
          </p>
        ) : (
          <p className="original-price" style={{ visibility: "hidden" }}>
            placeholder
          </p>
        )}

        <p className="product-price">
          Por R$ {product.price.toFixed(2).replace(".", ",")}
        </p>

        {product.installments && (
          <p className="product-installments">{product.installments}</p>
        )}
      </div>

      <button className="buy-button" onClick={handleAddToCart}>
        ADICIONAR AO CARRINHO
      </button>
    </div>
  );
}

export default ProductCard;
