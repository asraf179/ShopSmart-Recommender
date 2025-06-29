import React, { useState } from "react";


import { TfiAngleDown } from "react-icons/tfi";
import { MdOutlineCategory } from "react-icons/md";
const CategoryMenu = () => {
        const [showCategories, setShowCategories] = useState(false);

  const categories = [
    'Electronics',
    'Fashion',
    'Books',
    'Home',
    'Toys',
    'Grocery',
    'Beauty',
  ];
  return (
    <li>
      <details>
        <summary>
                {/* Toggle Button */}
                       <div className='flex gap-1 relative rounded-full  '
                       onClick={() => setShowCategories(!showCategories)}
                       >
                         <span className="text-slate-50 ">All Catagories</span>
                       </div>
        </summary>
        <ul className="p-2">
         {categories.map((cat, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 py-2 px-4 cursor-pointer hover:bg-sky-100 rounded transition w-full"
                        onClick={() => setShowCategories(false)}
                      >
                        <MdOutlineCategory className="text-sky-600" />
                        <span className="text-gray-800">{cat}</span>
                      </li>
                    ))}
        </ul>
      </details>
    </li>
  );
};

export default CategoryMenu;
