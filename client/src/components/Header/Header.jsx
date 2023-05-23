import React from "react";
import Search from "../Search/Search";

import Logo from "../../assets/images/logomoi-compressor.png";
import { CartIcon } from "../../assets";
import Contact from "../Contact/Contact";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  return (
    <div className="relative">
      <Contact />
      <div className="max-w-[1200px] px-[15px] py-4 mx-auto">
        <div className="flex flex-row items-center justify-between">
          <Search />
          <div className="mr-8">
            <Link to={"/"}>
              <img src={Logo} alt="" />
            </Link>
          </div>

          <div>
            <Link to={"/cart"}>
              <button className="bg-secondaryColor flex flex-row items-center justify-start gap-x-2 p-[6px] rounded text-white text-sm font-medium hover:scale-[1.01]">
                <CartIcon />
                Giỏ hàng
                <span className="px-1 rounded-full bg-white text-redColor text-xs font-medium">
                  0
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
