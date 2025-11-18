import React from 'react'; 
import Cart from '../components/Cart';
import Breadcrumbs from "../components/Breadcrumbs";
import ProductSection from '../components/ProductSection';
import { useCart } from "../Hooks/useCart";
import { useProducts } from "../Hooks/useProduct"; 
import { useFilteredProducts } from "../Hooks/useFilteredProducts"; 

function CartPage() {

  const {cartItems, setCartItems, removeItem, clearCart} = useCart();
  const { data: allProducts } = useProducts();
  const { maisProcurados } = useFilteredProducts(allProducts);

  return (
    <div>
      <Breadcrumbs />
      
      <Cart 
        cartItems={cartItems} 
        setCartItems={setCartItems} 
        onRemove={removeItem} 
        onClear={clearCart} 
      />
      {maisProcurados.length > 0 && (
        <ProductSection 
          title="VOCÊ TAMBÉM PODE GOSTAR" 
          products={maisProcurados} 
        />
      )}
    </div>
  );
}

export default CartPage;