import { createContext, useContext, useState } from "react";

// Create Context for Authentication
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User info state
  const [seller, setSeller] = useState(null); // Seller info state
  const [showLogin, setShowLogin] = useState(false); // Controls login modal visibility
  const [isSellerLogin, setIsSellerLogin] = useState(false); // Toggle between user and seller login

  // Dummy user login
  const loginUser = () => {
    setUser({
      name: "John Doe",
      email: "john@example.com",
      avatar: null,
    });
    setShowLogin(false);
  };

  const loginSeller = ({ email, password }) => {
    if (email === "seller@gmail.com" && password === "123456") {
      setSeller({ name: "Demo Seller", email, avatar: null });
      return true;
    }
    return false;
  };

  // Logout handlers
  const logoutUser = () => {
    setUser(null);
  };

  const logoutSeller = () => {
    setSeller(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        seller,
        setUser,
        setSeller,
        showLogin,
        setShowLogin,
        loginUser,
        loginSeller,
        logoutUser,
        logoutSeller,
        isSellerLogin,
        setIsSellerLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
