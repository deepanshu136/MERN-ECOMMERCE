import React from "react";
import Logo from "./Logo";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosCart } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full  container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm boder rounded-full focus-within:shadow ">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-xl outline-none  text-gray-600 pl-4"
          />

          <div>
            <CiSearch className="text-lg min-w-[50px] h-8 bg-slate-500 flex items-center justify-center rounded-r-full text-white" />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="text-3xl cursor-pointer">
            <FaRegCircleUser />
          </div>

          <div className="text-2xl relative">
            <span>
              <IoIosCart />
            </span>
            <div className="bg-slate-500 text-black w-5 h-5 rounded-full p-1 flex items-center justify-center absolute bottom-2 -right-3">
              <p className="text-sm">0</p>
            </div>
          </div>

          <div>
            <Link
              to={"/login"}
              className="px-2 py-1 rounded-full bg-slate-500 text-white hover:bg-slate-600"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
