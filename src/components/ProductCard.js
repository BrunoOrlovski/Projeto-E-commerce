import React from "react";
import "../styles/CardProduct.css";
import { useNavigate } from "react-router-dom"; // Removido 'Link'

function ProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) return null;

  const handleAddToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = storedCart.find(item => item.id === product.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = storedCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      const defaultSize = product.sizes && product.sizes.length > 0
        ? product.sizes[0]
        : null;

      updatedCart = [...storedCart, {
        ...product,
        quantity: 1,
        selectedSize: defaultSize
      }];
    }

    try {
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } catch (e) {
      console.error("Erro ao salvar no carrinho:", e);
    }

    alert("Produto adicionado ao carrinho!");
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    // REMOVIDA: A linha navigate(...) foi removida daqui
  };

  return (
    <div className="product-card">
      {product.discount && (
        <p className="product-discount">
          {Math.round(product.discount * 100)}% OFF
        </p>
      )}

      <h3 className="product-name">{product.name}</h3>

      {/* A navegação continua aqui no onClick da imagem */}
      <div
        className="product-image-container"
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: "pointer" }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        {product.tags && product.tags.length > 0 && (
          <div className="product-tags">
            {product.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
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