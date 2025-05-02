// Context/AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // initially no user
  const [showLogin, setShowLogin] = useState(false);

  // Dummy login handler
  const loginHandler = () => {
    setUser({
      name: "John Doe",
      email: "john@example.com",
      avatar: null, // optional: can use a dummy image URL here
    });
    setShowLogin(false);
  };

  // Dummy logout
  const logoutHandler = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        showLogin,
        setShowLogin,
        loginHandler,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
