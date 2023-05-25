import React, { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";

import Order from "../../components/Order/Order";

import Product from "../../components/Product/Product";

import Inventory from "../../components/Inventory/Inventory";

const Dashboard = () => {
  const [activeOrder, setActiveOrder] = useState(true);
  const [activeProduct, setActiveProduct] = useState(false);
  const [activeInventory, setActiveInventory] = useState(false);

  return (
    <div lang="cotainer relative">
      <div className="absolute top-9 left-0 bottom-0 w-[200px] bg-secondaryBgColor">
        <ul className="flex flex-col items-center justify-center py-6">
          <button
            onClick={() => {
              setActiveOrder(true);
              setActiveProduct(false);
              setActiveInventory(false);
            }}
            className={`w-full text-base uppercase text-textColor ${
              activeOrder ? "font-semibold" : "font-medium"
            } mb-4`}
          >
            Đơn hàng
          </button>
          <button
            onClick={() => {
              setActiveOrder(false);
              setActiveProduct(true);
              setActiveInventory(false);
            }}
            className={`w-full text-base uppercase text-textColor ${
              activeProduct ? "font-semibold" : "font-medium"
            } mb-4`}
          >
            Sản phẩm
          </button>
          <button
            onClick={() => {
              setActiveOrder(false);
              setActiveProduct(false);
              setActiveInventory(true);
            }}
            className={`w-full text-base uppercase text-textColor ${
              activeInventory ? "font-semibold" : "font-medium"
            } mb-4`}
          >
            Kho hàng
          </button>
        </ul>
      </div>
      <div>
        {activeOrder && <Order />}
        {activeProduct && <Product />}
        {activeInventory && <Inventory />}
      </div>
    </div>
  );
};

export default Dashboard;
