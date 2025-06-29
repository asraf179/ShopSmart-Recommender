import { useState } from 'react';
import { TfiAlignLeft } from "react-icons/tfi";
import { TfiAngleDown } from "react-icons/tfi";
import { MdOutlineCategory } from "react-icons/md";
export default function CategoryToggle() {
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
    <div className='relative inline-block w-full' >
      {/* Toggle Button */}
       <div className='flex gap-4 relative rounded-full  bg-sky-500 '
       onClick={() => setShowCategories(!showCategories)}
       >
        <div className="mt-2"><TfiAlignLeft></TfiAlignLeft></div>
         <span className="text-slate-50 font-semibold  text-2xl ml-3">All Catagories</span>
         <div className="mt-2  absolute right-6 "><TfiAngleDown></TfiAngleDown></div>
       </div>

{/* Floating Dropdown */}
      {showCategories && (
        <>
          {/* Optional backdrop */}
          <div
            className="fixed inset-0 z-40 mt-14"
            onClick={() => setShowCategories(false)}
          ></div>

          <ul className="absolute left-0 top-full mt-10 w-80 bg-white rounded-xl shadow-xl z-50 py-2 border border-gray-200 max-h-96 overflow-auto animate-slideDown">
            {categories.map((cat, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 px-4 py-2 hover:bg-sky-100 cursor-pointer transition"
                onClick={() => setShowCategories(false)}
              >
                <MdOutlineCategory className="text-sky-600" />
                <span className="text-gray-800">{cat}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
