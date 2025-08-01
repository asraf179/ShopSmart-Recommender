import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./Routes/Routes.jsx";
import { AuthProvider } from "./AuthProvider/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import { CartProvider } from "./CartProvider/CartProvider.jsx";
import { FavouriteProvider } from "./FavouriteProvider/FavouriteProvider.jsx";
import { DataProvider } from "./DataProvider/DataProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <FavouriteProvider>
          <CartProvider>
            <RouterProvider router={router}></RouterProvider>
          </CartProvider>
        </FavouriteProvider>
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>
);
