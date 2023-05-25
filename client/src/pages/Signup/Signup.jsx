import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";

import axios from "axios";
import { url, LOCAL_STORAGE_TOKEN_NAME } from "../../api/constants";

import setAuthToken from "../../utils/setAuthToken";

import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { EyeOffIcon, EyeOnIcon } from "../../assets";
import Contact from "../../components/Contact/Contact";
const Signup = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      !name ? setErrorName(true) : setErrorName(false);
      !email ? setErrorEmail(true) : setErrorEmail(false);
      !password ? setErrorPassword(true) : setErrorPassword(false);
      !confirmPassword
        ? setErrorConfirmPassword(true)
        : setErrorConfirmPassword(false);
      return;
    }

    if (password !== confirmPassword) {
      setError(true);
      setMessage("Confirm password invalid !!!");
      setTimeout(() => setError(false), 2000);
      return;
    }

    dispatch(loginStart());
    try {
      const res = await axios.post(`${url}/auth/signup`, {
        name,
        email,
        password,
      });
      if (res.data.success) {
        dispatch(loginSuccess(res.data.user));
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
      dispatch(loginFailed());
      setError(true);
      setMessage(error.response.data.message);

      setTimeout(() => setError(false), 2000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      <Contact />

      <div className="min-h-[80vh] flex flex-row items-center justify-center">
        <div className="w-[460px] border-[1px] border-primaryColor rounded-md overflow-hidden">
          <div className="p-8">
            <div className="text-xl font-bold text-primaryColor uppercase mb-2">
              Đăng kí
            </div>
            <div className="mb-5 text-sm">
              Bạn đã tài khoản?{" "}
              <Link
                to={"/account/signin"}
                className="font-semibold text-primaryColor"
              >
                Đăng nhập
              </Link>
            </div>
            {isLoading && (
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
            )}

            {error && (
              <div className="w-full px-4 py-1 my-2 bg-red-500 text-white rounded-md text-center">
                {message}
              </div>
            )}
            <form action="">
              <label htmlFor="name" className="block w-full mb-5">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Tên người dùng"
                  id="name"
                  className={`py-2 px-2 w-full outline-none border-[1px] ${
                    errorName && !name
                      ? "border-redColor"
                      : "border-borderInputColor"
                  } focus:border-secondaryIconColor rounded text-textColor text-sm placeholder:text-sm`}
                />
              </label>
              {errorEmail && !email && (
                <div className="text-xs text-redColor mb-1">
                  Vui lòng điền vào mục này
                </div>
              )}
              <label htmlFor="email" className="block w-full mb-5">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                  id="email"
                  className={`py-2 px-2 w-full outline-none border-[1px] ${
                    errorEmail && !email
                      ? "border-redColor"
                      : "border-borderInputColor"
                  } focus:border-secondaryIconColor rounded text-textColor text-sm placeholder:text-sm`}
                />
              </label>
              {errorEmail && !email && (
                <div className="text-xs text-redColor mb-1">
                  Vui lòng điền vào mục này
                </div>
              )}
              <label htmlFor="password" className="block w-full relative mb-5">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  id="password"
                  className={`py-2 px-2 w-full outline-none border-[1px] ${
                    errorPassword && !password
                      ? "border-redColor"
                      : "border-borderInputColor"
                  } focus:border-secondaryIconColor rounded text-textColor text-sm placeholder:text-sm`}
                />
                <div
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute top-[50%] -translate-y-1/2 right-2 cursor-pointer"
                >
                  {isShowPassword ? <EyeOnIcon /> : <EyeOffIcon />}
                </div>
              </label>
              {errorPassword && !password && (
                <div className="text-xs text-redColor mb-1">
                  Vui lòng điền vào mục này
                </div>
              )}
              <label
                htmlFor="confirmPassword"
                className="block w-full relative mb-5"
              >
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={isShowConfirmPassword ? "text" : "password"}
                  placeholder="Xác nhận mật khẩu"
                  id="confirmPassword"
                  className={`py-2 px-2 w-full outline-none border-[1px] ${
                    errorConfirmPassword && !confirmPassword
                      ? "border-redColor"
                      : "border-borderInputColor"
                  } focus:border-secondaryIconColor rounded text-textColor text-sm placeholder:text-sm`}
                />
                <div
                  onClick={() =>
                    setIsShowConfirmPassword(!isShowConfirmPassword)
                  }
                  className="absolute top-[50%] -translate-y-1/2 right-2 cursor-pointer"
                >
                  {isShowConfirmPassword ? <EyeOnIcon /> : <EyeOffIcon />}
                </div>
              </label>
              {errorConfirmPassword && !confirmPassword && (
                <div className="text-xs text-redColor mb-1">
                  Vui lòng điền vào mục này
                </div>
              )}
              <div className="flex flex-row items-center justify-between">
                <div className="flex-1">
                  <button
                    onClick={handleRegister}
                    className="px-3 py-1 w-full bg-primaryColor hover:bg-secondaryColor rounded text-white text-base font-semibold uppercase transition-all duration-100 ease-in-out"
                  >
                    Đăng kí
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
