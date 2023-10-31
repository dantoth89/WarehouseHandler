import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './pages/Login.jsx'

import SupplierList from "./pages/Supplier/SupplierList.jsx";
import SupplierAdd from "./pages/Supplier/SupplierAdd.jsx";
import SupplierInfo from "./pages/Supplier/SupplierInfo.jsx";

import ProductList from "./pages/Product/ProductList.jsx";
import ProductInfo from "./pages/Product/ProductInfo.jsx";
import ProductAdd from "./pages/Product/ProductAdd.jsx";

import LocationList from "./pages/Location/LocationList.jsx";
import LocationAdd from "./pages/Location/LocationAdd.jsx";
import LocationInfo from "./pages/Location/LocationInfo.jsx";

import InventoryList from "./pages/Inventory/InventoryList.jsx";
import InventoryInfo from "./pages/Inventory/InventoryInfo.jsx";
import InventoryAdd from "./pages/Inventory/InventoryAdd.jsx";

import OrderList from "./pages/Order/OrderList.jsx";
import OrderAdd from "./pages/Order/OrderAdd.jsx";
import OrderInfo from "./pages/Order/OrderInfo.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/suppliers",
    element: <SupplierList />,
  },
  {
    path: "/locations",
    element: <LocationList />,
  },
  {
    path: "/productinfo/:id",
    element: <ProductInfo />,
  },
  {
    path: "/addsupplier",
    element: <SupplierAdd />,
  },
  {
    path: "/supplierinfo/:id",
    element: <SupplierInfo />,
  },
  {
    path: "/addproduct",
    element: <ProductAdd />,
  },
  {
    path: "/inventories",
    element: <InventoryList />,
  },
  {
    path: "/inventoryinfo/:id",
    element: <InventoryInfo />,
  },
  {
    path: "/addlocation",
    element: <LocationAdd />,
  },
  {
    path: "/locationinfo/:id",
    element: <LocationInfo />,
  },
  {
    path: "/addinventory",
    element: <InventoryAdd />,
  },
  {
    path: "/orders",
    element: <OrderList />,
  },
  {
    path: "/addorder",
    element: <OrderAdd />,
  },
  {
    path: "/orderinfo/:id",
    element: <OrderInfo />,
  },
],
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
