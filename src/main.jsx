
import  React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './Routes/Routes.jsx';
import { AuthProvider } from './AuthProvider/AuthProvider.jsx';
import {
  RouterProvider,
} from "react-router-dom";
import { CartProvider } from './CartProvider/CartProvider.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router}></RouterProvider>
      </CartProvider>
      
    </AuthProvider>
  </React.StrictMode>,
)
