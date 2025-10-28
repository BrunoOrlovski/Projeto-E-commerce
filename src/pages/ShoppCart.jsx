
import React, { useState, useEffect } from 'react';
import Cart from '../components/Cart';
import Breadcrumbs from "../components/Breadcrumbs";
import ProductSection from '../components/ProductSection';
import { breadcrumb, relacionados } from "../data";

function CartPage() {

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    return storedCart;
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemove = (id) => {
    const confirm = window.confirm("Deseja remover este item?");
    if (confirm) {
      const updatedCart = cartItems.filter(item => item.id !== id);
      setCartItems(updatedCart);
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  };

  const clearCart = () => {
    const confirm = window.confirm("Deseja remover todos os itens do carrinho?");
    if (confirm) {
      setCartItems([]);
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  };

  return (
    <div>
      <Breadcrumbs items={breadcrumb} />
      <Cart 
        cartItems={cartItems} 
        setCartItems={setCartItems} 
        onRemove={handleRemove} 
        onClear={clearCart} 
      />
      <ProductSection 
        title="Relacionados" 
        products={relacionados} 
      />
    </div>
  );
}

export default CartPage;
