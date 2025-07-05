import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./ScrolltoTop";
import AuthPage from "./Pages/Auth/AuthPage";
import AppRoutes from "./routes.jsx";

import { useAppContext } from "./Context/AppContext";

function AppContent() {
  const { showLogin } = useAppContext();
  const location = useLocation();
  const isSellerRoute = location.pathname.startsWith("/seller");

  return (
    <>
      <Toaster />
      <ScrollToTop />

      {!isSellerRoute && <Navbar />}

      <main
        className={
          isSellerRoute ? "" : "flex flex-col min-h-screen bg-neutral-100/40"
        }
      >
        <AppRoutes />
        {showLogin && <AuthPage />}
      </main>

      {!isSellerRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
