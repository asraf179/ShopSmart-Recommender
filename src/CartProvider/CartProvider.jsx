import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
      (sum, item) => sum + item.discounted_price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [cartItems]);
  const addToCart = (product) => {
    const exists = cartItems.find(
      (item) => item.product_id === product.product_id
    );
    if (exists) {
      onQuantityChange(product, 1);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  // You can generate or get from auth

  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/api/get-cart/", { user_id: user })
      .then((res) => {
        setCartItems(res.data.cartItems || []);
      })
      .catch((err) => console.log("Cart fetch error:", err));
  }, []);

  useEffect(() => {
    console.log(user)
    axios
      .post("http://127.0.0.1:8000/api/save-cart/", {
        user_id: user,
        cartItems,
      })
      .catch((err) => console.log("Cart save error:", user));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, onQuantityChange, onRemove, addToCart, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};
export { CartProvider, CartContext };
