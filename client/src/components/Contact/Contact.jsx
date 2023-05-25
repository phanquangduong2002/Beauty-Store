import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

import { Link, useNavigate } from "react-router-dom";

import { LOCAL_STORAGE_TOKEN_NAME } from "../../api/constants";
import setAuthToken from "../../utils/setAuthToken";

const Contact = () => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/account/signin");
  };

  return (
    <div className="bg-secondaryBgColor">
      <div className="max-w-[1200px] mx-auto">
        <div className="py-[6px] flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-start gap-x-3">
            <span className="cursor-pointer">
              <svg
                width="16px"
                height="16px"
                viewBox="-5 0 20 20"
                version="1.1"
                className="text-secondaryIconColor hover:text-greenColor transition-all duration-100 ease-in-out"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="currentColor"
                  fillRule="evenodd"
                >
                  <g
                    transform="translate(-385.000000, -7399.000000)"
                    fill="currentColor"
                  >
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            <span className="cursor-pointer">
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 20 20"
                version="1.1"
                className="text-secondaryIconColor hover:text-greenColor transition-all duration-100 ease-in-out"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="currentColor"
                  fillRule="evenodd"
                >
                  <g
                    transform="translate(-340.000000, -7439.000000)"
                    fill="currentColor"
                  >
                    <g transform="translate(56.000000, 160.000000)">
                      <path d="M289.869652,7279.12273 C288.241769,7279.19618 286.830805,7279.5942 285.691486,7280.72871 C284.548187,7281.86918 284.155147,7283.28558 284.081514,7284.89653 C284.035742,7285.90201 283.768077,7293.49818 284.544207,7295.49028 C285.067597,7296.83422 286.098457,7297.86749 287.454694,7298.39256 C288.087538,7298.63872 288.809936,7298.80547 289.869652,7298.85411 C298.730467,7299.25511 302.015089,7299.03674 303.400182,7295.49028 C303.645956,7294.859 303.815113,7294.1374 303.86188,7293.08031 C304.26686,7284.19677 303.796207,7282.27117 302.251908,7280.72871 C301.027016,7279.50685 299.5862,7278.67508 289.869652,7279.12273 M289.951245,7297.06748 C288.981083,7297.0238 288.454707,7296.86201 288.103459,7296.72603 C287.219865,7296.3826 286.556174,7295.72155 286.214876,7294.84312 C285.623823,7293.32944 285.819846,7286.14023 285.872583,7284.97693 C285.924325,7283.83745 286.155174,7282.79624 286.959165,7281.99226 C287.954203,7280.99968 289.239792,7280.51332 297.993144,7280.90837 C299.135448,7280.95998 300.179243,7281.19026 300.985224,7281.99226 C301.980262,7282.98483 302.473801,7284.28014 302.071806,7292.99991 C302.028024,7293.96767 301.865833,7294.49274 301.729513,7294.84312 C300.829003,7297.15085 298.757333,7297.47145 289.951245,7297.06748 M298.089663,7283.68956 C298.089663,7284.34665 298.623998,7284.88065 299.283709,7284.88065 C299.943419,7284.88065 300.47875,7284.34665 300.47875,7283.68956 C300.47875,7283.03248 299.943419,7282.49847 299.283709,7282.49847 C298.623998,7282.49847 298.089663,7283.03248 298.089663,7283.68956 M288.862673,7288.98792 C288.862673,7291.80286 291.150266,7294.08479 293.972194,7294.08479 C296.794123,7294.08479 299.081716,7291.80286 299.081716,7288.98792 C299.081716,7286.17298 296.794123,7283.89205 293.972194,7283.89205 C291.150266,7283.89205 288.862673,7286.17298 288.862673,7288.98792 M290.655732,7288.98792 C290.655732,7287.16159 292.140329,7285.67967 293.972194,7285.67967 C295.80406,7285.67967 297.288657,7287.16159 297.288657,7288.98792 C297.288657,7290.81525 295.80406,7292.29716 293.972194,7292.29716 C292.140329,7292.29716 290.655732,7290.81525 290.655732,7288.98792"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            <span className="cursor-pointer">
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 20 20"
                version="1.1"
                className="text-secondaryIconColor hover:text-greenColor transition-all duration-100 ease-in-out"
              >
                <g
                  stroke="none"
                  strokeWidth="1"
                  fill="currentColor"
                  fillRule="evenodd"
                >
                  <g
                    transform="translate(-220.000000, -7399.000000)"
                    fill="currentColor"
                  >
                    <g transform="translate(56.000000, 160.000000)">
                      <path d="M173.876,7239 C168.399,7239 164,7243.43481 164,7248.95866 C164,7253.05869 166.407,7256.48916 169.893,7258.07936 C169.893,7256.21186 169.88,7256.45286 171.303,7250.38046 C170.521,7248.80236 171.129,7246.19673 172.88,7246.19673 C175.31,7246.19673 173.659,7249.79964 173.378,7251.2174 C173.129,7252.30544 173.959,7253.14238 174.955,7253.14238 C176.864,7253.14238 178.108,7250.71524 178.108,7247.87063 C178.108,7245.69456 176.615,7244.10437 174.042,7244.10437 C169.467,7244.10437 168.307,7249.19966 169.893,7250.79893 C170.292,7251.40294 169.893,7251.43118 169.893,7252.22174 C169.616,7253.05768 167.403,7251.84259 167.403,7248.70757 C167.403,7245.86195 169.727,7242.51518 174.457,7242.51518 C178.191,7242.51518 180.681,7245.27609 180.681,7248.2054 C180.681,7252.13805 178.523,7254.98366 175.37,7254.98366 C174.291,7254.98366 173.295,7254.3978 172.963,7253.72824 C172.36,7256.07371 172.238,7257.26258 171.303,7258.58153 C172.216,7258.83261 173.129,7259 174.125,7259 C179.602,7259 184,7254.56519 184,7249.04235 C183.752,7243.43481 179.353,7239 173.876,7239"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            <span className="cursor-pointer">
              <svg width="16px" height="16px" viewBox="0 0 20 20" version="1.1">
                <g
                  stroke="none"
                  strokeWidth="1"
                  fill="currentColor"
                  fillRule="evenodd"
                  className="text-secondaryIconColor hover:text-greenColor transition-all duration-100 ease-in-out"
                >
                  <g
                    transform="translate(-300.000000, -7399.000000)"
                    fill="currentColor"
                  >
                    <g transform="translate(56.000000, 160.000000)">
                      <path d="M263.821537,7247.00386 L254.211298,7247.00386 C254.211298,7248.0033 254.211298,7250.00218 254.205172,7251.00161 L259.774046,7251.00161 C259.560644,7252.00105 258.804036,7253.40026 257.734984,7254.10487 C257.733963,7254.10387 257.732942,7254.11086 257.7309,7254.10986 C256.309581,7255.04834 254.43389,7255.26122 253.041161,7254.98137 C250.85813,7254.54762 249.130492,7252.96451 248.429023,7250.95364 C248.433107,7250.95064 248.43617,7250.92266 248.439233,7250.92066 C248.000176,7249.67336 248.000176,7248.0033 248.439233,7247.00386 L248.438212,7247.00386 C249.003881,7245.1669 250.783592,7243.49084 252.969687,7243.0321 C254.727956,7242.65931 256.71188,7243.06308 258.170978,7244.42831 C258.36498,7244.23842 260.856372,7241.80579 261.043226,7241.6079 C256.0584,7237.09344 248.076756,7238.68155 245.090149,7244.51127 L245.089128,7244.51127 C245.089128,7244.51127 245.090149,7244.51127 245.084023,7244.52226 L245.084023,7244.52226 C243.606545,7247.38565 243.667809,7250.75975 245.094233,7253.48622 C245.090149,7253.48921 245.087086,7253.49121 245.084023,7253.49421 C246.376687,7256.0028 248.729215,7257.92672 251.563684,7258.6593 C254.574796,7259.44886 258.406843,7258.90916 260.973794,7256.58747 C260.974815,7256.58847 260.975836,7256.58947 260.976857,7256.59047 C263.15172,7254.63157 264.505648,7251.29445 263.821537,7247.00386"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
          </div>
          <div className="flex flex-row items-center justify-start gap-x-8">
            <div>
              <a href="tel:0373745152" className="text-sm">
                <span className="font-bold text-primaryColor">Hotline: </span>
                <span className="font-semibold text-redColor">
                  0373 745 152
                </span>
              </a>
            </div>
            <div>
              <a href="tel:0373745152" className="text-sm">
                <span className="font-bold text-primaryColor">
                  Tổng đài tư vấn:{" "}
                </span>
                <span className="font-semibold text-redColor">
                  0373 745 152
                </span>
              </a>
            </div>
            <div className="group relative text-sm flex flex-row items-center gap-x-2 justify-start text-secondaryIconColor hover:text-greenColor transition-all duration-100 ease-in-out cursor-pointer before:absolute before:content before:w-full before:h-[40px] before:bg-transparent before:-bottom-[30px] before:right-0">
              <span>Tài khoản</span>
              <span>
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              {!currentUser ? (
                <div className="hidden w-[160px] absolute -bottom-[116px] right-0 py-3 px-4 rounded-lg bg-white border-[1px] border-secondaryIconColor group-hover:flex flex-col items-center justify-center text-secondaryColor text-base font-medium">
                  <Link
                    to={"/account/register"}
                    className="p-1 mb-2 w-full border-[1px] border-secondaryColor rounded-md text-center hover:bg-secondaryColor hover:text-white transition-all duration-100 ease-in-out"
                  >
                    Đăng kí
                  </Link>
                  <Link
                    to={"/account/signin"}
                    className="p-1 w-full border-[1px] border-secondaryColor rounded-md text-center hover:bg-secondaryColor hover:text-white transition-all duration-100 ease-in-out"
                  >
                    Đăng nhập
                  </Link>
                </div>
              ) : (
                <div className="hidden w-[160px] absolute -bottom-[116px] right-0 py-3 px-4 rounded-lg bg-white border-[1px] border-secondaryIconColor group-hover:flex flex-col items-center justify-center text-secondaryColor text-base font-medium">
                  <Link
                    to={"/order"}
                    className="p-1 mb-2 w-full border-[1px] border-secondaryColor rounded-md text-center hover:bg-secondaryColor hover:text-white transition-all duration-100 ease-in-out"
                  >
                    Đơn hàng
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-1 w-full border-[1px] border-secondaryColor rounded-md text-center hover:bg-secondaryColor hover:text-white transition-all duration-100 ease-in-out"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
