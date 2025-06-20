import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Axios global config
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// Create Auth Context
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Logged-in user
  const [seller, setSeller] = useState(null); // Logged-in seller
  const [showLogin, setShowLogin] = useState(false); // Modal toggle (if applicable)
  const [loading, setLoading] = useState(true); // Auth check loading state

  // ===================== Dummy User Login =====================
  const loginUser = () => {
    setUser({
      name: "John Doe",
      email: "john@example.com",
      avatar: null,
    });
    setShowLogin(false);
  };

  // ===================== Seller Login =====================
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
      console.error("Seller login failed:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed.",
      };
    }
  };

  // ===================== Check Seller Session =====================
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/checkAuth");

      if (data.success) {
        setSeller(data.seller || data.user); // depends on backend key
      } else {
        setSeller(null);
      }
    } catch (error) {
      console.warn("Seller session check failed:", error.message);
      setSeller(null);
    } finally {
      setLoading(false);
    }
  };

  // ===================== Logout =====================
  const logoutUser = () => {
    setUser(null);
    // Optionally call backend logout route
  };

  const logoutSeller = async () => {
    try {
      const { data } = await axios.post("/api/seller/logout");

      if (data.success) {
        toast.success("Logged out successfully.");
      } else {
        toast.error(data.message || "Logout response was not successful.");
      }

      setSeller(null); // Clear seller from context
    } catch (error) {
      console.error("Seller logout failed:", error);
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    } finally {
      setSeller(null); // Ensure state is cleared even if request fails
    }
  };

  // Auto-check seller auth on mount
  useEffect(() => {
    fetchSeller();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        seller,
        showLogin,
        loading,
        setUser,
        setSeller,
        setShowLogin,
        loginUser,
        loginSeller,
        logoutUser,
        logoutSeller,
        fetchSeller,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the context
export const useAuthContext = () => useContext(AuthContext);
