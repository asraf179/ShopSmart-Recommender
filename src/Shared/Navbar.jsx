import React, { useContext } from "react";
import { VscAccount } from "react-icons/vsc";
import Logo from "../assets/images/bacola-logo.webp";
import { Link, NavLink, useNavigate } from "react-router";
import { IoBagOutline } from "react-icons/io5";

import CategoryToggle from "./CategoryToggle";
import CategoryMenu from "./CategoryMenu";
import { CartContext } from "../CartProvider/CartProvider";
import { AccountMenu } from "../components/AccountMenu";
import { AuthContext } from "../AuthProvider/AuthProvider";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const{cartItems,totalAmount}=useContext(CartContext)
  const{user}=useContext(AuthContext)
  const navigate=useNavigate()
  return (
    <div className=" mx-7 p-4 shadow-sm shadow-slate-800 ">
      <div className="navbar bg-base-100 shadow-sm mt-4">
        <div className="navbar-start ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
                <li>
                        <CategoryMenu></CategoryMenu>
                </li>
            </ul>
          </div>
          <div className="container">
            <div className="logoWrapper w-48 ">
              <Link to={"/"}>
                <img src={Logo} className="w-3/4"></img>
              </Link>
            </div>
          </div>
        </div>

       <SearchBar></SearchBar>
        {/**
         * 
         *  <div className=" navbarSearch w-full  rounded-md  ">
          <input
            type="text"
            placeholder="Search for products"
            className="input input-bordered w-5/6 h-14 "
          />
        </div>
         */}
        <div className="flex  gap-3  rounded-md  ">
         <div onClick={()=>navigate('/login')}>
          login
         </div>

          <AccountMenu></AccountMenu>
          <div className="flex items-center p-2  ">${totalAmount}</div>
          <div className="flex relative shadow-sm  shadow-white  rounded-full ">
            <IoBagOutline className="h-11 w-11  flex rounded-full items-center  p-2 "
            onClick={()=>navigate('/cart')}
            ></IoBagOutline>
            <span className="count flex items-center justify-center absolute right-0 bg-amber-800 w-4 h-4 rounded-full  ">
              {cartItems.length}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full hidden  lg:flex">
        <div className="grid grid-cols-8 gap-20 w-full mt-3">
          {/*all catagories section start */}
          <div className="col-span-2 p-3 text-center bg-sky-500 rounded-full  ">
            <CategoryToggle></CategoryToggle>
          </div>
          {/*Home section start */}
          <div className="col-span-6 ml-4 flex items-center justify-evenly  bg-rose-600 rounded-md px-6 py-3">
            <button className="text-gray-700 font-medium hover:text-sky-600 transition">
            <NavLink to='/' >Home </NavLink>
            </button>
            <button className="text-gray-700 font-medium hover:text-sky-600 transition">
             <NavLink to='/recommended'> Recommended Items</NavLink>
            </button>
            <button className="text-gray-700 font-medium hover:text-sky-600 transition">
              Popular Items
            </button>
            <button className="text-gray-700 font-medium hover:text-sky-600 transition">
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
