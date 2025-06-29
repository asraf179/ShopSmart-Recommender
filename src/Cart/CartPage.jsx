// CartPage.jsx
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export const CartPage = ({ cartItems = [], onQuantityChange, onRemove ,totalamount}) => {
 const items = cartItems || [
    { name: 'All Natural Italian-Style Chicken Meatballs', quantity: 1, price: 7.25 },
    { name: 'Field Roast Chao Cheese Creamy Original', quantity: 1, price: 19.50 },
  ];


  return (
    <div className="max-w-7xl mx-auto p-4  ">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {/* Free Shipping Progress */}

      {/* Cart Table */}
    <div className="grid grid-cols-8 gap-4">
          <div className="overflow-x-auto col-span-5">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Subtotal</th>
              <th className="p-3">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-3 flex gap-2 items-center">
                  <img
                    src={item.clean_img_link}
                    alt={item.product_name}
                    className="w-16 h-16 object-contain border"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {item.product_name}
                  </span>
                </td>
                <td className="p-3 text-gray-600">${item.discountPrice}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 border rounded text-red-500"
                      onClick={() => onQuantityChange(item, -1)}
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="text-gray-400">{item.quantity}</span>
                    <button
                      className="p-1 border rounded text-blue-500"
                      onClick={() => onQuantityChange(item, 1)}
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </td>
                <td className="p-3 font-semibold text-gray-800">
                  ${(item.discountPrice * item.quantity).toFixed(2)}
                </td>
                <td className="p-3">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onRemove(item)}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-span-3">
<div className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">YOUR ORDER</h2>

      {/* Product List */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">{item.product_name} <span className="font-medium">x {item.quantity}</span></p>
            </div>
            <p className="text-gray-800 font-medium">${item.discounted_price}</p>
          </div>
        ))}
      </div>

      {/* Subtotal */}
      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between">
          <p className="text-gray-600">Total</p>
          <p className="text-gray-800 font-medium">${totalamount}</p>
        </div>
        <div className="p-5 mt-3 text-center bg-rose-700">
                Place Order
        </div>
      </div>
      </div>
      </div>
    </div>

     
    </div>
  );
};

export default CartPage;
