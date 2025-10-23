import React, { useState } from 'react';
import '../styles/ProductDetails.css';
import {useNavigate } from 'react-router-dom';

function ProductDetails({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [cep, setCep] = useState('');
  const navigate = useNavigate();

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleCepChange = (e) => {
    setCep(e.target.value);
  };

  const handleBuy = () => {
  if (!selectedSize) {
    alert("Selecione um tamanho antes de comprar.");
    return;
  }
  alert(`Comprando o produto no tamanho ${selectedSize}`);
  navigate("/ShoppCart");
};
  return (
    <div className="product-details">
      <div className="gallery">
        <img src={product.imageUrl} alt={product.name} className="main-image" />
        <div className="thumbnails">
          {product.thumbnails.map((thumb, index) => (
            <img key={index} src={thumb} alt={`thumb-${index}`} />
          ))}
        </div>
      </div>

      <div className="info">
        <h2>{product.name}</h2>
        <p className="color">Cor: {product.color}</p>
        <div className="rating">⭐ {product.rating}</div>

        <div className="price">
          <p className="value">R$ {product.price.toFixed(2).replace('.', ',')}</p>
          <p className="installments">{product.installments}</p>
        </div>

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

        <button className="buy-button" onClick={handleBuy}>
          COMPRAR AGORA
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
