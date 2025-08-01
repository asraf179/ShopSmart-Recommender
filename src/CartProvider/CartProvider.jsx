import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { user } = useContext(AuthContext);

  const onQuantityChange = (product, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === product.product_id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const onRemove = (product) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product_id !== product.product_id)
    );
  };

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum +   (
                      (Number(item.discounted_price.replace(/[₹,]/g, ""))) * (item.quantity)),0
    );
    setTotalAmount(total);
  }, [cartItems,user]);

  const addToCart = (product) => {
    if (!product || !product.product_id) return;
    const exists = cartItems.find(
      (item) => item.product_id === product.product_id
    );
    if (exists) {
      onQuantityChange(product, 1);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  useEffect(() => {
    if (!user) return; // Only fetch cart if user is available
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://127.0.0.1:8000/api/get-cart/",
        { user_id: user },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setCartItems(res.data.cartItems || []);
      })
      .catch((err) => console.log("Cart fetch error:", err));
  }, [user]);

  useEffect(() => {
    if (!user) return; // Only save cart if user is available
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://127.0.0.1:8000/api/save-cart/",
        {
          user_id: user,
          cartItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => console.log("Cart save error:", err));
  }, [cartItems, user]);

  return (
    <CartContext.Provider
      value={{ cartItems, onQuantityChange, onRemove, addToCart, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
