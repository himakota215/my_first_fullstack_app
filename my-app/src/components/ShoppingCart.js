import React from 'react';
import { useCart } from '../contexts/CartContext';

function ShoppingCart() {
  const { cartItems, removeItemFromCart, updateItemQuantity } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className='shopping-cart'>
      <h3>Shopping Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
              <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
              <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>>
      )}
      <p>Total: ${calculateTotal().toFixed(2)}</p>
      {/* Add a checkout button here */}
    </div>
  );
}

export default ShoppingCart;
