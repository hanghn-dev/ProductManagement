import LayoutAdmin from "../layouts/admin/LayoutAdmin";
import DashboardPage from "../pages/admin/DashboardPage";
import ProductManagement from "../pages/admin/products/ProductManagement";
import ProductFormPage from "../pages/admin/products/ProductFormPage";
import OrderManagement from "../pages/admin/OrderManagement";

const adminRoutes = {
  path: "/admin",
  element: <LayoutAdmin />,
  children: [
    { path: "", element: <DashboardPage /> },
    { path: "products", element: <ProductManagement /> },
    { path: "products/add", element: <ProductFormPage /> },
    { path: "products/update/:id", element: <ProductFormPage /> },
    { path: "orders", element: <OrderManagement /> },
  ],
};

export default adminRoutes;