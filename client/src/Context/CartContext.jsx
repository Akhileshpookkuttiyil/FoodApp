import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const MAX_QUANTITY = 99;

  const findItemById = (id) => cartItems.find((item) => item.id === id);

  const addToCart = (newItem, selectedQuantity = 1) => {
    const validQuantity = Math.min(selectedQuantity, MAX_QUANTITY);

    setCartItems((prevItems) => {
      const existingItem = findItemById(newItem.id);

      if (!existingItem) {
        toast.success(`${newItem.name} added to cart!`);
        return [...prevItems, { ...newItem, qty: validQuantity }];
      }

      toast.error(`${newItem.name} is already in the cart.`);
      return prevItems;
    });
  };

  const updateItemQuantity = (itemId, quantityChange) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === itemId) {
          const newQty = Math.min(
            Math.max(1, item.qty + quantityChange),
            MAX_QUANTITY
          );
          if (newQty !== item.qty) {
            toast.success("Cart updated");
          }
          return { ...item, qty: newQty };
        }
        return item;
      });
      return updatedItems;
    });
  };

  const removeItemFromCart = (itemId) => {
    const removedItem = findItemById(itemId);
    if (removedItem) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
      toast.success(`${removedItem.name} removed from cart.`);
    }
  };

  const clearCart = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the cart?"
    );
    if (confirmClear) {
      setCartItems([]);
      toast.success("Cart cleared.");
    }
  };

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

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
