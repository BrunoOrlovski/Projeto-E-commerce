import React, { useState, useEffect } from "react";
import "../styles/CardProduct.css";
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

function ProductCard({ product }) {
  const navigate = useNavigate();
  // 1. Hook de estado (Sempre no topo)
  const [isFavorite, setIsFavorite] = useState(false);

  // 2. Hook de efeito (Sempre logo após os estados e ANTES de qualquer return)
  useEffect(() => {
    // Verificação de segurança: se não tem produto, não faz nada
    if (!product) return; 

    const favorites = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    
    // Verifica se o ID deste produto está na lista
    if (favorites.some(favId => favId === product.id)) {
      setIsFavorite(true);
    }
  }, [product]); // Dependência segura. O efeito roda quando 'product' muda.

  // 3. Verificação de renderização (Agora sim, podemos retornar null se necessário)
  if (!product) return null;

  // Funções do componente
  const handleToggleFavorite = (e) => {
    e.stopPropagation(); 
    
    const favorites = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    let updatedFavorites;
    let action = "";

    if (favorites.includes(product.id)) {
      updatedFavorites = favorites.filter(id => id !== product.id);
      setIsFavorite(false);
      action = "removido";
    } else {
      updatedFavorites = [...favorites, product.id];
      setIsFavorite(true);
      action = "adicionado";
    }

    localStorage.setItem("wishlistItems", JSON.stringify(updatedFavorites));
    
    if (action === "adicionado") {
        toast.success("Adicionado aos favoritos! ❤️", { autoClose: 1500 });
    }
  };

  const handleAddToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = storedCart.find(item => item.id === product.id);
    let updatedCart;
    let isNewItem = false; 

    if (existingItem) {
      updatedCart = storedCart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
      updatedCart = [...storedCart, { ...product, quantity: 1, selectedSize: defaultSize }];
      isNewItem = true;
    }

    try {
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      if (isNewItem) toast.success("Produto adicionado ao carrinho!");
      else toast.info("Quantidade Atualizada!");
    } catch (e) {
      console.error(e);
      toast.error("Erro ao adicionar.");
    }
  };

  return (
    <div className="product-card" style={{ position: 'relative' }}>
      <button 
        onClick={handleToggleFavorite}
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      {product.discount && (
        <p className="product-discount">
          {Math.round(product.discount * 100)}% OFF
        </p>
      )}

      <h3 className="product-name">{product.name}</h3>

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
          <p className="original-price">DE R$ {formatCurrency(product.originalPrice)}</p>
        ) : (
          <p className="original-price" style={{ visibility: "hidden" }}>placeholder</p>
        )}
        <p className="product-price">Por R$ {formatCurrency(product.price)}</p>
        {product.installments && <p className="product-installments">{product.installments}</p>}
      </div>

      <button className="buy-button" onClick={handleAddToCart}>
        ADICIONAR AO CARRINHO
      </button>
    </div>
  );
}

export default ProductCard;