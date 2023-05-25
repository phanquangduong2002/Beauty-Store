import React, { useEffect } from "react";

import { url } from "../../api/constants";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { getCart, getCartSuccess, getCartFailed } from "../../redux/cartSlice";

import Search from "../Search/Search";
import Logo from "../../assets/images/logomoi-compressor.png";
import { CartIcon } from "../../assets";
import Contact from "../Contact/Contact";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  const { cart } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getCart());
        const res = await axios.get(`${url}/cart`, {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        });
        if (res.data.success) {
          dispatch(getCartSuccess(res.data.cart));
        }
      } catch (error) {
        console.log(error.response.data);
        dispatch(getCartFailed());
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative">
      <Contact />
      <div className="max-w-[1200px] py-4 mx-auto">
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
                  {currentUser ? cart?.count_product : 0}
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
