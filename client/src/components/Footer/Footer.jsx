import React from "react";

const Footer = () => {
  return (
    <div className="bg-secondaryBgColor">
      <div className="max-w-[1200px] px-[15px] py-[35px] mx-auto">
        <div className="flex flex-row items-start justify-start gap-x-8">
          <div className="w-[40%]">
            <div className="my-3 pb-[10px] text-base font-bold text-primaryColor uppercase border-b-[1px] border-dashed border-primaryColor">
              Hệ thống cửa hàng
            </div>
            <div>
              <ul className="text-sm flex flex-col gap-y-1">
                <li className="text-textColor hover:text-secondaryColor cursor-pointer">
                  <span className="font-semibold">Hà Nội</span> - 89 Chùa Bộc,
                  Đống Đa, Hà Nội - 0911 584 114
                </li>
                <li className="text-textColor hover:text-secondaryColor cursor-pointer">
                  <span className="font-semibold">Hà Nội</span> - 165C Xuân
                  Thủy, Cầu Giấy, Hà Nội - 0911 464 114
                </li>
                <li className="text-textColor hover:text-secondaryColor cursor-pointer">
                  <span className="font-semibold">Hà Nội</span> - 165C Xuân
                  Thủy, Cầu Giấy, Hà Nội - 0911 464 114
                </li>
                <li className="text-textColor hover:text-secondaryColor cursor-pointer">
                  <span className="font-semibold">Hà Nội</span> - 165C Xuân
                  Thủy, Cầu Giấy, Hà Nội - 0911 464 114
                </li>
                <li className="text-textColor hover:text-secondaryColor cursor-pointer">
                  <span className="font-semibold">Hà Nội</span> - 165C Xuân
                  Thủy, Cầu Giấy, Hà Nội - 0911 464 114
                </li>
              </ul>
            </div>
          </div>
          <div className="w-[60%] flex flex-row items-start justify-start gap-x-8">
            <div>
              <div className="my-3 pb-[10px] text-base font-bold text-primaryColor uppercase border-b-[1px] border-dashed border-primaryColor">
                Về chúng tôi
              </div>
              <div>
                <ul className="text-sm flex flex-col gap-y-1">
                  <li className="text-textColor hover:text-secondaryColor cursor-pointer">
                    Hệ thống cửa hàng
                  </li>
                  <li className="text-textColor hover:text-secondaryColor cursor-pointer">
                    Giới thiệu BeautyGarden
                  </li>
                  <li className="text-textColor hover:text-secondaryColor cursor-pointer">
                    Liên kết
                  </li>
                  <li className="text-textColor hover:text-secondaryColor cursor-pointer">
                    Bảo mật thông tin
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="my-3 pb-[10px] text-base font-bold text-primaryColor uppercase border-b-[1px] border-dashed border-primaryColor">
                Hỗ trợ
              </div>
              <div>
                <ul className="text-sm flex flex-col gap-y-1">
                  <li className="text-textColor hover:text-secondaryColor cursor-pointer">
                    Giải đáp thắc mắc
                  </li>
                  <li className="text-textColor hover:text-secondaryColor cursor-pointer">
                    Hướng dẫn mua hàng
                  </li>
                  <li className="text-textColor hover:text-secondaryColor cursor-pointer">
                    Thanh toán vận chuyển
                  </li>
                  <li className="text-textColor hover:text-secondaryColor cursor-pointer">
                    Chính sách đổi hàng
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="my-3 pb-[10px] text-base font-bold text-primaryColor uppercase border-b-[1px] border-dashed border-primaryColor">
                Trụ sở chính
              </div>
              <div>
                <ul className="text-sm flex flex-col gap-y-1">
                  <li className="text-textColor hover:text-secondaryColor cursor-pointer">
                    Cửa hàng Beauty Garden
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Footer;
