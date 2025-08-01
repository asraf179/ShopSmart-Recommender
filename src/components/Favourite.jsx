import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FavouriteContext } from "../FavouriteProvider/FavouriteProvider";

const Favourite = ({ productId }) => {
  const { favouriteItems, toggleFavourite } = useContext(FavouriteContext);
  const [isFav, setIsFav] = useState(false);

  // Check if this product is already favorited
  useEffect(() => {
    const isAlreadyFav = favouriteItems.some(
      (item) => item.product_id === productId
    );
    setIsFav(isAlreadyFav);
  }, [favouriteItems, productId]);

  const handleToggle = async () => {
    try {
      await toggleFavourite(productId);
      setIsFav((prev) => !prev); // Optimistically update UI
    } catch (error) {
      console.error("Failed to toggle favourite:", error);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="absolute top-2 right-2 text-xl text-red-500"
    >
      {isFav ? <AiFillHeart /> : <AiOutlineHeart />}
    </button>
  );
};

export default Favourite;
