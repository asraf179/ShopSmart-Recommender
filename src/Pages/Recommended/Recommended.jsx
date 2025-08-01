// src/pages/Recommended.jsx
import React, { useContext } from "react";
import { ProductCard } from "../../components/ProductCard";
import { DataContext } from "../../DataProvider/DataProvider";

const dummyContentBased = [
  { title: "Wireless Headphones", price: "$49.99" },
  { title: "Bluetooth Speaker", price: "$39.99" },
  { title: "Smart Watch", price: "$59.99" },
  { title: "Noise Cancelling Earbuds", price: "$29.99" },
  { title: "Gaming Mouse", price: "$19.99" },
];

const dummyCollaborative = [
  { title: "Laptop Stand", price: "$24.99" },
  { title: "Mechanical Keyboard", price: "$69.99" },
  { title: "Ergonomic Chair", price: "$149.99" },
  { title: "Monitor Light Bar", price: "$34.99" },
  { title: "Portable SSD", price: "$89.99" },
];

const Recommended = () => {
  const{contentBasedRecommendations,selectedProduct,setSelectedProduct,collaborativeBasedRecommendation}=useContext(DataContext)
  return (
    <div className="p-6">
      
      <h1 className="text-3xl font-bold text-center mb-6">🔮 Recommended for You</h1>

      {/* Content-Based Recommendation */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🧠 Content-Based Recommendations</h2>
        <p className="text-gray-600 mb-4 text-sm">
          These are similar to products you’ve bought, reviewed, or liked.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {contentBasedRecommendations.map((product, index) => (
            <ProductCard key={`cb-${index}`} product={product} />
          ))}
        </div>
      </section>

      {/* Collaborative Filtering Recommendation */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">👥 Collaborative Filtering</h2>
        <p className="text-gray-600 mb-4 text-sm">
          Based on what other users with similar behavior are buying.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {collaborativeBasedRecommendation.map((product, index) => (
            <ProductCard key={`cf-${index}`} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Recommended;
