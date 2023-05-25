import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Order from "./pages/Order/Order";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Error from "./pages/Error/Error";
import Cart from "./pages/Cart/Cart";

import Header from "./components/Header/Header";

import { LOCAL_STORAGE_TOKEN_NAME } from "./api/constants";
import setAuthToken from "./utils/setAuthToken";
import DetalProduct from "./pages/DetailProduct/DetalProduct";
import Checkout from "./pages/Checkout/Checkout";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet></Outlet>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/products/:id",
        element: <DetalProduct />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "account/signin",
    element: <Signin />,
  },
  {
    path: "account/register",
    element: <Signup />,
  },
]);

function App() {
  return (
    <div className="container mx-auto">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
