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
import DashboardAdmin from "../pages/Admin/DashboardAdmin";
import DetailAdmin from "../pages/Admin/DetailAdmin";
import OrderListHost from "../pages/Host/OrderListHost";
import AddTent from "../pages/Host/AddCamp";
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
      path: "/camp/:id_camp",
      element: <DetailCamp />,
    },
    {
      path: "/profile/:id-username",
      element: <Profile />,
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
      path: "/booking/:id_booking",
      element: <BookingDetail />,
    },
    {
      path: "/host/:id-username",
      element: <DashboardHost />,
    },
    {
      path: "/addtent",
      element: <AddTent />,
    },
    {
      path: "/camp-host/:id_camp",
      element: <DetailCampHost />,
    },
    {
      path: "/orderlist-host",
      element: <OrderListHost />,
    },
    {
      path: "/edit-camp/:id_camp",
      element: <EditCampHost />,
    },
    {
      path: "/admin",
      element: <DashboardAdmin />,
    },
    {
      path: "/camp-admin/:id_camp",
      element: <DetailAdmin />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
