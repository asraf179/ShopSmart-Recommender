import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

export const AccountMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="relative p-2 rounded-full flex items-center shadow-sm shadow-white cursor-pointer"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <VscAccount className="h-7 w-7 text-gray-700" />

      <div
        className={`absolute top-10 right-0 w-44 bg-green-600 shadow-md rounded-md overflow-hidden transform transition-all duration-300 ease-in-out origin-top ${
          showMenu ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        <button
          onClick={() => navigate("/purchase-history")}
          className="w-full text-left px-4 py-2 hover:bg-lime-600 text-sm"
        >
          Purchase History
        </button>
        <button
          onClick={() => {
            localStorage.clear(); // or remove token
            navigate("/entry");
          }}
          className="w-full text-left px-4 py-2  hover:bg-lime-600 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

