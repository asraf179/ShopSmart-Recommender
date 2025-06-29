// src/components/Sidebar.jsx
import React from "react";

export const Sidebar = () => {
  const searchResults = [
    "Laptop",
    "Headphones",
    "Books",
    "Shoes",
    "Smartphone",
  ];

  return (
    <div className="w-full lg:w-1/4 p-4 rounded-lg border space-y-2">
      <h3 className="text-xl font-semibold mb-4">🔍 Search Results</h3>
      <ul className="space-y-2">
        {searchResults.map((item, idx) => (
          <li
            key={idx}
            className="p-2  rounded hover:bg-orange-500 transition cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
