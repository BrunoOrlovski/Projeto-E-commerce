import React, { useState } from 'react';
import Cart from '../components/Cart';
import Breadcrumbs from "../components/Breadcrumbs";
import ProductSection from '../components/ProductSection';
import { breadcrumb, relacionados } from "../data"; 

function CartPage() {
  const [cartItems, setCartItems] = useState([
    { 
      id: 1,
      name: 'Tênis Corre 4',
      imageUrl: '/img/correazul1.png',
      size: 42,
      color: 'Turquesa',
      price: 499.90,
      quantity: 1
    },
  ]);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  return (
  <div>
    <Breadcrumbs items={breadcrumb} />
    <Cart cartItems={cartItems} setCartItems={setCartItems} onRemove={handleRemove} />
    <ProductSection 
      title="Relacionados" 
      products={relacionados} 
    />
  </div>
);
}

export default CartPage;