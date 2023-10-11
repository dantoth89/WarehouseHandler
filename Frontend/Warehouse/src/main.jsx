import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './pages/Login.jsx'
import Navbar from "./pages/Navbar.jsx";

import SupplierList from "./pages/Supplier/SupplierList.jsx";
import SupplierAdd from "./pages/Supplier/SupplierAdd.jsx";
import SupplierUpdate from "./pages/Supplier/SupplierUpdate.jsx";

import ProductList from "./pages/Product/ProductList.jsx";
import ProductUpdate from "./pages/Product/ProductUpdate.jsx";
import ProductAdd from "./pages/Product/ProductAdd.jsx";

import LocationList from "./pages/Location/LocationList.jsx";


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
    path: "/supplierupdate/:id",
    element: <SupplierUpdate />,
  },
  {
    path: "/productadd",
    element: <ProductAdd />,
  },
],
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />{Navbar}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
