import { Routes, Route } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { useAppContext } from "./Context/AppContext";
import NotFound from "./Pages/NotFound";

// Lazy-loaded public pages
const Home = lazy(() => import("./Pages/Home/Home"));
const Menus = lazy(() => import("./Pages/Menus/Menus"));
const Locations = lazy(() => import("./Pages/Locations/Locations"));
const Blogs = lazy(() => import("./Pages/Blogs/Blogs"));
const ContactSection = lazy(() => import("./Pages/Contact/contact"));
const About = lazy(() => import("./Pages/About/About"));
const DishDetail = lazy(() => import("./Pages/Detail/DishDetail"));
const SearchResults = lazy(() => import("./Pages/SearchResults/SearchResults"));

// Lazy-loaded user-protected pages
const CartPage = lazy(() => import("./Pages/Cart/CartPage"));
const AddAddressPage = lazy(() => import("./Pages/AddAddress/AddAddressPage"));
const MyOrders = lazy(() => import("./Pages/Orders/myOrders"));
const Loader = lazy(() => import("./components/Loading"));

const EditProfile = lazy(() => import("./Pages/EditProfile/EditProfile"));

// Lazy-loaded seller pages
const SellerLayout = lazy(() => import("./Pages/Seller/SellerLayout"));
const AddProduct = lazy(() => import("./Pages/Seller/AddProduct"));
const ViewProducts = lazy(() => import("./Pages/Seller/viewProducts"));
const SellerLogin = lazy(() => import("./Pages/Seller/SellerLogin"));
const DashboardOverview = lazy(() => import("./Pages/Seller/dashboard"));
const GetOrders = lazy(() => import("./Pages/Seller/getOrders"));

/* eslint-disable */
const ProtectedRoute = ({ children }) => {
  const { user, setShowLogin, loadingUser } = useAppContext();

  useEffect(() => {
    if (!loadingUser && !user) {
      setShowLogin(true);
    }
  }, [user, loadingUser, setShowLogin]);

  if (loadingUser) {
    return <div className="route-loading">Checking authentication...</div>;
  }

  return user ? children : null;
};

const AppRoutes = () => {
  const { seller, loading } = useAppContext(); // Optional: loading seller check

  return (
    <Suspense fallback={<div className="route-loading">Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menus" element={<Menus />} />
        <Route path="/location" element={<Locations />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/menu/:id" element={<DishDetail />} />
        <Route path="/search" element={<SearchResults />} />

        {/* User-Protected Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-address"
          element={
            <ProtectedRoute>
              <AddAddressPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        {/* Seller Routes */}
        <Route
          path="/seller/*"
          element={seller ? <SellerLayout /> : <SellerLogin />}
        >
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="view-products" element={<ViewProducts />} />
          <Route path="get-orders" element={<GetOrders />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
