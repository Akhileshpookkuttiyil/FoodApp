import { createContext, useState, useContext } from "react";

// Create AuthContext
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <AuthContext.Provider value={{ showLogin, setShowLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
