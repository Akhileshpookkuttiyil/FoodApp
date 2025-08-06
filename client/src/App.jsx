import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./ScrolltoTop";
import AppRoutes from "./routes.jsx";
import AdminRoutes from "./AdminRoutes.jsx";
import { useAppContext } from "./Context/AppContext.jsx";
import AuthPage from "./Pages/Auth/AuthPage";


function AppContent() {
  const location = useLocation();
  const { showLogin } = useAppContext();
  const isSellerRoute = location.pathname.startsWith("/seller");
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <Toaster />
      <ScrollToTop />

      {!isSellerRoute && !isAdminRoute && <Navbar />}

      <main
        className={
          isSellerRoute || isAdminRoute
            ? ""
            : "flex flex-col min-h-screen bg-neutral-100/40"
        }
      >
        {isAdminRoute ? <AdminRoutes /> : <AppRoutes />}
        {showLogin && <AuthPage />}
      </main>

      {!isSellerRoute && !isAdminRoute && <Footer />}
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
