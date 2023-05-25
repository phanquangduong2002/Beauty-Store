import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import "swiper/css/autoplay";

import { LIST_IMAGE_BANNER } from "../../assets";

const Banner = () => {
  return (
    <div>
      <div className="max-w-[1200px] mx-auto">
        <Swiper
          modules={[Autoplay]}
          speed={1000}
          loop
          autoplay={true}
          className="w-full h-full"
        >
          {LIST_IMAGE_BANNER.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
