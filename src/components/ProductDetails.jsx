import React, { useEffect, useState } from "react";

const ProductDetailsModal = ({ product, onClose }) => {
 const [quantity, setQuantity] = useState(0);
  console.log(product);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  if (!product) return null;
 

  const handleQuantityChange = (action) => {
    if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (action === "increase") {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start overflow-y-auto pt-10">
      <div className="bg-white w-full max-w-5xl mx-auto p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <div>
                          <h1 className="text-xl font-bold text-gray-800">{product.product_name || 'No name'}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-400">★★★★☆</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600">
              {product.rating || 0} ({product.rating_count || 0} reviews)
            </span>
            <span className="text-gray-300">|</span>
            <p className="text-gray-500 mt-1">SKU: {product.product_id || 'N/A'}</p>
          </div>
          
                </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.clean_img_link || '/fallback-image.jpg'}
            alt={product.product_name || 'Product image'}
            className="w-full h-64 object-contain rounded-lg"
            onError={(e) => {
              console.error('Image failed to load:', product.image, e);
              e.target.src = '/fallback-image.jpg'; // Fallback on error
            }}
            onLoad={() => console.log('Image loaded successfully:', product.image)}
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
         

          {/* Pricing */}
          <div className="mt-4 flex items-center gap-2">
            {product.actual_price && product.discounted_price && product.actual_price > product.discounted_price && (
              <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-2 py-1 rounded">
               {product.discount_percentage} OFF
              </span>
            )}
            <span className="text-gray-500 line-through">
              ${product.actual_price || 'N/A'}
            </span>
            <span className="text-red-600 text-xl font-bold">
              ${product.discounted_price || 'N/A'}
            </span>
            <span className="text-green-600 font-semibold">IN STOCK</span>
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-600">
           {product.about_product}
          </p>

          {/* Quantity Selector and Add to Cart */}
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center border rounded">
              <button
                onClick={() => handleQuantityChange('decrease')}
                className="px-3 py-1 text-gray-600 hover:text-gray-800"
              >
                −
              </button>
              <span className="px-4 py-1 text-gray-500">{quantity}</span>
              <button
                onClick={() => handleQuantityChange('increase')}
                className="px-3 py-1 text-gray-600 hover:text-gray-800"
              >
                +
              </button>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>

          {/* Category and Tags */}
          <div className="mt-4">
            <div className="text-gray-600">Category: {product.category}</div>
            <div className="text-gray-600">Tags: {['chicken', 'natural', 'organic'].join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
        </div>
      </div>
  );
};

export default ProductDetailsModal;
