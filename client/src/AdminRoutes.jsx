import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./Pages/admin/components/AdminLayout";
import Dashboard from "./Pages/admin/pages/Dashboard";
import Users from "./Pages/admin/pages/UserManagement";
import Sellers from "./Pages/admin/pages/SellerManagement";
import Restaurants from "./Pages/admin/pages/RestaurantManagement";
import Orders from "./Pages/admin/pages/OrderManagement";

const AdminRoutes = () => (
  <Routes>
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="users" element={<Users />} />
      <Route path="sellers" element={<Sellers />} />
      <Route path="restaurants" element={<Restaurants />} />
      <Route path="orders" element={<Orders />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
