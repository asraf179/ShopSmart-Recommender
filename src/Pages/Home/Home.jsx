import React, { useContext, useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard";
import { Sidebar } from "../../components/Sidebar";
import ProductDetailsModal from "../../components/ProductDetails";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { DataContext } from "../../DataProvider/DataProvider";

const Home = () => {
    const {
    allProducts,
    contentBasedRecommendations,
    popularityBasedRecommendations,
    handleProductClick,
    selectedProduct,
    setSelectedProduct
  } = useContext(DataContext);
  
 ;

/**
 * 
 *   useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/products/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //console.log(res.data)
        setAllProducts(res.data);
      })
      .catch((err) => console.log("error"));
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:8000/api/content_recommend/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let parsedData = res.data;

        if (typeof parsedData === "string") {
          parsedData = JSON.parse(parsedData);
        }
        console.log(parsedData);

        setContenBasedRecommendation(parsedData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecommendations();
  }, []);
 */

  return (
    <div className="flex flex-col">
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to TrendCart!</h1>
        <p className="text-lg">
          Discover trending and recommended products today
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <Sidebar />

        <div className="flex-1 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">🔥 Popular Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {popularityBasedRecommendations.slice(0, 5).map((product, index) => (
                <ProductCard
                  key={`popular-${index}`}
                  product={product}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          </section>
          {/*Content based recommedation */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              ⭐ Recommended For You
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.isArray(contentBasedRecommendations) &&
              contentBasedRecommendations.length > 2 ? (
                contentBasedRecommendations
                  .slice(0, 5)
                  .map((product, index) => (
                    <ProductCard
                      key={`recommended-${index}`}
                      product={product}
                      onClick={setSelectedProduct}
                    />
                  ))
              ) : (
                <p>No product</p>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">🛍️ All Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {allProducts.slice(0, 100).map((product, index) => (
                <ProductCard
                  key={`all-${index}`}
                  product={product}
                  onClick={setSelectedProduct}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
