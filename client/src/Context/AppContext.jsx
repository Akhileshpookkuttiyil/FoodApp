import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [seller, setSeller] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const currency = "₹";
  const MAX_QUANTITY = 99;

  const checkSessionValid = async () => {
    let errorShown = false;
    try {
      const { data } = await axios.get("/api/user/checkAuth");
      if (!data.success || !data.user) {
        errorShown = true;
        throw new Error("Invalid session");
      }
      return true;
    } catch (err) {
      console.log(err.message);
      setUser(null);
      setCartItems([]);
      setShowLogin(true);
      if (!errorShown) toast.error("Session expired. Please log in again.");
      return false;
    }
  };

  // ========== AUTH ==========
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
    setLoadingUser(true);

    try {
      const { data } = await axios.get("/api/user/checkAuth");

      if (!data.success || !data.user) {
        setUser(null);
        setCartItems([]);
        return;
      }

      const user = data.user;
      setUser(user);

      if (Array.isArray(user.cartItems)) {
        loadCartItems(user.cartItems);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error.message);
      setUser(null);
      setCartItems([]);
    } finally {
      setLoadingUser(false);
    }
  };

  const logoutSeller = async () => {
    try {
      const { data } = await axios.post("/api/seller/logout");
      if (data.success) toast.success("Logged out successfully.");
      else toast.error(data.message || "Logout response was not successful.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    } finally {
      setSeller(null);
      setCartItems([]); // Clear cart on logout
    }
  };

  // ========== CART ==========
  const addToCart = async (newItem, selectedQuantity = 1) => {
    if (!(await checkSessionValid())) return false;

    const validQuantity = Math.min(selectedQuantity, MAX_QUANTITY);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (!existingItem) {
        toast.success(`${newItem.name} added to cart!`);
        return [...prevItems, { ...newItem, qty: validQuantity }];
      }
      toast.error(`${newItem.name} is already in the cart.`);
      return prevItems;
    });
  };

  const updateItemQuantity = async (itemId, quantityChange) => {
    if (!(await checkSessionValid())) return false;

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const newQty = Math.min(
            Math.max(1, item.qty + quantityChange),
            MAX_QUANTITY
          );
          if (newQty === item.qty) return item;
          toast.success("Cart updated");
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  const removeItemFromCart = async (itemId) => {
    if (!(await checkSessionValid())) return false;
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === itemId);
      if (item) toast.success(`${item.name} removed from cart.`);
      return prevItems.filter((item) => item.id !== itemId);
    });
  };

  const clearCart = async () => {
    if (!(await checkSessionValid())) return false;
    setCartItems([]);
  };

  const cartTotalAmount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.qty * item.price, 0);
  }, [cartItems]);

  const loadCartItems = (items) => {
    if (!Array.isArray(items)) return;
    const normalized = items.map((cartItem) => ({
      id: cartItem.item?._id || cartItem.id,
      name: cartItem.item?.name || cartItem.name,
      price: cartItem.item?.price || cartItem.price,
      offerPrice: cartItem.item?.offerPrice || cartItem.price,
      qty: cartItem.quantity || cartItem.qty,
      hotel: cartItem.item?.restaurant?.name || cartItem.hotel || "Unknown",
      image: cartItem.item?.images?.[0] || cartItem.image,
    }));
    setCartItems(normalized);
  };

  // ========== SYNC ==========
  useEffect(() => {
    fetchSeller();
    fetchUser();
  }, []);

  const hasMountedCartSync = useRef(false);
  useEffect(() => {
    if (!user) return;

    if (!hasMountedCartSync.current) {
      hasMountedCartSync.current = true;
      return;
    }

    const updateCart = async () => {
      const formatted = cartItems.map((item) => ({
        item: item.id,
        quantity: item.qty,
      }));
      try {
        const { data } = await axios.post("/api/cart/update", {
          cartItems: formatted,
        });
        if (!data.success) toast.error(data.message || "Cart sync failed.");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error syncing cart.");
      }
    };

    updateCart();
  }, [cartItems, user]);

  return (
    <AppContext.Provider
      value={{
        user,
        seller,
        axios,
        currency,
        showLogin,
        loading,
        loadingUser,
        setUser,
        setSeller,
        setShowLogin,
        loginSeller,
        logoutSeller,
        fetchSeller,
        fetchUser,
        cartItems,
        setCartItems,
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
