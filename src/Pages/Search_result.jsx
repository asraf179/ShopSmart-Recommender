import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchPage from "./SearchPage";
import { useLocation, useNavigate } from "react-router";

const Search_result = () => {
  //to collect data from caller location
  const location = useLocation();
  const navigate = useNavigate();
  const selectedQuery = location.state?.selectedQuery;
  const [searchProducts, setSearchProducts] = useState([]);
  //for every selected query
  useEffect(() => {
    if (!selectedQuery) {
        navigate("/")//redirect if no selectedquery found
        return;
    }
    console.log(selectedQuery);

    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.post("http://localhost:8000/api/search/", {
            query: selectedQuery 
        
        },
        {
            headers:
            {
              Authorization:`Bearer ${token}`
            }
          });
          console.log(typeof res.data)
          let parsedData = res.data;

        if (typeof parsedData === "string") {
          parsedData = JSON.parse(parsedData);
        }
        console.log(parsedData);

      
        setSearchProducts(res.data.results);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, [selectedQuery]);
  return (
    <div className="max-w-5xl mx-auto p-4">
      {selectedQuery && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">
            Results for: {selectedQuery}
          </h2>
          <SearchPage products={searchProducts} />
        </div>
      )}
    </div>
  );
};

export default Search_result;
