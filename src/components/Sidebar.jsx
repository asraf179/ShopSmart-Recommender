import React, { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";

export const Sidebar = () => {
  const { searchHistory } = useContext(DataContext);

  return (
    <div className="w-full lg:w-1/4 p-4 rounded-lg border space-y-2">
      <h3 className="text-xl font-semibold mb-4">🔍 Search History</h3>
      <ul className="space-y-2">
        {searchHistory && searchHistory.length > 0 ? (
          searchHistory.slice(0,5).map((item, idx) => (
            <li
              key={idx}
              className="p-2 rounded hover:bg-orange-500 transition cursor-pointer"
            >
              {item}
            </li>
          ))
        ) : (
          <li className="text-gray-400 italic">No search history found</li>
        )}
      </ul>
    </div>
  );
};
