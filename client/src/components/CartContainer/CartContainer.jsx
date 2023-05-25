import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import mascotImage from "../../assets/images/mascot@2x.png";
import SingleProductCart from "../SingleProductCart/SingleProductCart";

const CartContainer = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [temporaryCart, setTemporaryCart] = useState([]);
  const [orderIds, setOrderIds] = useState([]);

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handleTemporaryCart = () => {
    localStorage.removeItem("TemporaryCart");
    localStorage.setItem("TemporaryCart", JSON.stringify(temporaryCart));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {!currentUser ? (
        <div className="max-w-[500px] flex flex-col items-center justify-center">
          <img
            src={mascotImage}
            className="object-contain object-center w-[200px] mb-6"
            alt=""
          />
          <p className="text-base text-textColor font-medium mb-6">
            Đăng nhập để mua sắm sản phẩm của chúng tôi
          </p>
          <Link
            to={"/account/signin"}
            className="py-2 px-4 bg-primaryColor text-white text-base font-medium rounded-md hover:bg-secondaryColor transition-all duration-100 ease-in-out"
          >
            Đăng nhập
          </Link>
        </div>
      ) : (
        <>
          {cart && cart?.count_product === 0 ? (
            <div className="max-w-[500px] flex flex-col items-center justify-center">
              <img
                src={mascotImage}
                className="object-contain object-center w-[200px] mb-6"
                alt=""
              />
              <p className="text-base text-textColor font-medium mb-6">
                Không có sản phẩm nào trong giỏ hàng của bạn
              </p>
              <Link
                to={"/"}
                className="py-2 px-4 bg-primaryColor text-white text-base font-medium rounded-md hover:bg-secondaryColor transition-all duration-100 ease-in-out"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            <div className="w-full flex flex-col items-start justify-start">
              <div className="w-full flex flex-row items-start justify-start mt-4">
                <div className="flex-1 pr-6">
                  <div className="w-full flex flex-row items-center justify-center pb-3 border-b-[1px] border-[#e1e1e1]">
                    <div className="flex-1 text-base text-textColor font-bold">
                      Giỏ hàng ({cart?.count_product} sản phẩm)
                    </div>
                    <div className="flex-1 flex flex-row items-start justify-start">
                      <div className="flex-1 text-sm font-medium text-textColor">
                        Giá mua
                      </div>
                      <div className="flex-1 text-sm font-medium text-textColor">
                        Số lượng
                      </div>
                      <div className="flex-1 text-sm font-medium text-textColor">
                        Thành tiền
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    {cart?.products &&
                      cart?.products.map((product, index) => (
                        <div key={index}>
                          <SingleProductCart
                            product={product}
                            temporaryCart={temporaryCart}
                            setTemporaryCart={setTemporaryCart}
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="w-[30%]">
                  <div className="px-4 py-5 mb-6 border-[1px] border-secondaryBgColor">
                    <div className="flex flex-row items-center justify-between text-sm font-medium">
                      <span className="text-textColor">Tạm tính:</span>
                      <span className="text-secondaryColor font-semibold">
                        {formatPrice(
                          temporaryCart && temporaryCart.length > 0
                            ? temporaryCart.reduce((acc, product) => {
                                const productPrice =
                                  product?.quantity * product?.price;
                                return acc + productPrice;
                              }, 0)
                            : 0
                        )}
                      </span>
                    </div>
                    <div className="my-3 w-full h-[2px] bg-redColor rounded-sm"></div>
                    <div className="flex flex-row items-center justify-between text-sm font-medium">
                      <span className="text-textColor">Thành tiền:</span>
                      <span className="text-redColor font-semibold text-lg">
                        {formatPrice(
                          temporaryCart && temporaryCart.length > 0
                            ? temporaryCart.reduce((acc, product) => {
                                const productPrice =
                                  product?.quantity * product?.price;
                                return acc + productPrice;
                              }, 0)
                            : 0
                        )}
                      </span>
                    </div>
                    <div className="mt-2 text-right text-sm font-medium text-textColor">
                      (Chưa bao gồm phí vận chuyển)
                    </div>
                  </div>
                  <Link onClick={handleTemporaryCart} to={"/checkout"}>
                    <button className="w-full text-center py-2 rounded bg-primaryColor hover:bg-secondaryColor transtion-all duration-100 ease-in-out text-white text-base font-semibold uppercase">
                      Tiến hành đặt hàng
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartContainer;
