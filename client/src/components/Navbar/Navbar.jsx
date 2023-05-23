import React from "react";

import { MenuIcon } from "../../assets";

const Navbar = () => {
  return (
    <div className="bg-secondaryBgColor">
      <div className="max-w-[1200px] px-[15px] mx-auto bg-primaryColor flex flex-row items-center justify-start">
        <div className="pr-2 cursor-pointer">
          <MenuIcon />
        </div>
        <ul className="flex-1 flex flex-row items-center gap-x-8">
          <li className="p-2 cursor-pointer text-white text-sm font-medium hover:bg-secondaryColor transition-all duration-100 ease-in-out">
            Chăm sóc da
          </li>
          <li className="p-2 cursor-pointer text-white text-sm font-medium hover:bg-secondaryColor transition-all duration-100 ease-in-out">
            Chăm sóc tóc
          </li>
          <li className="p-2 cursor-pointer text-white text-sm font-medium hover:bg-secondaryColor transition-all duration-100 ease-in-out">
            Trang điểm
          </li>
          <li className="p-2 cursor-pointer text-white text-sm font-medium hover:bg-secondaryColor transition-all duration-100 ease-in-out">
            Chăm sóc cơ thể
          </li>
          <li className="p-2 cursor-pointer text-white text-sm font-medium hover:bg-secondaryColor transition-all duration-100 ease-in-out">
            Nước hoa
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
