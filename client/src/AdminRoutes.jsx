import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./Pages/admin/components/AdminLayout";
import Dashboard from "./Pages/admin/pages/Dashboard";
import Users from "./Pages/admin/pages/UserManagement";
import Sellers from "./Pages/admin/pages/SellerManagement";
import Restaurants from "./Pages/admin/pages/RestaurantManagement";
import Orders from "./Pages/admin/pages/OrderManagement";
import ProductsContent from "./Pages/admin/pages/ProductManagement";
import AddRestaurant from "./Pages/admin/pages/addRestaurant";

const AdminRoutes = () => (
  <Routes>
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="users" element={<Users />} />
      <Route path="sellers" element={<Sellers />} />
      <Route path="restaurants" element={<Restaurants />} />
      <Route path="products" element={<ProductsContent />} />
      <Route path="orders" element={<Orders />} />
      <Route path="add-Restaurant" element={<AddRestaurant />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
