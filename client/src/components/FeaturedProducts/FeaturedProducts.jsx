import React, { useEffect, useState } from "react";

import axios from "axios";
import { url } from "../../api/constants";

import { useDispatch, useSelector } from "react-redux";

import SingleProduct from "../SingleProduct/SingleProduct";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${url}/products/find`, {
          params: {
            limit: 5,
            sort: "rating",
          },
        });
        if (res?.data?.success) {
          setIsLoading(false);
          setProducts(res?.data?.products);
        }
      } catch (error) {
        console.log(error?.responsive?.data);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="max-w-[1200px] mx-auto mt-12">
      <div className="flex flex-row items-center justify-between border-b-[1px] border-secondaryBgColor">
        <div className="text-lg text-textColor font-bold uppercase pb-[6px] px-[10px] border-b-[3px] border-secondaryColor">
          Sản phẩm nổi bật
        </div>
        <Link to={""}>
          <button className="py-[6px] px-3 bg-secondaryColor text-white text-sm font-medium rounded hover:bg-greenColor transition-all duration-100 ease-in-out">
            Xem thêm
          </button>
        </Link>
      </div>
      <div>
        {isLoading ? (
          <div className="w-full flex flex-row items-center justify-center mb-5">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primaryColor border-r-transparent align-[-0.125em] text-danger motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-row mt-5">
            {products &&
              products.length > 0 &&
              products.map((product, index) => (
                <div key={index} className="px-2 w-[20%]">
                  <SingleProduct product={product} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
