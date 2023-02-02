import React from "react";
import axios, { AxiosHeaders } from "axios";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useCookies } from "react-cookie";

import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import CampList from "../pages/CampList";
import DetailCamp from "../pages/DetailCamp";
import Order from "../pages/Guest/Order";
import BookingHistory from "../pages/Guest/BookingHistory";
import BookingDetail from "../pages/BookingDetail";
import DashboardHost from "../pages/Host/DashboardHost";
import DetailCampHost from "../pages/Host/DetailCampHost";
import Profile from "../pages/Guest/Profile";
import DashboardSAdmin from "../pages/SuperAdmin/DashboardSAdmin";
import DetailSAdmin from "../pages/SuperAdmin/DetailSAdmin";
import OrderListHost from "../pages/Host/OrderListHost";
import AddTent from "../pages/Host/AddTent";
import EditCampHost from "../pages/Host/EditCampHost";

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
      element: <DetailCampHost />,
    },
    {
      path: "/profile/:id-username",
      element: <Profile />,
    },
    {
      path: "/super-admin",
      element: <DashboardSAdmin />,
    },
    {
      path: "/detail-admin/:id_camp",
      element: <DetailSAdmin />,
    },
    {
      path: "/orderlist-host",
      element: <OrderListHost />,
    },
    {
      path: "/addtent",
      element: <AddTent />,
    },
    {
      path: "/edit-camp/:id_camp",
      element: <EditCampHost />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
