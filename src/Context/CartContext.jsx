import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// Create a Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Helper function to update cart items
  const updateCartItems = (updatedItems) => {
    setCartItems(updatedItems);
  };

  // Add or update item in the cart
  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        // If item exists, update its quantity
        return prevItems.map((item) =>
          item.id === newItem.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      // If item doesn't exist, add it with qty 1
      return [...prevItems, { ...newItem, qty: 1 }];
    });
  };

  // Update item quantity (increment/decrement)
  const updateItemQuantity = (itemId, quantityChange) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              qty: Math.max(1, item.qty + quantityChange), // Prevent qty from going below 1
            }
          : item
      )
    );
  };

  // Remove item from the cart
  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Clear the entire cart
  const clearCart = () => {
    updateCartItems([]); // Clear all items
  };

  // Calculate total amount
  const cartTotalAmount = cartItems.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        updateItemQuantity,
        removeItemFromCart,
        clearCart,
        cartTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Prop validation for CartProvider
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use Cart Context
export const useCart = () => useContext(CartContext);
