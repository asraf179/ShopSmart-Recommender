import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider/AuthProvider";

 const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favouriteItems, setFavouriteItems] = useState([]);
  const { user } = useContext(AuthContext);

  // Fetch favourites from backend
  const fetchFavourites = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/favourites/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavouriteItems(res.data);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  // Toggle favourite status
  const toggleFavourite = async (product_id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/favourites/toggle/",
        { product_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchFavourites(); // Refresh the list
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  // Remove a favourite item manually (optional)
  const removeFavourite = async (product_id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/remove-favourite/",
        { product_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchFavourites(); // Refresh the list
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFavourites();
    }
  }, [user]);

  return (
    <FavouriteContext.Provider
      value={{ favouriteItems, toggleFavourite, removeFavourite, fetchFavourites,setFavouriteItems }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
export{FavouriteContext}