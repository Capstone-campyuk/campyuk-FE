import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import withReactContent from "sweetalert2-react-content";

import { Layout } from "../components/Layout";
import { Btn, Btns } from "../components/Button";
import { ImLocation } from "react-icons/im";
import { DotWave } from "@uiball/loaders";

import Swal from "../utils/Swal";
import { ItemsTypes } from "../utils/types/bookingTypes";
import { BookingTypes } from "../utils/types/bookingTypes";

function BookingDetail() {
  const [booking, setBooking] = useState<BookingTypes>({});
  const [items, setItems] = useState<ItemsTypes[]>([]);
  const [cookie, setCookies] = useCookies(["role", "username"]);
  const [loading, setLoading] = useState(true);
  const { id_booking } = useParams();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = () => {
    axios
      .get(`https://abiasa.site/bookings/${id_booking}`)
      .then((res) => {
        setBooking(res.data.data);
        setItems(res.data.data.items);
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

  const handleAccept = () => {
    axios
      .put(`https://abiasa.site/bookings/${id_booking}/accept`)
      .then(() => {
        MySwal.fire({
          icon: "success",
          title: "Done",
          text: "Accept Booking Success",
          showCancelButton: false,
        });
        navigate(`/booking-history/${cookie.username}`);
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          text: err.response.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      });
  };

  const handleCancel = () => {
    axios
      .put(`https://abiasa.site/bookings/${id_booking}/cancel`)
      .then(() => {
        MySwal.fire({
          icon: "success",
          title: "Done",
          text: "Cancel Booking Success",
          showCancelButton: false,
        });
        navigate(`/booking-history/${cookie.username}`);
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          text: err.response.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      });
  };

  return (
    <Layout>
      <h1 id="orderhost-page" className="text-4xl p-5">
        Detail Booking #{id_booking}
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <DotWave size={100} color={"#1E3231"} />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row bg-bgcard rounded-3xl shadow-lg lg:h-[50vh] w-[95vw] m-3 lg:mx-auto">
            <img
              className="object-cover md:rounded-l-3xl md:w-2/3"
              src={booking.camp_image}
              alt={booking.camp_title}
            />
            <div className="flex flex-col p-5 gap-10 w-full md:w-1/3 justify-around">
              <div className="flex flex-col gap-1">
                <h1 className="lg:text-xl">{booking.camp_title}</h1>
                <p className="flex items-center gap-1">
                  <ImLocation />
                  {booking.camp_city}
                </p>
                <p>{booking.camp_address}</p>
                <h1 className="mt-4 lg:text-xl">Booking Date</h1>
                <p>{booking.booking_date}</p>
                <h1 className="mt-4 lg:text-xl">
                  $ {booking.camp_price} /night
                </h1>
              </div>
              <div className="flex justify-end items-center">
                {booking.status === "CANCELLED" && (
                  <p
                    id="status"
                    className="bg-red-600 text-bgcard text-center rounded-3xl p-2"
                  >
                    {booking.status}
                  </p>
                )}
                {booking.status === "SUCCESS" && (
                  <p
                    id="status"
                    className="bg-green-600 text-bgcard text-center rounded-3xl p-2"
                  >
                    {booking.status}
                  </p>
                )}
                {booking.status === "PENDING" && (
                  <p
                    id="status"
                    className="bg-yellow-600 text-bgcard text-center rounded-3xl p-2"
                  >
                    {booking.status}
                  </p>
                )}
                {booking.status === "EXPIRE" && (
                  <p
                    id="status"
                    className="bg-gray-500 text-bgcard text-center rounded-3xl p-2"
                  >
                    {booking.status}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-bgcard shadow-lg p-5 rounded-3xl lg:w-[70vw] w-[95vw] md:my-10 md:mx-auto gap-5">
            <div className="flex flex-col md:flex-row md:justify-between w-full text-xl">
              <h1>Check In: {booking.check_in}</h1>
              <h1>Check Out: {booking.check_out} </h1>
            </div>
            <div className="flex justify-between lg:gap-24">
              <div>
                <h1 className="text-xl">Camp Site</h1>
                <p className="capitalize">{booking.camp_title}</p>
                <p>Guest: {booking.guest} Person</p>
                <p>Sub Total: $ {booking.camp_cost}</p>
              </div>
              {items.length > 0 && (
                <div>
                  <h1 className="text-xl">Add On</h1>
                  <div className="flex gap-4">
                    {items.map((item, index) => (
                      <div key={index}>
                        <p>Item: {item.name}</p>
                        <p>Price: $ {item.rent_price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {booking.status === "PENDING" && cookie.role === "guest" && (
              <div className="flex flex-col justify-between">
                <h1 className="text-xl">Payment</h1>
                <p className="capitalize">Bank: {booking.bank}</p>
                <p>VA Number: {booking.virtual_number}</p>
                <p>Total price: $ {booking.total_price}</p>
              </div>
            )}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl mt-4">Invoice</h1>
                <p>{booking.ticket}</p>
              </div>
              {cookie.role === "host" && booking.status === "PENDING" ? (
                <div className="flex gap-4">
                  <Btn
                    id="btn-cancel"
                    className="w-24"
                    label="Cancel"
                    onClick={() => handleCancel()}
                  />
                  <Btns
                    id="btn-accept"
                    className="w-24"
                    label="Accept"
                    onClick={() => handleAccept()}
                  />
                </div>
              ) : cookie.role === "guest" && booking.status === "PENDING" ? (
                <div className="flex gap-4">
                  <Btn
                    id="btn-cancel"
                    className="w-24"
                    label="Cancel"
                    onClick={() => handleCancel()}
                  />
                </div>
              ) : (
                cookie.role === "guest" &&
                booking.status === "SUCCESS" && (
                  <a href={`https://abiasa.site/bookings/${id_booking}/oauth`}>
                    <Btn id="btn-reminder" className="w-24" label="Reminder" />
                  </a>
                )
              )}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default BookingDetail;
