import React, { useEffect, useState } from "react";

import { MenuIcon } from "../../assets";

import { motion } from "framer-motion";

import { LargeCartIcon } from "../../assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      if (scrollPosition >= 148 && !isSticky) {
        setIsSticky(true);
      } else if (scrollPosition < 148 && isSticky) {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky]);
  return (
    <div
      className={`bg-secondaryBgColor ${
        isSticky ? "fixed top-0 left-0 right-0 z-[1000]" : ""
      }`}
    >
      <div className="max-w-[1200px] px-[15px] mx-auto bg-primaryColor flex flex-row items-center justify-start">
        <div className="pr-2 cursor-pointer">
          <MenuIcon />
        </div>
        <ul className="flex-1 flex flex-row items-center gap-x-8">
          <li className="p-3 cursor-pointer text-white text-sm font-medium hover:bg-secondaryColor transition-all duration-100 ease-in-out">
            Chăm sóc da
          </li>
          <li className="p-3 cursor-pointer text-white text-sm font-medium hover:bg-secondaryColor transition-all duration-100 ease-in-out">
            Chăm sóc tóc
          </li>
          <li className="p-3 cursor-pointer text-white text-sm font-medium hover:bg-secondaryColor transition-all duration-100 ease-in-out">
            Trang điểm
          </li>
          <li className="p-3 cursor-pointer text-white text-sm font-medium hover:bg-secondaryColor transition-all duration-100 ease-in-out">
            Chăm sóc cơ thể
          </li>
          <li className="p-3 cursor-pointer text-white text-sm font-medium hover:bg-secondaryColor transition-all duration-100 ease-in-out">
            Nước hoa
          </li>
        </ul>
        {isSticky && (
          <Link to={"/cart"} className="p-3 bg-secondaryColor cursor-pointer">
            <LargeCartIcon />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
