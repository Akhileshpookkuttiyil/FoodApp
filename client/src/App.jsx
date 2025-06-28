import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./ScrolltoTop";

import Home from "./Pages/Home/Home";
import Menus from "./Pages/Menus/Menus";
import Locations from "./Pages/Locations/Locations";
import Blogs from "./Pages/Blogs/Blogs";
import ContactSection from "./Pages/Contact/contact";
import About from "./Pages/About/About";
import CartPage from "./Pages/Cart/CartPage";
import AddAddressPage from "./Pages/AddAddress/AddAddressPage";
import DishDetail from "./Pages/Detail/DishDetail";
import AuthPage from "./Pages/Auth/AuthPage";
import SellerLayout from "./Pages/Seller/SellerLayout";

import { useAppContext } from "./Context/AppContext";
import AddProduct from "./Pages/Seller/AddProduct";
import ViewProducts from "./Pages/Seller/viewProducts";
import SellerLogin from "./Pages/Seller/SellerLogin";
import MyOrders from "./Pages/Seller/MyOrders";
import SearchResults from "./Pages/SearchResults/SearchResults";

function AppContent() {
  const { showLogin, seller } = useAppContext();
  const location = useLocation();

  const isSellerRoute = location.pathname.startsWith("/seller");

  return (
    <>
      <Toaster />
      <ScrollToTop />

      {!isSellerRoute && <Navbar />}

      <div
        className={`${
          !isSellerRoute ? "flex flex-col min-h-screen bg-neutral-100/40" : ""
        }`}
      >
        <Routes>
          {/* User-Facing Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/location" element={<Locations />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/add-address" element={<AddAddressPage />} />
          <Route path="/menu/:id" element={<DishDetail />} />
          <Route path="/search" element={<SearchResults />} />

          {/* Seller Routes - Protected inside layout */}
          <Route
            path="/seller/*"
            element={seller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route path="add-product" element={<AddProduct />} />
            <Route path="view-products" element={<ViewProducts />} />
            <Route path="orders" element={<MyOrders />} />
          </Route>
        </Routes>

        {/* Auth modals */}
        {showLogin && <AuthPage />}
      </div>

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
