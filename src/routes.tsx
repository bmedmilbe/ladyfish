import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import PrivateLayout from "./pages/PrivateLayout";
import SupplierPage from "./pages/SupplierPage";
import SuppliersPage from "./pages/SuppliersPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "login/", element: <LoginPage /> }],
  },
  {
    element: <PrivateLayout />,
    children: [
      { index: true, element: <SuppliersPage /> },
      { path: "suppliers/:id/", element: <SupplierPage /> },
      { path: "suppliers/:id/orders/:order_id", element: <OrderPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:id/", element: <ProductPage /> },
    ],
  },
]);

export default routes;
