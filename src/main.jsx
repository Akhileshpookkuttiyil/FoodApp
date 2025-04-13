import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StoreProvider } from "./context/StoreContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CartProvider } from './Context/CartContext.jsx'; // Add CartProvider import

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <StoreProvider>
        <CartProvider> {/* Wrap your app with CartProvider */}
          <App />
        </CartProvider>
      </StoreProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
