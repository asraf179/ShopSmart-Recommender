import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Recommended from "../Pages/Recommended/Recommended";
import ProductDetails from "../components/ProductDetails";
import PrivateRoutes from '../AuthProvider/PrivateRoutes'
  import { CartRoute } from "../Cart/CartRoute";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Search_result from "../Pages/Search_result";
import FavouriteItems from "../Pages/Favourite";
import EntryPage from "../Pages/Entry_page/EntryPage";


const router=createBrowserRouter([
        {
          
          path: "/",
          element:<PrivateRoutes><Root></Root></PrivateRoutes> ,
            
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
          {
            path:'/search_result',
            element:<Search_result></Search_result>
          }
         

          ]
       
        },
          {
            path:"/entry",
            element:<EntryPage></EntryPage>
          },
        {
          path:"/favourite",
          element:<FavouriteItems></FavouriteItems>
        }
      ],
      
    )

export default router;