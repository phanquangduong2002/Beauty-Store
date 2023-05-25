import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

import Signin from "./pages/Signin/Signin";
import Error from "./pages/Error/Error";
import Dashboard from "./pages/Dashboard/Dashboard";
import Contact from "./components/Contact/Contact";

const Layout = () => {
  return (
    <div>
      <Contact />
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
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "account/signin",
    element: <Signin />,
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
