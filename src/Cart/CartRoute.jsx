import { useContext } from "react";
import CartPage from "./CartPage";
import { CartContext } from "../CartProvider/CartProvider";


const CartRoute = () => {
  const { cartItems, onQuantityChange, onRemove,totalAmount } = useContext(CartContext);
  return (
    <CartPage
      cartItems={cartItems}
      onQuantityChange={onQuantityChange}
      onRemove={onRemove}
      totalamount={totalAmount}
    />
  );
};
export {CartRoute}
