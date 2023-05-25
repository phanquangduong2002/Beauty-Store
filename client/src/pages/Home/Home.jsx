import React, { useEffect } from "react";

import Contact from "../../components/Contact/Contact";
import Banner from "../../components/Banner/Banner";
import OutstandingProducts from "../../components/OutstandingProducts/OutstandingProducts";
import SellingProducts from "../../components/SellingProducts/SellingProducts";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import SkincareProduct from "../../components/SkincareProduct/SkincareProduct";
import MakeupProduct from "../../components/MakeupProduct/MakeupProduct";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative">
      <Banner />
      <OutstandingProducts />
      <SellingProducts />
      <FeaturedProducts />
      <SkincareProduct />
      <MakeupProduct />
      <Footer />
    </div>
  );
};

export default Home;
