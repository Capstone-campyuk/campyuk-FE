import React from "react";
import axios, { AxiosHeaders } from "axios";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useCookies } from "react-cookie";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CampList from "../pages/CampList";
import DetailCamp from "../pages/DetailCamp";
import Order from "../pages/Order";
import BookingHistory from "../pages/BookingHistory";
import BookingDetail from "../pages/BookingDetail";
import DashboardHost from "../pages/DashboardHost";
import DetailCampAdmin from "../pages/DetailCampHost";
import Profile from "../pages/Profile";

function App() {
  const [cookie, , removeCookie] = useCookies(["token"]);
  const checkToken = cookie.token;

  axios.interceptors.request.use(function (config) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${cookie.token}`;
    return config;
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/camplist",
      element: <CampList />,
    },
    {
      path: "/detail/:id_camp",
      element: <DetailCamp />,
    },
    {
      path: "/order/:id_order",
      element: <Order />,
    },
    {
      path: "/booking-history",
      element: <BookingHistory />,
    },
    {
      path: "/booking-detail/:id_booking",
      element: <BookingDetail />,
    },
    {
      path: "/dashboard-host",
      element: <DashboardHost />,
    },
    {
      path: "/detail-camp-host/:id_camp",
      element: <DetailCampAdmin />,
    },
    {
      path: "/profile/:id-username",
      element: <Profile />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
