import React, { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [contentBasedRecommendations, setContentBasedRecommendations] = useState([]);
  const[collaborativeBasedRecommendation,setCollaborativeBasedRecommendation]=useState([])
  const [popularityBasedRecommendations, setPopularityBasedRecommendations] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const[recentlyViewed,setRecentlyViewed]=useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const{user}=useContext(AuthContext)

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Load All Products
    axios
      .get("http://127.0.0.1:8000/api/products/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.log("Error fetching products", err));

    // Load Content-Based Recommendations
    axios
      .get("http://127.0.0.1:8000/api/content_recommend/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        let parsedData = res.data;
        if (typeof parsedData === "string") {
          parsedData = JSON.parse(parsedData);
        }
        setContentBasedRecommendations(parsedData);
      })
      .catch((err) => console.error("Content-based error", err));

      // collaborative based recommendation
      axios.get("http://127.0.0.1:8000/api/collaborative_similar_product/", {
  headers: { Authorization: `Bearer ${token}` }
})
.then(res => {
  console.log(res.data);// recommended products
  setCollaborativeBasedRecommendation(res.data)
})
.catch(err => {
  console.error(err);
});

    // Load Popularity-Based Recommendations
    axios
      .get("http://127.0.0.1:8000/api/popular-products/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPopularityBasedRecommendations(res.data))
      .catch((err) => console.error("Popularity-based error", err));

      //search history
       axios
      .get("http://127.0.0.1:8000/api/search_history/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSearchHistory(res.data))
      .catch((err) => console.log("Error fetching products", err));
  }, [user]);

//fetch viewed product last 2 days
useEffect(()=>{
   const token = localStorage.getItem("token");
  axios.get("http://127.0.0.1:8000/api/viewed-product/recent/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res)=>setRecentlyViewed(res.data))
    .catch((error)=>console.log(error))
},[user])

const saveViewedProduct = async (product) => {
  const token = localStorage.getItem("token");
  try {
    await axios.post(
      "http://127.0.0.1:8000/api/viewed-product/save/",
      { product_id: product.product_id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    recentlyViewed.append(product)
  } catch (error) {
    console.error("Error saving viewed product:", error);
  }
};
const handleProductClick = useCallback((product) => {
  setSelectedProduct(prev => {
    // Avoid setting state if it's the same product
    if (prev?.product_id === product.product_id) return prev;
    return product;
  });
}, []);
  return (
    <DataContext.Provider
      value={{
        allProducts,
        contentBasedRecommendations,
        popularityBasedRecommendations,
        searchHistory,
        saveViewedProduct,
        recentlyViewed,
        setRecentlyViewed,
        selectedProduct,
        handleProductClick,
        setSelectedProduct,
        collaborativeBasedRecommendation
        

      }}
    >
      {children}
    </DataContext.Provider>
  );
};
