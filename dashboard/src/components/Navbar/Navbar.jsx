import React from "react";

const Navbar = () => {
  return (
    <div className="absolute top-9 left-0 bottom-0 w-[200px] bg-secondaryBgColor">
      <ul className="flex flex-col items-center justify-center py-6">
        <li className="text-base uppercase text-textColor font-semibold mb-4">
          Đơn hàng
        </li>
        <li className="text-base uppercase text-textColor font-semibold mb-4">
          Sản phẩm
        </li>
        <li className="text-base uppercase text-textColor font-semibold mb-4">
          Kho hàng
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
