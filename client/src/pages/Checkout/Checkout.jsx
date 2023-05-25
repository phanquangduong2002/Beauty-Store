import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { url } from "../../api/constants";
import PayPalPayment from "../../components/PaypalPayment/PaypalPayment";
import Footer from "../../components/Footer/Footer";

import { useSelector, useDispatch } from "react-redux";

import { getCart, getCartSuccess, getCartFailed } from "../../redux/cartSlice";

const Checkout = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [feeShip, setFeeShip] = useState(30000);

  const [dataCheckout, setDataCheckout] = useState(null);

  const [dataOrder, setDataOrder] = useState(null);

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");

  const [errorName, setErrorName] = useState(false);
  const [errorTel, setErrorTel] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorDistrict, setErrorDistrict] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);

  const [temporaryCart, setTemporaryCart] = useState([]);

  const [compeleted, setCompeleted] = useState(false);

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const checkoutReview = async (e) => {
    e.preventDefault();

    if (!name || !tel || !city || !district || !address) {
      !name ? setErrorName(true) : setErrorName(false);
      !tel ? setErrorTel(true) : setErrorTel(false);
      !city ? setErrorCity(true) : setErrorCity(false);
      !district ? setErrorDistrict(true) : setErrorDistrict(false);
      !address ? setErrorAddress(true) : setErrorAddress(false);
      return;
    }

    try {
      setIsLoading(true);

      let orderIds = [];

      for (let i = 0; i < temporaryCart.length; i++) {
        orderIds.push({
          itemProduct: {
            productId: temporaryCart[i].productId,
            quantity: temporaryCart[i].quantity,
            price: temporaryCart[i].quantity,
          },
        });
      }
      const res = await axios.post(
        `${url}/checkout/review`,
        {
          cartId: cart._id,
          userId: currentUser._id,
          orderIds,
          feeShip,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );

      if (res.data.success) {
        setDataCheckout(res.data?.data);
        setIsLoading(false);
        let order = {
          cartId: cart._id,
          userId: currentUser._id,
          newOrderIds: res.data?.data?.newOrderIds,
          checkoutOrder: res.data?.data?.checkoutOrder,
          userAddress: {
            name,
            tel,
            city,
            district,
            address,
          },
        };

        setDataOrder(order);
      }
    } catch (error) {
      console.log(error.response.data);
      setIsLoading(false);
    }
  };
  const getTemporaryCartFromLocalStorage = () => {
    const temporaryCart = localStorage.getItem("TemporaryCart");
    return temporaryCart ? JSON.parse(temporaryCart) : [];
  };

  useEffect(() => {
    if (!paymentSuccess) return;
    const handleOrder = async () => {
      try {
        const res = await axios.post(`${url}/checkout/order`, dataOrder, {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        });
        const updatedCart = await axios.get(`${url}/cart`, {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        });
        setCompeleted(true);
        dispatch(getCartSuccess(updatedCart.data.cart));
      } catch (error) {
        console.log(error.response.data);
      }
    };
    handleOrder();
  }, [dataOrder, paymentSuccess]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setTemporaryCart(getTemporaryCartFromLocalStorage());
  }, []);

  return (
    <div className="realative">
      {!compeleted ? (
        <div className="max-w-[1200px] mx-auto mb-10">
          <div className="mt-6 mb-10 text-base text-secondaryTextColor font-medium">
            <span className="text-textColor">Trang chủ</span> / Thanh toán đơn
            hàng
          </div>
          <div className="flex flex-row items-start justify-start">
            <div className="w-[55%]">
              <h3 className="text-textColor text-xl font-semibold mb-5">
                Địa chỉ nhận hàng
              </h3>
              <form action="" className="w-full flex flex-col ">
                <label
                  htmlFor="name"
                  className="w-full flex flex-row items-center justify-start mb-4"
                >
                  <span className="w-[25%] px-4 text-right text-sm text-textColor font-semibold">
                    Họ tên
                  </span>
                  <div className="w-[75%] px-4">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      id="name"
                      placeholder="VD: Nguyễn Văn A (*)"
                      className={`w-full py-[6px] px-3 outline-none border-[1px] ${
                        errorName && !name
                          ? "border-redColor"
                          : "border-[#ced4da]"
                      } rounded text-sm`}
                    />
                  </div>
                </label>
                <label
                  htmlFor="tel"
                  className="w-full flex flex-row items-center justify-start mb-4"
                >
                  <span className="w-[25%] px-4 text-right text-sm text-textColor font-semibold">
                    Số điện thoại
                  </span>
                  <div className="w-[75%] px-4">
                    <input
                      value={tel}
                      onChange={(e) => setTel(e.target.value)}
                      type="text"
                      id="tel"
                      placeholder="VD: 0373745152 (*)"
                      className={`w-full py-[6px] px-3 outline-none border-[1px] ${
                        errorTel && !tel
                          ? "border-redColor"
                          : "border-[#ced4da]"
                      } rounded text-sm`}
                    />
                  </div>
                </label>
                <label
                  htmlFor="city"
                  className="w-full flex flex-row items-center justify-start mb-4"
                >
                  <span className="w-[25%] px-4 text-right text-sm text-textColor font-semibold">
                    Tỉnh / Thành phố
                  </span>
                  <div className="w-[75%] px-4">
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      id="city"
                      placeholder=""
                      className={`w-full py-[6px] px-3 outline-none border-[1px] ${
                        errorCity && !city
                          ? "border-redColor"
                          : "border-[#ced4da]"
                      } rounded text-sm`}
                    />
                  </div>
                </label>
                <label
                  htmlFor="district"
                  className="w-full flex flex-row items-center justify-start mb-4"
                >
                  <span className="w-[25%] px-4 text-right text-sm text-textColor font-semibold">
                    Quận / Huyện
                  </span>
                  <div className="w-[75%] px-4">
                    <input
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      type="text"
                      id="district"
                      placeholder=""
                      className={`w-full py-[6px] px-3 outline-none border-[1px] ${
                        errorDistrict && !district
                          ? "border-redColor"
                          : "border-[#ced4da]"
                      } rounded text-sm`}
                    />
                  </div>
                </label>
                <label
                  htmlFor="address"
                  className="w-full flex flex-row items-center justify-start mb-4"
                >
                  <span className="w-[25%] px-4 text-right text-sm text-textColor font-semibold">
                    Địa chỉ
                  </span>
                  <div className="w-[75%] px-4">
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      id="address"
                      placeholder=""
                      className={`w-full py-[6px] px-3 outline-none border-[1px] ${
                        errorAddress && !address
                          ? "border-redColor"
                          : "border-[#ced4da]"
                      } rounded text-sm`}
                    />
                  </div>
                </label>
                <div className="flex flex-row items-center justify-end px-4">
                  <button
                    onClick={checkoutReview}
                    className="px-3 py-[6px] bg-primaryColor text-white font-semibold uppercase rounded hover:bg-secondaryColor transition-all duration-100 ease-in-out"
                  >
                    Kiểm tra
                  </button>
                </div>
              </form>
            </div>
            <div className="w-[45%]">
              <div className="px-4 py-5 mb-6 border-[1px] border-secondaryBgColor">
                <div className="text-base text-textColor font-semibold uppercase mb-3">
                  Đơn hàng của bạn
                </div>
                <div>
                  {temporaryCart &&
                    temporaryCart.map((product, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-start justify-start mb-3"
                      >
                        <div className="w-16">
                          <img
                            src={product?.thumb}
                            className="w-full object-contain object-center"
                            alt=""
                          />
                        </div>
                        <div className="pt-2 ml-2 flex flex-1 flex-col items-start justify-start overflow-hidden">
                          <div className="mb-2 text-sm text-textColor w-full truncate">
                            {product?.name}
                          </div>
                          <div className="flex flex-row items-center justify-between w-full text-sm text-textColor">
                            <div>
                              <span>{product?.quantity}</span>
                              <span> x </span>
                              <span className="text-secondaryColor font-medium">
                                {formatPrice(product?.price)}
                              </span>
                            </div>
                            <div className="text-secondaryColor font-medium">
                              {formatPrice(product?.quantity * product?.price)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mb-2 flex flex-row items-center justify-between text-sm font-medium">
                  <span className="text-textColor">Tạm tính:</span>
                  <span className="text-secondaryColor font-semibold">
                    {formatPrice(
                      dataCheckout ? dataCheckout?.checkoutOrder?.totalPrice : 0
                    )}
                  </span>
                </div>
                <div className="mb-2 flex flex-row items-center justify-between text-sm font-medium">
                  <span className="text-textColor">Phí vận chuyển:</span>
                  <span className="text-secondaryColor font-semibold">
                    {formatPrice(
                      dataCheckout ? dataCheckout?.checkoutOrder?.feeShip : 0
                    )}
                  </span>
                </div>
                <div className="my-3 w-full h-[2px] bg-redColor rounded-sm"></div>
                <div className="flex flex-row items-center justify-between text-sm font-medium">
                  <span className="text-textColor">Thành tiền:</span>
                  <span className="text-redColor font-semibold text-lg">
                    {formatPrice(
                      dataCheckout
                        ? dataCheckout?.checkoutOrder?.totalCheckout
                        : 0
                    )}
                  </span>
                </div>
              </div>
              <div
                className={
                  dataCheckout ? "cursor-pointer" : "pointer-events-none"
                }
              >
                {dataCheckout && (
                  <PayPalPayment
                    amount={dataCheckout?.checkoutOrder?.totalCheckout}
                    dataOrder={dataOrder}
                    setDataOrder={setDataOrder}
                    setPaymentSuccess={setPaymentSuccess}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[1200px] mx-auto mb-10">
          <div className="mt-6 mb-10 text-base text-secondaryTextColor font-medium">
            <span className="text-textColor">Trang chủ</span> / Thanh toán đơn
            hàng
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="mb-3 text-lg text-textColor font-medium">
              Thanh toán thành công
            </div>
            <Link
              to={"/"}
              className="py-2 px-4 bg-secondaryColor text-lg text-white font-semibold rounded-md hover:bg-greenColor transition-all duration-100 ease-in-out"
            >
              Tiếp tục mua hàng
            </Link>
          </div>
        </div>
      )}

      <Footer />

      {isLoading && (
        <div className="absolute z-[100000] top-0 right-0 left-0 bottom-0 w-[100vw] h-[150vh] flex flex-row items-center justify-center bg-black bg-opacity-[0.3]">
          <div className="flex flex-row items-center justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primaryColor border-r-transparent align-[-0.125em] text-danger motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
