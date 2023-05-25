import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../api/constants";
import { useSelector } from "react-redux";
import { UserIcon } from "../../assets";

const Order = () => {
  const [orders, setOrders] = useState(null);

  const [status, setStatus] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handleUpdateOrders = async (orderId) => {
    try {
      setIsLoading(true);
      if (status === null) {
        setIsLoading(false);
        return;
      }
      const res = await axios.put(
        `${url}/checkout/orders/${orderId}`,
        {
          orderStatus: status,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
      const updatedOrders = await axios.get(`${url}/checkout/orders`, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });
      setOrders(updatedOrders?.data?.orders);
      setIsLoading(false);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${url}/checkout/orders`, {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        });
        setOrders(res?.data?.orders);
        setIsLoading(false);
      } catch (error) {
        console.log(error?.response?.data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ml-[200px] flex flex-row items-start justify-center mt-[100px]">
      {isLoading ? (
        <div className="absolute z-[100000] top-0 right-0 left-0 bottom-0 w-[100vw] h-[100vh] flex flex-row items-center justify-center bg-black bg-opacity-[0.3]">
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
      ) : (
        <div className="w-[800px]">
          {orders &&
            orders.map((order, index) => (
              <div
                key={index}
                className="mb-3 flex flex-row gap-x-4 items-center justify-start py-2 px-4 border-[1px] border-[#e1e1e1] rounded-md"
              >
                <div>
                  <UserIcon />
                </div>
                <div className="flex-1 text-textColor font-medium">
                  <div>{order?.userId?.name}</div>
                  <div>{order?.userId?.email}</div>
                </div>
                <div className="flex-1 text-textColor font-medium">
                  <div>Thanh toán</div>
                  <div className="text-secondaryColor font-semibold">
                    {formatPrice(order?.orderCheckout?.totalCheckout)}
                  </div>
                </div>
                <div className="flex-1 text-textColor font-medium">
                  <div>Trạng thái</div>
                  <select
                    name=""
                    id=""
                    defaultValue={order?.orderStatus}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="pending">pending</option>
                    <option value="confirmed">confirmed</option>
                    <option value="shipped">shipped</option>
                    <option value="delivered">delivered</option>
                  </select>
                </div>
                <div className="">
                  <button
                    onClick={() => handleUpdateOrders(order?._id)}
                    className="py-1 px-3 bg-primaryColor rounded text-white font-semibold uppercase hover:bg-secondaryColor"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Order;
