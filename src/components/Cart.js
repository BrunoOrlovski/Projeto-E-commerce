import React from 'react';
import '../styles/Cart.css';

function Cart({ cartItems, setCartItems, onRemove }) {

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

 
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>SEU CARRINHO</h2>

      <div className="cart-content">
        
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} />

              <div className="item-info">
                <h3>{item.name}</h3>
                <p>Tamanho: {item.size}</p>
                <p>Cor: {item.color}</p>
                <p>R$ {item.price.toFixed(2).replace('.', ',')}</p>
              </div>

              <div className="item-actions">
                <div className="quantity-control">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
                <button
                  onClick={() => {
                    const confirmRemove = window.confirm(`Deseja remover "${item.name}" do carrinho?`);
                    if (confirmRemove) {
                      onRemove(item.id);
                    }
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
              <span>Subtotal ({cartItems.length} itens)</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>

            <div className="summary-delivery">
              <span>Entrega</span>
              <span>Correios - Avenida Tupi 0000 - Pato Branco - 5 DIAS</span>
            </div>

            <div className="summary-line total">
              <span>Total</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <div className="installments">
            10x de R$ {(subtotal / 10).toFixed(2).replace('.', ',')}
          </div>

          <div className="coupon">
            <input type="text" placeholder="CUPOM" />
          </div>

          <button className="checkout-button">FINALIZAR COMPRA</button>
          <a href="/" className="continue-link">Continuar Comprando</a>
        </div>
      </div>
    </div>
  );
}

export default Cart;
