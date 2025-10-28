import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

function Cart({ cartItems, setCartItems, onRemove, onClear }) {
  const navigate = useNavigate();

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const discount = cartItems.reduce((acc, item) => {
  const percent = item.discount || 0;
  const itemDiscount = item.price * percent * item.quantity;
  return acc + itemDiscount;
}, 0);


  const total = subtotal - discount;

  return (
    <div className="cart-container">
      <h2>SEU CARRINHO</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <p>Seu carrinho está vazio.</p>
          <button className="continue-shopping-button" onClick={() => navigate('/')}>
            Continuar Comprando
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} />

               <div className="item-info">
                <h3>{item.name}</h3>

                <div className="item-attributes">
                  {item.selectedSize && (
                    <p><strong>Tamanho:</strong> {item.selectedSize}</p>
                  )}
                  {item.color && (
                    <p><strong>Cor:</strong> {item.color}</p>
                  )}
                </div>

                <p><strong>Preço unitário:</strong> R$ {item.price.toFixed(2).replace('.', ',')}</p>
              </div>

                <div className="item-actions">
                  <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  </div>

                  <button
                    onClick={() => {
                      onRemove(item.id); 
                      window.dispatchEvent(new CustomEvent('cartUpdated')); 
                    }}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Resumo da Compra</h3>
            
            <div className="summary-values">
              <div className="summary-line">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} itens)</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="summary-line">
                <span>Desconto</span>
                <span>- R$ {discount.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="summary-delivery">
                <span>Entrega</span>
                <span>Correios - Avenida Tupi 0000 - Pato Branco - 5 DIAS</span>
              </div>
              <div className="summary-line total">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <div className="installments">
              10x de R$ {(total / 10).toFixed(2).replace('.', ',')}
            </div>
            <div className="coupon">
              <input type="text" placeholder="CUPOM" />
            </div>

            <button className="checkout-button" onClick={() => navigate("/login")}>
              FINALIZAR COMPRA
            </button>

            <button
              className="clear-cart-button"
              onClick={() => {
                onClear(); 
                window.dispatchEvent(new CustomEvent('cartUpdated')); 
              }}
            >
              Limpar Carrinho
            </button>

            <a href="/" className="continue-link">Continuar Comprando</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;