import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Recommended from "../Pages/Recommended/Recommended";
import ProductDetails from "../components/ProductDetails";
import PrivateRoutes from '../AuthProvider/PrivateRoutes'
  import { CartRoute } from "../Cart/CartRoute";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router=createBrowserRouter([
        {
          path: "/",
          element: <Root></Root>,
         // errorElement:<ErrorPage></ErrorPage>,
          children:[
            {
              path:'/',
              element:<Home></Home>
            },
            {
              path:'/recommended',
              element:<PrivateRoutes><Recommended></Recommended></PrivateRoutes>
            },
            {
            path:'/details',
            element:<ProductDetails></ProductDetails>
            },
          {
              path:'/cart',
            element:<CartRoute></CartRoute>
          },
         

          ]
        },
        
             {
          path:"/login",
          element:<Login></Login>,
        },
        {
          path:'/register',
          element:<Register></Register>
        }
     
      ])

export default router;