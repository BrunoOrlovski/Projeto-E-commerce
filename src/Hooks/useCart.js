import { useState, useEffect } from 'react';

export function useCart() {
  

  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      return storedCart;
    } catch (error) {
      console.error("Falha ao ler o carrinho do localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      window.dispatchEvent(new CustomEvent('cartUpdated')); 
    } catch (error) {
      console.error("Falha ao salvar o carrinho no localStorage:", error);
    }
  }, [cartItems]);

  const removeItem = (id) => {
    const confirm = window.confirm("Deseja remover este item?");
    if (confirm) {
      const updatedCart = cartItems.filter(item => item.id !== id);
      setCartItems(updatedCart);
      
    }
  };

  const clearCart = () => {
    const confirm = window.confirm("Deseja remover todos os itens do carrinho?");
    if (confirm) {
      setCartItems([]);
      
    }
  };

  return { 
    cartItems,    
    setCartItems, 
    removeItem,   
    clearCart    
  };
}