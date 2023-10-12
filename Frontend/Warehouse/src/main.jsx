import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './pages/Login.jsx'
import Navbar from "./pages/Navbar.jsx";

import SupplierList from "./pages/Supplier/SupplierList.jsx";
import SupplierAdd from "./pages/Supplier/SupplierAdd.jsx";
import SupplierInfo from "./pages/Supplier/SupplierInfo.jsx";

import ProductList from "./pages/Product/ProductList.jsx";
import ProductUpdate from "./pages/Product/ProductUpdate.jsx";
import ProductAdd from "./pages/Product/ProductAdd.jsx";

import LocationList from "./pages/Location/LocationList.jsx";
import LocationAdd from "./pages/Location/LocationAdd.jsx";
import LocationInfo from "./pages/Location/LocationInfo.jsx";

import InventoryList from "./pages/Inventory/InventoryList.jsx";
import InventoryInfo from "./pages/Inventory/InventoryInfo.jsx";
import InventoryAdd from "./pages/Inventory/InventoryAdd.jsx";


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
    path: "/productupdate/:id",
    element: <ProductUpdate />,
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
    path: "/productadd",
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
    path: "/locationadd",
    element: <LocationAdd />,
  },
  {
    path: "/locationinfo/:id",
    element: <LocationInfo />,
  },
  {
    path: "/inventoryadd",
    element: <InventoryAdd />,
  },
],
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />{Navbar}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
