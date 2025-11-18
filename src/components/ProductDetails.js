import React, { useState, useEffect } from 'react';
import '../styles/ProductDetails.css';
import { useNavigate } from 'react-router-dom';
import { GiPriceTag } from 'react-icons/gi';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

function ProductDetails({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(product.imageUrl);
  const [cep, setCep] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setMainImage(product.imageUrl);
    setSelectedSize(null);
  }, [product]);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleCepChange = (e) => {
    setCep(e.target.value);
  };

  const handleBuy = () => {

    if (product.sizes?.length > 0 && !selectedSize) {
      alert("Por favor, selecione um tamanho para continuar.");
      return; 
    }

    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = storedCart.find(item => item.id === product.id);

    const quantityInCart = existingItem ? existingItem.quantity : 0;
    if (quantityInCart >= product.stock) {
      alert("Desculpe, você já atingiu o limite de estoque para este item.");
      return;
    }

    const newItem = {
      ...product,
      quantity: 1,
      selectedSize: selectedSize || "Único",
      color: product.color || null
    };

    const updatedCart = existingItem
      ? storedCart.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                selectedSize: selectedSize || item.selectedSize || "Único",
                color: product.color || item.color || null
              }
            : item
        )
      : [...storedCart, newItem];

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    alert("Produto adicionado ao carrinho!");
    navigate("/ShoppCart");
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  let estoqueInfo;
  const isOutOfStock = product.stock === 0;

  if (isOutOfStock) {
    estoqueInfo = <span className="stock-info out-of-stock">Produto Esgotado</span>;
  } else if (product.stock <= 10) {
    estoqueInfo = <span className="stock-info low-stock">{`Apenas ${product.stock} unidades restantes!`}</span>;
  } else {
    estoqueInfo = <span className="stock-info in-stock">Em estoque</span>;
  }

  return (
    <div className="product-details">
      <div className="gallery">
        <img
          src={mainImage || "/img/placeholder.png"}
          alt={product.name}
          className="main-image"
        />
        
        <div className="thumbnails">
          {(product.thumbnails || [])
            .concat(Array(6).fill(null))
            .slice(0, 6)
            .map((thumb, index) => (
              <img
                key={index}
                src={thumb || "/img/placeholder.png"}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${mainImage === thumb ? 'active' : ''} ${!thumb ? 'placeholder' : ''}`}
                onClick={() => thumb && setMainImage(thumb)}
                style={{ cursor: thumb ? 'pointer' : 'default' }}
              />
            ))}
        </div>
      </div>

      <div className="info">
        <h2>{product.name}</h2>
        {product.color && <p className="color">Cor: {product.color}</p>}
        {product.rating && <div className="rating">⭐ {product.rating}</div>}

        <div className="price">
          <p className="value">
           {formatCurrency(product.price)}
          </p>
          {product.installments && (
            <p className="installments">{product.installments}</p>
          )}
        </div>

        {product.sizes?.length > 0 && (
          <div className="sizes">
            <p>Tamanhos:</p>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? 'selected' : ''}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="stock-container">
          {estoqueInfo}
        </div>

        <button 
          className="buy-button" 
          onClick={handleBuy} 
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Indisponível" : "COMPRAR AGORA"}
        </button>

        <div className="payment-methods">
          <p>Formas de pagamento:</p>
          <img src="/img/pix.png" alt="Pix" />
          <img src="/img/visa.png" alt="Visa" />
          <img src="/img/mastercard.png" alt="MasterCard" />
        </div>

        <div className="delivery">
          <p>Consulte o prazo de entrega:</p>
          <input
            type="text"
            placeholder="Digite seu CEP"
            value={cep}
            onChange={handleCepChange}
          />
          <button>CONSULTAR</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;