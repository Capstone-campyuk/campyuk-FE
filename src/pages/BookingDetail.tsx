import react, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Layout } from "../components/Layout";
import { Btns } from "../components/Button";
import { ImLocation } from "react-icons/im";

//import { datacamp } from "../utils/const/datas";
import { BookingTypes } from "../utils/types/bookingTypes";

function BookingDetail() {
  const [detailbooking, setDetail] = useState<BookingTypes[]>([]);
  const [cookie, setCookies] = useCookies();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchDetail();
  }, []);

  function fetchDetail() {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    };
    axios
      .get(`https://abiasa.site/bookings/${id}`, config)
      .then((res) => {
        console.log("data detail booking", res);
        const { data } = res.data.data;
        setDetail(data);
      })
      .catch((err) => {});
  }
  return (
    <Layout>
      <h1 id="booking-detail-page" className="font-bold text-3xl pt-5 px-20">
        Detail Transaction
      </h1>
      {detailbooking.map((data) => (
        <>
          <div className="px-20 ">
            <div className="flex flex-col lg:flex-row m-5 bg-bgcard rounded-3xl shadow-lg">
              <img
                className="lg:w-1/2 lg:rounded-l-3xl"
                src={data.camp_image[1]}
                alt={data.camp_title}
              />
              <div className="flex flex-col p-5 lg:w-1/2 cursor-pointer ">
                <div>
                  <h1 className="text-2xl">{data.camp_title}</h1>
                  <p className="flex items-center">
                    <ImLocation /> {data.camp_city}
                  </p>
                  {/* <p className="text-xl">{data.description}</p> */}
                </div>

                <div className="flex justify-end pt-20">
                  <h1 className="text-3xl text-end">
                    ${data.camp_price}/night
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="px-20 pt-3 pb-10">
            <div className="flex flex-col gap-3 p-5 m-5 bg-bgcard rounded-3xl shadow-lg border-2">
              <h1 className="text-xl">
                Check In :<span className="font-normal">{data.check_in}</span>
              </h1>
              <h1 className="text-xl">
                Check Out :{" "}
                <span className="font-normal">{data.check_out}</span>
              </h1>
              <div className="flex flex-col lg:flex-row gap-10">
                <div>
                  <h1 className="text-lg mb-2">Campsite Cost</h1>
                  <p>{}</p>
                  <p>{data.camp_cost}</p>
                  <p>{data.guest}</p>
                  <p>Sub Total</p>
                </div>
                <div>
                  <h1 className="text-lg mb-2">{data.items[0].name}</h1>
                  <p>Night</p>
                  <p>{data.items[0].price}</p>
                  <p>{data.items[0].quantity}</p>
                  <p>Sub Total</p>
                </div>
                <div>
                  <h1 className="text-lg mb-2">{data.items[1].name}</h1>
                  <p>Night</p>
                  <p>{data.items[1].price}</p>
                  <p>{data.items[1].quantity}</p>
                  <p>Sub Total</p>
                </div>
                <div>
                  <h1 className="text-lg mb-2">{data.items[2].price}</h1>
                  <p>Night</p>
                  <p>{data.items[2].price}</p>
                  <p>{data.items[2].quantity}</p>
                  <p>Sub Total</p>
                </div>
              </div>
              <div>
                <h1 className="text-lg mb-2">{data.total_price}</h1>
                <h1 className="text-lg mb-2">{data.booking_date}</h1>
                <h1 className="text-lg mb-2">Payment</h1>
                <h1 className="text-lg mb-2">{data.bank}</h1>
                <h1 className="text-lg mb-2">
                  Virtual Account:{data.virtual_number}
                </h1>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-3 pb-12">
                  <div className="flex lg:flex-row lg:items-center lg:w-4/6">
                    <h1 className="text-lg lg:text-2xl">E-ticket :</h1>
                    <p className="text-xl lg:text-2xl lg:ml-4">{data.ticket}</p>
                  </div>
                  <p className="bg-primary text-bgcard text-center rounded-3xl p-2">
                    {data.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </Layout>
  );
}

export default BookingDetail;
