import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeItemFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItemFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: null } : item
        )
      );
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};