import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Layout } from "../../components/Layout";
import { InputSolo } from "../../components/Input";
import { ImLocation } from "react-icons/im";
import { Btn, Btns } from "../../components/Button";
import { BookingTypes } from "../../utils/types/bookingTypes";

function Order() {
  const [detailbooking, setDetail] = useState<BookingTypes[]>([]);
  const [Subtotal, SetSubtotal] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>();
  const [cookie, setCookie, removeCookie] = useCookies();
  const [camp_cost, setCampcost] = useState<any>();
  const [check_in, setCheckin] = useState<any>();
  const [check_out, setCheckout] = useState<any>();
  const [guest, setGuest] = useState<any>();
  const [item, setItem] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [quantity, setQuantity] = useState<any>();
  const { id } = useParams();

  useEffect(() => {
    fetchDetail();
  }, []);

  function addPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("camp_cost", camp_cost);
    formData.append("check_in", check_in);
    formData.append("check_out", check_out);
    formData.append("guest", guest);
    formData.append("item", item);
    formData.append("price", price);
    formData.append("quantity", quantity);
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    };
    axios
      .post("https://abiasa.site/bookings", FormData, config)
      .then((res) => {
        const { data } = res.data;
        console.log("data", data);
        setDetail(data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }

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
        const totalPrice = data.reduce((a: any, b: any) => {
          return a + b.total_price;
        }, 0);

        const subtotal = data.reduce((price: any, quantity: any) => {
          return price * quantity;
        }, 0);
        SetSubtotal(subtotal);

        setTotalPrice(totalPrice);
      })
      .catch((err) => {});
  }

  return (
    <Layout>
      <h1 id="order-page" className="text-4xl p-5">
        Order
      </h1>
      {detailbooking.map((data) => (
        <div>
          <div className="flex flex-col lg:flex-row m-5 bg-bgcard rounded-3xl shadow-lg">
            <img
              className="lg:w-1/2 lg:rounded-l-3xl"
              src={data.camp_image}
              alt={"title"}
            />
            <div className="lg:w-1/2 p-5 flex flex-col justify-around">
              <div className="flex justify-between text-xl">
                <h1>{data.camp_title}</h1>
                <h1>$ {data.camp_price} /night</h1>
              </div>
              <p className="flex items-center">
                <ImLocation /> {data.camp_city}
              </p>
              <form onSubmit={addPost}>
                <div className="flex justify-around mt-4">
                  <h1>Check-In</h1>
                  <h1>Check-Out</h1>
                  <h1>Guest</h1>
                </div>
                <div className="flex justify-around">
                  <InputSolo
                    className="w-[30%]"
                    id="Check-In"
                    type={"date"}
                    onChange={(e) => setCheckin(e.target.value)}
                  />
                  <InputSolo
                    className="w-[30%]"
                    id="Check-Out"
                    type={"date"}
                    onChange={(e) => setCheckout(e.target.value)}
                  />
                  <InputSolo
                    className="w-[30%]"
                    id="Guest"
                    type={"number"}
                    onChange={(e) => setGuest(e.target.value)}
                  />
                </div>
                <h1 className="text-lg mt-4">Add On</h1>
                <div className="flex justify-around ml-10 mb-2">
                  <h1>Items</h1>
                  <h1>Price</h1>
                  <h1>Quantity</h1>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-around items-center">
                    <input
                      className="w-[13%]"
                      type={"checkbox"}
                      onChange={(e) => setItem(e.target.value)}
                    />
                    <h1 className="w-1/4">{data.items[0].name}</h1>
                    <h1 className="w-1/4">{data.items[0].price}</h1>
                    <InputSolo
                      className="w-1/4"
                      id="number"
                      type="number"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-around items-center">
                    <input
                      className="w-[13%]"
                      type={"checkbox"}
                      onChange={(e) => setItem(e.target.value)}
                    />
                    <h1 className="w-1/4">{data.items[1].name}</h1>
                    <h1 className="w-1/4">{data.items[1].price}</h1>
                    <InputSolo
                      className="w-1/4"
                      id="number"
                      type="number"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-around items-center">
                    <input
                      className="w-[13%]"
                      type={"checkbox"}
                      onChange={(e) => setItem(e.target.value)}
                    />
                    <h1 className="w-1/4">{data.items[2].name}</h1>
                    <h1 className="w-1/4">{data.items[2].price}</h1>
                    <InputSolo
                      className="w-1/4"
                      id="number"
                      type="number"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-around items-center">
                    <input
                      className="w-[13%]"
                      type={"checkbox"}
                      onChange={(e) => setItem(e.target.value)}
                    />
                    <h1 className="w-1/4">{data.items[0].name}</h1>
                    <h1 className="w-1/4">{data.items[0].price}</h1>
                    <InputSolo
                      className="w-1/4"
                      id="number"
                      type="number"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-around items-center">
                    <input
                      className="w-[13%]"
                      type={"checkbox"}
                      onChange={(e) => setItem(e.target.value)}
                    />
                    <h1 className="w-1/4">{data.items[0].name}</h1>
                    <h1 className="w-1/4">{data.items[0].price}</h1>
                    <InputSolo
                      className="w-1/4"
                      id="number"
                      type="number"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <h1 className="text-4xl p-5">Price Details</h1>
          <div className="flex flex-col gap-3 p-5 m-5 bg-bgcard rounded-3xl shadow-lg border-2">
            <h1 className="text-xl">
              Check In :{data.check_in}
              <span className="font-normal">{`2 February 2023`}</span>
            </h1>
            <h1 className="text-xl">
              Check Out :{data.check_out}
              <span className="font-normal">{`5 February 2023`}</span>
            </h1>
            <div className="flex flex-col lg:flex-row gap-10">
              <div>
                <h1 className="text-lg mb-2">Campsite Cost</h1>
                <p>night</p>
                <p>{data.camp_price}</p>
                <p>{data.guest}</p>
                <p>{data.camp_cost}</p>
              </div>
              <div>
                <h1 className="text-lg mb-2">{data.items[0].name}</h1>
                <p>Night</p>
                <p>{data.items[0].price}</p>
                <p>{data.guest}</p>
                <p>{Subtotal}</p>
              </div>
              <div>
                <h1 className="text-lg mb-2">{data.items[0].name}</h1>
                <p>Night</p>
                <p>{data.items[0].price}</p>
                <p>{data.guest}</p>
                <p>{Subtotal}</p>
              </div>
              <div>
                <h1 className="text-lg mb-2">{data.items[0].name}</h1>
                <p>Night</p>
                <p>{data.items[0].price}</p>
                <p>{data.guest}</p>
                <p>{Subtotal}</p>
              </div>
            </div>
          </div>
          <h1 className="text-4xl p-5">Payment Method</h1>
          <fieldset>
            <form
              action=""
              className="flex flex-col gap-5 p-5 m-5 bg-bgcard rounded-3xl shadow-lg border-2"
            >
              <div className="grid grid-cols-3 items-center">
                <img
                  src="https://images.tokopedia.net/img/toppay/sprites/bca.png"
                  alt=""
                />
                <label>BCA Virtual Account</label>
                <input type="radio" id="bca" value="bca" name="payment" />
              </div>
              <div className="grid grid-cols-3 items-center">
                <img
                  src="https://images.tokopedia.net/img/toppay/sprites/bni.png"
                  alt=""
                />
                <label>BNI Virtual Account</label>
                <input type="radio" id="bni" value="bni" name="payment" />
              </div>
              <div className="grid grid-cols-3 items-center">
                <img
                  src="https://images.tokopedia.net/img/toppay/bank-bri.png"
                  alt=""
                />
                <label>BRI Virtual Account</label>
                <input type="radio" id="bri" value="bri" name="payment" />
              </div>
            </form>
          </fieldset>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-3 p-5 pb-12">
            <div className="flex lg:flex-row lg:items-center lg:w-4/6">
              <h1 className="text-lg lg:text-2xl">Total Price :</h1>
              <p className="text-xl lg:text-2xl lg:ml-4">{totalPrice}</p>
            </div>
            <Btns className="lg:w-1/6" id="btn-cancel" label="Cancel" />
            <Btn className="lg:w-1/6" id="btn-booknow" label="Book Now" />
          </div>
        </div>
      ))}
    </Layout>
  );
}

export default Order;
