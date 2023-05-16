import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Order from "./pages/Order/Order";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Error from "./pages/Error/Error";

import Header from "./components/Header/Header";

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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/account/signin",
        element: <Signin />,
      },
      {
        path: "/account/register",
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
