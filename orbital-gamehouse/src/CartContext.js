import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

// Create a provider for the cart context
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    // Update the cart state by adding the new product
    setCart((Cart) => [...Cart, product]);
  };

  //   Function to Update the cart
  const updateCart = (newCart) => {
    setCart(newCart);
  };

  // Provide the context value (state and function) to child components
  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to access the cart context
export const useCart = () => {
  return useContext(CartContext); // Return the context value
};
