import React from "react";

import { StarGoldIcon, StarIcon, StarHalfIcon } from "../../assets";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {
  console.log(product);
  const fullStars = Math.floor(product?.rating);
  const hasHalfStar = product?.rating % 1 !== 0;

  const formattedNumber = product?.price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return (
    <Link to={`/products/${product?._id}`}>
      <div className="border-[1px] border-secondaryBgColor cursor-pointer hover:border-secondaryColor transition-all duration-100 ease-in-out">
        <img
          src={product?.thumb}
          alt=""
          className="w-full h-[200px] object-contain object-center"
        />
        <div className="text-secondaryTextColor text-sm overflow-hidden px-[6px] mt-[6px]">
          <p className="truncate">{product?.name}</p>
        </div>
        <div className="text-sm font-semibold text-secondaryColor px-[6px] mt-[6px]">
          {formattedNumber}
        </div>
        <div className="flex flex-row items-center justify-start px-[6px] mt-[6px] mb-2">
          <div className="flex flex-row items-center justify-start gap-x-[2px]">
            {Array.from({ length: fullStars }, (_, index) => (
              <StarGoldIcon key={index} />
            ))}
            {hasHalfStar && <StarHalfIcon />}
            {fullStars === 0 &&
              Array.from({ length: 5 }, (_, index) => <StarIcon key={index} />)}
          </div>
          <div className="text-sm text-secondaryTextColor pl-2 mt-[1px]">
            Đã bán {product?.qtySold}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleProduct;
