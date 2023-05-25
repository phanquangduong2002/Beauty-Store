import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { useEffect, useState } from "react";

import axios from "axios";

import { url } from "../../api/constants";
import { useSelector } from "react-redux";

const PayPalPayment = ({
  amount,
  dataOrder,
  setDataOrder,
  setPaymentSuccess,
}) => {
  const [paymentDetails, setPaymentDetails] = useState(null);

  const exchangeRate = 23000;
  const usdAmount = (amount / exchangeRate).toFixed(2);

  useEffect(() => {
    if (!paymentDetails) return;
    dataOrder.userPayment = {
      type: "Paypal",
      status: paymentDetails?.status,
      create_time: paymentDetails?.create_time,
    };

    setDataOrder(dataOrder);
    setPaymentSuccess(true);
  }, [paymentDetails]);

  const createOrder = (data, actions) => {
    if (usdAmount <= 0) {
      console.error("Giá trị không hợp lệ");
      return null;
    }

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: usdAmount,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      // Xử lý khi thanh toán thành công
      console.log(details);
      setPaymentDetails(details);
    });
  };

  const onError = (error) => {
    // Xử lý khi có lỗi trong quá trình thanh toán
    console.log(error);
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "Af8Sx-1lv49fXs1j3k-fLergYjwdYnDbDPzqDAXr1W3TIQPITHUroh3DNJ0JHPyhPqU0w0QLc9VtxZKb",
      }}
    >
      <div>
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;
