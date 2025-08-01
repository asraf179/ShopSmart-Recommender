import React, { useContext, useEffect } from "react";
import { FavouriteContext } from "../FavouriteProvider/FavouriteProvider";
import { CartContext } from "../CartProvider/CartProvider";

const FavouriteItems = () => {
           const{fetchFavourites,favouriteItems,removeFavourite,toggleFavourite}=useContext(FavouriteContext)
           const {addToCart}=useContext(CartContext)
        useEffect(()=>{
                try {
                         fetchFavourites()
                        console.log("success") 
                } catch (error) {
                        console.log(error)
                }
                
        },[])
  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-semibold mb-6">Your Favourite Items</h2>
      <table className="min-w-full table-auto border-separate border-spacing-y-4">
        <thead>
          <tr className="text-left text-gray-500 uppercase text-sm">
            <th>Product</th>
            <th>Price</th>
            <th>Date Added</th>
            <th>Stock</th>
            <th>Add to cart</th>
          </tr>
        </thead>
        <tbody>
          {favouriteItems.map((item) => (
            <tr key={item.product_id} className="bg-green-600 shadow rounded-lg">
              <td className="flex items-center gap-4 py-4 px-2">
                <img src={item.clean_img_link} alt={item.product_name} className="w-16 h-16 object-contain" />
                <span>{item.product_name}</span>
              </td>
              <td className="px-2">
                {item.original_price && item.original_price !== item.discounted_price ? (
                  <>
                    <span className="line-through text-gray-400 mr-2">${item.original_price}</span>
                    <span className="text-blue-600 font-semibold">${item.discounted_price}</span>
                  </>
                ) : (
                  <span>${item.discounted_price}</span>
                )}
              </td>
              <td className="px-2">{new Date(item.date_added).toLocaleDateString()}</td>
              <td className="px-2">{item.in_stock ? "In Stock" : "Out of Stock"}</td>
              <td className="flex items-center gap-2 px-2">
                <button
                  onClick={() => addToCart(item)}
                  className="bg-blue-900 text-white px-4 py-2 rounded-full text-sm"
                >
                  {item.variants ? "Select options" : "Add to cart"}
                </button>
                <button
                  onClick={() => toggleFavourite(item.product_id)}
                  className="text-xl text-black hover:text-red-600 border rounded-sm p-3"
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex items-center gap-4">
        <span className="text-sm text-gray-500">Share on:</span>
        <div className="flex gap-3">
          <button className="text-blue-600">Facebook</button>
          <button className="text-sky-500">Twitter</button>
          <button className="text-pink-600">Pinterest</button>
          <button className="text-gray-700">Email</button>
        </div>
      </div>
    </div>
  );
};

export default FavouriteItems;
