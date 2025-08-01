import React, { useContext, useState } from "react";
import StarDisplay from "./StarDisplay";
import { CartContext } from "../CartProvider/CartProvider";
import Favourite from "./Favourite";

export const ProductCard = ({ product, onClick }) => {
  const{addToCart}=useContext(CartContext)


  const handleImageClick = () => {
    onClick(product);
  };

  const getFirstFiveWords = (text) => {
    if (!text || typeof text !== "string") return "";
    const words = text.trim().split(/\s+/);
    return words.slice(0, 5).join(" ");
  };

  return (
    <div className="relative border rounded-xl shadow-sm hover:shadow-lg transition p-3 bg-white">
     <Favourite productId={product.product_id}></Favourite>

      <img
        src={product.clean_img_link}
        alt={product.product_name}
        className="w-full h-40 object-contain cursor-pointer"
        onClick={handleImageClick}
      />

      <h3 className="text-sm font-medium mt-2 text-cyan-400">
        {getFirstFiveWords(product.product_name)}
      </h3>

      <StarDisplay rating={product.rating} />

      <p className="text-blue-600 font-semibold">{product.actual_price}</p>

      <button className="mt-2 w-full bg-slate-200 text-blue-300 py-1 rounded hover:bg-blue-700 hover:text-white transition"
      onClick={()=>addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};
