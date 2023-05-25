import Reac, { useEffect } from "react";

import CartContainer from "../../components/CartContainer/CartContainer";
import Footer from "../../components/Footer/Footer";

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="max-w-[1200px] mx-auto mb-[100px]">
        <div className="py-6">
          <span className="text-sm font-medium text-textColor">Trang chủ </span>
          <span className="text-sm font-medium text-textColor"> / </span>
          <span className="text-sm font-medium text-[#666]"> Giỏ hàng</span>
        </div>
        <CartContainer />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
