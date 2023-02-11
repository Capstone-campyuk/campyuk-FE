import { useEffect, useState } from "react";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import { useCookies } from "react-cookie";

import { Layout } from "../components/Layout";
import { CardLong } from "../components/Card";
import { LoadingLong } from "../components/Loading";
import { MdArrowDropDownCircle } from "react-icons/md";

import Swal from "../utils/Swal";
import { BookingsTypes } from "../utils/types/bookingTypes";

function OrderListHost() {
  const [orders, setOrders] = useState<BookingsTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cookie] = useCookies(["token"]);
  const [page, setPage] = useState<number>(2);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = (page: number) => {
    axios
      .get(`https://abiasa.site/bookings/?page=${page}`)
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          text: err.response.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function nextPage() {
    const request = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie.token}`,
        "Content-Type": "application/json",
      },
    };
    const newPage = page + 1;
    fetch(`https://abiasa.site/bookings/?page=${page}`, request)
      .then((response) => response.json())
      .then((res) => {
        const results = res.data;
        const result = orders.slice();
        result.push(...results);
        setOrders(result);
        setPage(newPage);
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          text: err.response.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      });
  }

  return (
    <Layout>
      <h1 id="orderhost-page" className="text-4xl p-5">
        Booking History
      </h1>
      <div className="flex flex-col items-center gap-10 px-2 lg:px-6 pb-6">
        {loading ? (
          <LoadingLong />
        ) : (
          orders.map((order, index) => (
            <CardLong
              key={index}
              id={order.id}
              image={order.camp_image}
              campsite={order.camp_title}
              loc={order.camp_city}
              checkin={order.check_in}
              checkout={order.check_out}
              eticket={order.ticket}
              totalprice={order.total_price}
              status={order.status}
            />
          ))
        )}
      </div>
      <MdArrowDropDownCircle
        className="text-primary text-6xl w-full flex justify-center my-5 cursor-pointer"
        onClick={nextPage}
      />
    </Layout>
  );
}

export default OrderListHost;
