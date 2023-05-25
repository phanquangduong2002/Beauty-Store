import React, { useState, useEffect } from "react";

import { IncreaseIcon, MinusIcon } from "../../assets";

import { useSelector, useDispatch } from "react-redux";

import { getCart, getCartSuccess, getCartFailed } from "../../redux/cartSlice";
import axios from "axios";
import { url } from "../../api/constants";

const SingleProductCart = ({ product, temporaryCart, setTemporaryCart }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    handleProductToTemporaryCart(product);
  };

  const handleProductToTemporaryCart = (product) => {
    const newTemporaryCart = [...temporaryCart];
    const existingProductIndex = temporaryCart.findIndex(
      (item) => item?.productId === product.productId
    );

    if (existingProductIndex !== -1) {
      newTemporaryCart.splice(existingProductIndex, 1);
    } else {
      newTemporaryCart.push(product);
    }
    setTemporaryCart(newTemporaryCart);
  };

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const updatedCart = async (oldQuantity, quantity) => {
    try {
      dispatch(getCart());
      const res = await axios.post(
        `${url}/cart`,
        {
          userId: currentUser?._id,
          product: {
            productId: product?.productId,
            quantity,
            oldQuantity,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );

      if (res?.data?.success) dispatch(getCartSuccess(res?.data?.cart));
    } catch (error) {
      console.log(error?.response?.data);
      dispatch(getCartFailed());
    }
  };

  return (
    <div>
      <div className="py-[10px] border-b-[1px] border-[#e1e1e1] flex flex-row items-center justify-start">
        <div className="flex-1 flex flex-row items-center justify-start">
          <img
            src={product?.thumb}
            className="w-[102px] object-contain object-center border-[1px] border-[#e1e1e1]"
            alt=""
          />
          <p className="px-3 text-sm text-textColor font-medium">
            {product?.name}
          </p>
        </div>
        <div className="flex-1 flex flex-row items-start justify-start">
          <div className="flex-1 text-sm text-secondaryColor font-semibold">
            {formatPrice(product?.price)}
          </div>
          <div className="flex-1 flex flex-row items-center justify-start gap-x-3">
            <button
              onClick={() => {
                updatedCart(product?.quantity, product?.quantity - 1);
              }}
              className="cursor-pointer"
            >
              <MinusIcon />
            </button>
            {product?.quantity}
            <button
              onClick={() => {
                updatedCart(product?.quantity, product?.quantity + 1);
              }}
              className="cursor-pointer"
            >
              <IncreaseIcon />
            </button>
          </div>
          <div className="flex-1 text-sm text-secondaryColor font-semibold">
            {formatPrice(product?.price * product?.quantity)}
          </div>
          <div>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCart;
