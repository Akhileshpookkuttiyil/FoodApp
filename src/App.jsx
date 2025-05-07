import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Menus from "./Pages/Menus/Menus";
import Locations from "./Pages/Locations/Locations";
import ScrollToTop from "./ScrolltoTop";
import Blogs from "./Pages/Blogs/Blogs";
import ContactSection from "./Pages/Contact/contact";
import About from "./Pages/About/About";
import AuthPage from "./Pages/Auth/AuthPage";
import CartPage from "./Pages/Cart/CartPage";
import DishDetail from "./Pages/Detail/DishDetail";
import { useAuthContext } from "./Context/AuthContext"; // Import the context
import { Toaster } from "react-hot-toast";
import AddAddressPage from "./Pages/AddAddress/AddAddressPage";

function App() {
  // Manage the showLogin state directly in App
  const { showLogin } = useAuthContext();

  return (
    <Router>
      <Toaster />

      <div className="w-full min-h-screen bg-neutral-100/40 flex flex-col">
        <ScrollToTop />
        {/* Pass setShowLogin to Navbar */}
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/menus" element={<Menus />} />
          <Route exact path="/location" element={<Locations />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/contact" element={<ContactSection />} />
          <Route exact path="/about" element={<About />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/add-address" element={<AddAddressPage />} />
          <Route path="/menu/:id" element={<DishDetail />} />
        </Routes>

        {/* Conditionally render AuthPage based on showLogin */}
        {showLogin && <AuthPage />}

        <Footer />
      </div>
    </Router>
  );
}
export default App;
