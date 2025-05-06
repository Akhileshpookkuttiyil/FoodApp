import { createContext, useContext, useState ,useEffect } from "react";
import PropTypes from "prop-types";

// Create a Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Helper function to update cart items array
  const updateCartItems = (updatedItems) => {
    setCartItems(updatedItems);
  };

  // Add item to cart or update quantity if already exists
  const addToCart = (newItem, selectedQuantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, qty: item.qty + selectedQuantity }
            : item
        );
      }
      return [...prevItems, { ...newItem, qty: selectedQuantity }];
    });
  };

  useEffect(() => {
    console.log("Cart updated:", cartItems);
  }, [cartItems]);

  // Update item quantity (increment or decrement)
  const updateItemQuantity = (itemId, quantityChange) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, qty: Math.max(1, item.qty + quantityChange) }
          : item
      )
    );
  };

  // Remove an item from the cart
  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Clear all items from the cart
  const clearCart = () => {
    updateCartItems([]);
  };

  // Calculate total cart value
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

// Custom hook to use the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
