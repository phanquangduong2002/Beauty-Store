import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { url } from "../../api/constants";

import { getCart, getCartSuccess, getCartFailed } from "../../redux/cartSlice";

import CHINH_SACH_1 from "../../assets/images/chinh-sach-04.png";
import CHINH_SACH_2 from "../../assets/images/chinh-sach-06.png";
import CHINH_SACH_3 from "../../assets/images/chinh-sach-07.png";

import Footer from "../../components/Footer/Footer";

import {
  StarGoldIcon,
  StarIcon,
  StarHalfIcon,
  IncreaseIcon,
  MinusIcon,
  CartIconLarge,
} from "../../assets";

const DetalProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);

  const [error, setError] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fullStars = Math.floor(product?.rating);
  const hasHalfStar = product?.rating % 1 !== 0;

  const formatPrice = (price) => {
    return price?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handleAddProductToCart = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      setError(true);
      return;
    }

    try {
      dispatch(getCart());
      const res = await axios.post(
        `${url}/cart`,
        {
          userId: currentUser?._id,
          product: {
            productId: product?._id,
            name: product?.name,
            thumb: product?.thumb,
            quantity: qty,
            oldQuantity: 0,
            price: product?.price,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(getCartSuccess(res.data.cart));
        navigate("/cart");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (qty === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [qty]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/products/${id}`);
        if (res?.data?.success) setProduct(res.data.product);
        console.log(res?.data?.product);
      } catch (error) {
        console.log(error?.response?.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="max-w-[1200px] mx-auto mt-10">
        <div className="flex flex-row items-start justify-start">
          <div className="w-[75%]">
            <div className="w-full flex flex-row items-start justify-start">
              <div className="w-[45%] p-3 border-[1px] border-[#e1e1e1] h-[400px] flex flex-row items-center justify-center cursor-pointer overflow-hidden">
                <img
                  src={product?.thumb}
                  alt=""
                  className="hover:scale-[1.1] transition-all duration-150 ease-in-out"
                />
              </div>
              <div className="flex-1 px-8">
                <div className="mb-[10px] text-lg text-secondaryTextColor font-medium">
                  {product?.name}
                </div>
                <div className="mb-[10px] flex flex-row items-center justify-start gap-x-2">
                  <div className="flex flex-row items-center justify-start gap-x-2">
                    {Array.from({ length: fullStars }, (_, index) => (
                      <StarGoldIcon key={index} />
                    ))}
                    {hasHalfStar && <StarHalfIcon />}
                    {fullStars === 0 &&
                      Array.from({ length: 5 }, (_, index) => (
                        <StarIcon key={index} />
                      ))}
                  </div>
                  <div className="text-base text-secondaryTextColor font-normal">
                    {product?.rating} sao
                  </div>
                  <div className="text-base text-secondaryTextColor font-normal">
                    {" "}
                    -{" "}
                  </div>
                  <div className="text-base text-secondaryTextColor font-normal">
                    {product?.numReviews} lượt đánh giá
                  </div>
                </div>
                <div className="mb-[10px] text-base text-secondaryColor font-semibold">
                  {formatPrice(product?.price)}
                </div>
                <div className="mb-[10px] text-base text-secondaryTextColor font-medium">
                  Thương hiệu: {product?.attributes?.brand}
                </div>
                <div className="mb-[10px] text-sm text-textColor font-medium">
                  {product?.description}
                </div>
                <div className="mt-6 flex flex-row items-center justify-start gap-x-5">
                  <div className="flex flex-row items-center justify-start gap-x-5">
                    <span>Số lượng: </span>
                    <div className="flex flex-row items-center justify-start gap-x-1">
                      <button
                        onClick={() => {
                          if (isDisabled) return;
                          setQty((qty) => qty - 1);
                        }}
                        className={`${
                          qty <= 0 ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        <MinusIcon />
                      </button>
                      <input
                        type="text"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="w-[35px] text-center"
                      />
                      <button
                        onClick={() => setQty((qty) => qty + 1)}
                        className="cursor-pointer"
                      >
                        <IncreaseIcon />
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleAddProductToCart}
                      className="py-2 px-5 bg-primaryColor rounded flex flex-row items-center justify-center gap-x-1 text-white text-sm font-medium hover:bg-secondaryColor transition-all duration-75 ease-in-out"
                    >
                      <CartIconLarge />
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="my-4 text-sm text-redColor font-medium">
                    Vui lòng đăng nhập để mua hàng
                  </div>
                )}
              </div>
            </div>
            <div className="mt-20">
              <h3 className="mb-4 text-lg font-bold text-secondaryColor uppercase">
                Chi tiết sản phẩm
              </h3>
              <div className="flex flex-row items-center justify-start text-sm font-medium text-textColor">
                <span className="w-[15%] text-base text-textColor font-semibold">
                  Danh mục:
                </span>{" "}
                {product?.category}
              </div>
              <div className="flex flex-row items-center justify-start text-sm font-medium text-textColor">
                <span className="w-[15%] text-base text-textColor font-semibold">
                  Thương hiệu:
                </span>{" "}
                {product?.attributes?.brand}
              </div>
              <div className="flex flex-row items-center justify-start text-sm font-medium text-textColor">
                <span className="w-[15%] text-base text-textColor font-semibold">
                  Thể loại:
                </span>{" "}
                {product?.attributes?.type}
              </div>
              <div className="flex flex-row items-center justify-start text-sm font-medium text-textColor">
                <span className="w-[15%] text-base text-textColor font-semibold">
                  Đã bán:
                </span>{" "}
                {product?.qtySold}
              </div>
              <div className="flex flex-col items-start justify-start text-sm font-medium text-textColor">
                <span className="text-base text-textColor font-semibold mb-2">
                  Mô tả:
                </span>
                <p className="w-[90%]">{product?.attributes?.detail}</p>
              </div>
            </div>
            <div className="mt-20">
              <h3 className="mb-4 text-lg font-bold text-secondaryColor uppercase">
                Đánh giá sản phẩm
              </h3>
            </div>
          </div>
          <div className="w-[25%]">
            <div className="p-3 border-[1px] border-[#e1e1e1] h-[400px]">
              <div className="text-lg text-textColor font-semibold uppercase mb-4">
                Chất lượng cho tất cả
              </div>
              <ul>
                <li className="flex flex-row items-start justify-start mb-8">
                  <div>
                    <img
                      src={CHINH_SACH_1}
                      alt=""
                      className="w-[75px] object-contain object-center"
                    />
                  </div>
                  <div className="flex-1 text-xs pt-1 pl-2">
                    <div className="font-semibold text-primaryColor pb-1">
                      MỸ PHẨM CHÍNH HÃNG
                    </div>
                    <p>
                      Chất lượng sản phẩm luôn được chứng nhận bằng sự tin cậy
                      của Khách Hàng suốt nhiều năm qua
                    </p>
                  </div>
                </li>
                <li className="flex flex-row items-start justify-start mb-8">
                  <div>
                    <img
                      src={CHINH_SACH_2}
                      alt=""
                      className="w-[75px] object-contain object-center"
                    />
                  </div>
                  <div className="flex-1 text-xs pt-1 pl-2">
                    <div className="font-semibold text-primaryColor pb-1">
                      MIỄN PHÍ GIAO HÀNG
                    </div>
                  </div>
                </li>
                <li className="flex flex-row items-start justify-start mb-8">
                  <div>
                    <img
                      src={CHINH_SACH_3}
                      alt=""
                      className="w-[75px] object-contain object-center"
                    />
                  </div>
                  <div className="flex-1 text-xs pt-1 pl-2">
                    <div className="font-semibold text-primaryColor pb-1">
                      TRI ÂN KHÁCH HÀNG
                    </div>
                    <p>
                      Với các chương trình khuyến mãi, các sự kiện & quà tặng
                      đặc biệt vô cùng hấp dẫn
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetalProduct;
