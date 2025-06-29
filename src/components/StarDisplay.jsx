import React from "react";
import { FaStar } from "react-icons/fa";

const StarDisplay = ({ rating }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    const fillPercent = Math.min(100, Math.max(0, (rating - i) * 100));

    stars.push(
      <div key={i} className="relative w-5 h-5 mr-0.5">
        {/* Empty base star */}
        <FaStar className="absolute text-gray-300" size={20} />

        {/* Filled part */}
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${fillPercent}%` }}
        >
          <FaStar className="text-yellow-400" size={20} />
        </div>
      </div>
    );
  }

  return <div className="flex">{stars}</div>;
};

export default StarDisplay;
