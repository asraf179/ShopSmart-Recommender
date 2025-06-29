import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await  axios.get(`http://127.0.0.1:8000/api/suggest/?query=${query}`)
        setSuggestions(response.data || []);
        console.log(response.data)
      } catch (error) {
        console.error("Search error:", error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  // Optional: Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="navbarSearch w-full rounded-md relative">
      <input
        type="text"
        placeholder="Search for products"
        className="input input-bordered w-5/6 h-14"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul
          className="absolute bg-indigo-400 border border-gray-300 w-5/6 max-h-60 overflow-auto rounded-md mt-1 z-50 shadow-lg"
          style={{ top: "100%", left: 0 }}
        >
          {suggestions.map((item) => (
            <li
              key={item.product_id}
              className="p-2 hover:bg-sky-800 cursor-pointer"
              onClick={() => {
                setQuery(item.product_name);
                setSuggestions([]);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
