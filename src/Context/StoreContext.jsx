import { createContext, useState, useEffect } from "react";

// 1. Create context
export const StoreContext = createContext();

// 2. Provider component
export const StoreProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  //  Replace this with your actual backend API base URL
  const url = "https://api.foodiemania.com"; // example placeholder

  // Keep token in localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <StoreContext.Provider value={{ token, setToken, url }}>
      {children}
    </StoreContext.Provider>
  );
};
