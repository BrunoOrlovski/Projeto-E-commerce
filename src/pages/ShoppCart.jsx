
import react from 'react';
import Cart from '../components/Cart';
import Breadcrumbs from "../components/Breadcrumbs";
import ProductSection from '../components/ProductSection';
import { breadcrumb, relacionados } from "../data";
import {useCart} from "../Hooks/useCart";


function CartPage() {

  const {cartItems, setCartItems, removeItem, clearCart} = useCart();

  return (
    <div>
      <Breadcrumbs items={breadcrumb} />
      <Cart 
        cartItems={cartItems} 
        setCartItems={setCartItems} 
        onRemove={removeItem} 
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
