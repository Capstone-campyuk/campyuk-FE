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
import AddCamp from "../pages/Host/AddCamp";
import EditCampHost from "../pages/Host/EditCampHost";

function App() {
  const [cookie, , removeCookie] = useCookies(["token", "role"]);
  const checkToken = cookie.token;
  const checkRole = cookie.role;

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
      element: checkToken ? <Home /> : <Login />,
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
      path: "/profile/:id_username",
      element: checkRole === "guest" ? <Profile /> : <Home />,
    },
    {
      path: "/order",
      element: checkRole === "guest" ? <Order /> : <Home />,
    },
    {
      path: "/booking-history",
      element: checkRole === "guest" ? <BookingHistory /> : <Home />,
    },
    {
      path: "/booking/:id_booking",
      element: checkToken ? <BookingDetail /> : <Home />,
    },
    {
      path: "/host/:id_username",
      element: checkRole === "host" ? <DashboardHost /> : <Home />,
    },
    {
      path: "/addcamp",
      element: checkRole === "host" ? <AddCamp /> : <Home />,
    },
    {
      path: "/camp-host/:id_camp",
      element: checkRole === "host" ? <DetailCampHost /> : <Home />,
    },
    {
      path: "/orderlist-host",
      element: checkRole === "host" ? <OrderListHost /> : <Home />,
    },
    {
      path: "/edit-camp/:id_camp",
      element: checkRole === "host" ? <EditCampHost /> : <Home />,
    },
    {
      path: "/admin",
      element: checkRole === "admin" ? <DashboardAdmin /> : <Home />,
    },
    {
      path: "/camp-admin/:id_camp",
      element: checkRole === "admin" ? <DetailAdmin /> : <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
