import { createContext, useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import toast from "react-hot-toast";

// Axios global config
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // ======== States ========
  const [user, setUser] = useState(null);
  const [seller, setSeller] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const currency = "₹";
  const MAX_QUANTITY = 99;

  // ======== Auth Functions ========

  const loginSeller = async ({ email, password }) => {
    try {
      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });
      if (data.success) {
        setSeller(data.seller);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed.",
      };
    }
  };

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/checkAuth");
      if (data.success) {
        setSeller(data.seller || data.user);
      } else {
        setSeller(null);
      }
    } catch (error) {
      console.log("Seller session check failed:", error.message);
      setSeller(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/checkAuth");
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(
        "Auth check failed:",
        error.response?.data || error.message
      );
      setUser(null);
    }
  };

  const logoutSeller = async () => {
    try {
      const { data } = await axios.post("/api/seller/logout");
      if (data.success) {
        toast.success("Logged out successfully.");
      } else {
        toast.error(data.message || "Logout response was not successful.");
      }
      setSeller(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    } finally {
      setSeller(null);
    }
  };

  // ======== Cart Helpers ========

  const findItemById = (id) => cartItems.find((item) => item.id === id);

  const addToCart = (newItem, selectedQuantity = 1) => {
    if (!user) {
      toast.error("You need to be logged in to add items to the cart.");
      return;
    }

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
    if (!user) {
      toast.error("You need to be logged in to update the cart.");
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
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
      })
    );
  };

  const removeItemFromCart = (itemId) => {
    if (!user) {
      toast.error("You need to be logged in to remove items from the cart.");
      return;
    }

    const removedItem = findItemById(itemId);
    if (removedItem) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
      toast.success(`${removedItem.name} removed from cart.`);
    }
  };

  const clearCart = () => {
    if (!user) {
      toast.error("You need to be logged in to clear the cart.");
      return;
    }
    setCartItems([]);
  };

  const cartTotalAmount = cartItems.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  const loadCartItems = (items) => {
    const normalized = items.map((cartItem) => ({
      id: cartItem.item._id,
      name: cartItem.item.name,
      price: cartItem.item.price,
      qty: cartItem.quantity,
      hotel: cartItem.item.restaurant?.name || "Unknown Restaurant",
      image: cartItem.item.images[0],
    }));
    setCartItems(normalized);
  };

  // ======== Effects ========

  useEffect(() => {
    fetchSeller();
    fetchUser();
  }, []);

  // Load cart items from user data when available
  useEffect(() => {
    if (user?.cartItems) {
      loadCartItems(user.cartItems);
    }
  }, [user?.cartItems]);

  // Sync cart with backend — skip first render
  const hasMountedCartSync = useRef(false);
  useEffect(() => {
    if (!user || cartItems.length === 0) return;

    if (!hasMountedCartSync.current) {
      hasMountedCartSync.current = true;
      return;
    }

    const updateCart = async () => {
      const formattedCartItems = cartItems.map((item) => ({
        item: item.id,
        quantity: item.qty,
      }));

      try {
        const { data } = await axios.post("/api/cart/update", {
          cartItems: formattedCartItems,
        });
        if (!data.success) {
          toast.error(data.message || "Cart sync failed.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error syncing cart.");
      }
    };

    updateCart();
  }, [cartItems, user]);

  // ======== Context Value ========
  return (
    <AppContext.Provider
      value={{
        // Auth
        user,
        axios,
        currency,
        seller,
        showLogin,
        loading,
        setUser,
        setSeller,
        setShowLogin,
        loginSeller,
        logoutSeller,
        fetchSeller,
        fetchUser,
        // Cart
        cartItems,
        addToCart,
        updateItemQuantity,
        removeItemFromCart,
        clearCart,
        cartTotalAmount,
        loadCartItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within an AppProvider");
  return context;
};
