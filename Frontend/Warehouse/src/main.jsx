import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './pages/Login.jsx'
import ProductList from './pages/ProductList.jsx'
import Navbar from "./pages/Navbar.jsx";
import SupplierList from "./pages/SupplierList.jsx"
import LocationList from "./pages/LocationList.jsx";


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
],
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />{Navbar}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
