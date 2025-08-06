import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "leaflet/dist/leaflet.css";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppProvider } from "./Context/AppContext.jsx";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <AppProvider>
      <App />
    </AppProvider>
  </GoogleOAuthProvider>
  // </React.StrictMode>
);
