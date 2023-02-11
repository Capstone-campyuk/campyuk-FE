import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import moment, { max } from "moment";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";

import { Layout } from "../../components/Layout";
import { InputSolo } from "../../components/Input";
import { ImLocation } from "react-icons/im";
import { Btn, Btns } from "../../components/Button";
import { DotWave } from "@uiball/loaders";

import Swal from "../../utils/Swal";
import { CampTypes, ItemTypes } from "../../utils/types/campsTypes";

function Order() {
  const [totalAllPriceItem, setTotalAllPriceItem] = useState<number>(0);
  const [totalHari, setTotalHari] = useState<number>();
  const [sub_total, SetSubTotal] = useState<number>(0);
  const [cart, setCart] = useState<ItemTypes[]>([]);
  const [items, setItems] = useState<ItemTypes[]>([]);
  const [order, setOrder] = useState<CampTypes>({});
  const [disabled, setDisabled] = useState(true);
  const [check_in, setCheckin] = useState<any>();
  const [check_out, setCheckout] = useState<any>();
  const [guest, setGuest] = useState<number>(1);
  const [bank, setBank] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<number>(0);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const { id_camp } = useParams();

  function total_days() {
    const co = new Date(check_out);
    const ci = new Date(check_in);
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    if (ci <= co) {
      const diffInMs = co.getTime() - ci.getTime();
      const days = Math.floor(diffInMs / _day);
      setTotalHari(days);
      if (guest) {
        subtotal(days);
      }
    } else {
      MySwal.fire({
        icon: "error",
        title: "Oops... ",
        text: "Date invalid",
        showCancelButton: false,
      });
    }
  }

  function subtotal(days: number) {
    if (order.price) {
      SetSubTotal(days * guest * order.price);
    }
  }
  const preventMinus = (e: any) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (check_in && check_out && guest && bank) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  });
  useEffect(() => {
    fetchDetail();
  }, []);

  useEffect(() => {
    if (check_out) {
      total_days();
    }
  }, [check_in, check_out, guest]);

  useEffect(() => {
    setTotalAllPriceItem(cart.reduce((acc, cur) => acc + cur.rent_cost, 0));
  }, [cart]);

  function fetchDetail() {
    axios
      .get(`https://abiasa.site/camps/${id_camp}`)
      .then((res) => {
        if (res.data.data.items) {
          res.data.data.items?.forEach((item: any) => {
            item.quantity = 0;
            item.select = false;
          });
        }
        setItems(res.data.data.items);
        setOrder(res.data.data);
        setId(res.data.data.id);
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
  }

  function handleOrder() {
    setLoading(true);
    const body = {
      camp_id: id,
      items: cart,
      camp_cost: order.price,
      total_price: sub_total + totalAllPriceItem,
      check_in,
      check_out,
      guest,
      bank,
    };
    axios
      .post("https://abiasa.site/bookings", body)
      .then((res) => {
        const book_id = res.data.data.booking_id;
        const { message } = res.data;
        MySwal.fire({
          icon: "success",
          title: "Done",
          text: message,
          showCancelButton: false,
        });
        navigate(`/booking/${book_id}`);
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
  }

  function handleQtyItem(
    e: React.ChangeEvent<HTMLInputElement>,
    item: ItemTypes
  ) {
    if (e.target.valueAsNumber <= item.stock) {
      setItems(
        items.map((el) =>
          el.item_id === item.item_id
            ? {
                ...el,
                quantity: e.target.valueAsNumber,
                rent_cost: el.rent_price * e.target.valueAsNumber,
              }
            : el
        )
      );
      setCart(
        cart.map((el) =>
          el.item_id === item.item_id
            ? {
                ...el,
                quantity: e.target.valueAsNumber,
                rent_cost: el.rent_price * e.target.valueAsNumber,
              }
            : el
        )
      );
    } else {
      MySwal.fire({
        icon: "error",
        title: "Oops... ",
        text: "Stock invalid",
        showCancelButton: false,
      });
    }
  }

  return (
    <Layout>
      <h1 className="text-4xl p-5">Order</h1>
      {loading ? (
        <div
          className="flex justify-center items-center h-[60vh]"
          id="order-page"
        >
          <DotWave size={100} color={"#1E3231"} />
        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row m-5 bg-bgcard rounded-3xl shadow-lg">
            <img
              className="lg:w-1/2 lg:rounded-l-3xl"
              src={order.images?.[0].image}
              alt={"title"}
            />
            <div className="lg:w-1/2 p-5 flex flex-col justify-around">
              <div className="flex justify-between text-xl">
                <h1>{order.title}</h1>
                <h1>$ {order.price} /night</h1>
              </div>
              <p className="flex items-center">
                <ImLocation /> {order.city}
              </p>

              <form>
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
                    name="datemax"
                    max="today"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setCheckin(e.target.value)}
                  />
                  <InputSolo
                    className="w-[30%]"
                    id="Check-Out"
                    type={"date"}
                    name="datemin"
                    max="today"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setCheckout(e.target.value)}
                  />
                  <InputSolo
                    className="w-[30%]"
                    id="Guest"
                    min={1}
                    type={"number"}
                    // value={guest && Math.max(1, guest)}
                    onKeyPress={preventMinus}
                    onChange={(e) => setGuest(e.target.valueAsNumber)}
                  />
                </div>
                <h1 className="text-lg mt-4">Add On</h1>
                <div className="flex justify-around ml-10 mb-2">
                  <h1>Items</h1>
                  <h1>Price</h1>
                  <h1>Quantity</h1>
                </div>

                <div className="flex flex-col gap-2">
                  {items.map((item) => (
                    <div
                      className="flex justify-around items-center"
                      key={item.item_id}
                    >
                      <input
                        className="w-[13%]"
                        type={"checkbox"}
                        onChange={(e) => {
                          setItems(
                            items.map((el) =>
                              el.item_id === item.item_id
                                ? { ...el, select: e.target.checked }
                                : el
                            )
                          );
                          if (e.target.checked) {
                            setCart((prev) => [...prev, item]);
                          } else {
                            setCart((prev) =>
                              prev.filter((i) => i.item_id !== item.item_id)
                            );
                          }
                        }}
                      />
                      <h1 className="w-1/4">{item.name}</h1>
                      <h1 className="w-1/4">{item.rent_price}</h1>
                      <InputSolo
                        className="w-1/4"
                        id="number"
                        type="number"
                        min={0}
                        max={item.stock}
                        onChange={(e) => handleQtyItem(e, item)}
                        disabled={!item.select}
                        onKeyPress={preventMinus}
                      />
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </div>
          <h1 className="text-4xl p-5">Price Details</h1>
          <div className="flex flex-col gap-3 p-5 m-5 bg-bgcard rounded-3xl shadow-lg border-2">
            <h1 className="text-xl">
              Check In :
              <span className="font-normal">
                {moment(check_in).format("DD MMMM YYYY")}
              </span>
            </h1>
            <h1 className="text-xl">
              Check Out :
              <span className="font-normal">
                {moment(check_out).format("DD MMMM YYYY")}
              </span>
            </h1>
            <div className="flex flex-col lg:flex-row gap-10">
              <div>
                <h1 className="text-lg mb-2">Campsite Cost</h1>

                <p>Total hari:{totalHari} night</p>
                <p>Price:$ {order.price}</p>
                <p>Guest: {guest} Person</p>
                <p className="font-semibold">
                  Sub total campsite: $ {sub_total}
                </p>
                <p className="font-semibold">
                  Sub total item: $ {totalAllPriceItem}
                </p>
                <h1>All total: $ {sub_total + totalAllPriceItem}</h1>
              </div>
              {cart.map((item, index) => (
                <div key={item.item_id}>
                  <h1 className="text-lg mb-2">Item {item.name}</h1>
                  <p>{totalHari} night</p>
                  <p>$ {item.rent_price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))}
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
                <input
                  type="radio"
                  id="bca"
                  value="bca"
                  name="payment"
                  onChange={(e) => setBank(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 items-center">
                <img
                  src="https://images.tokopedia.net/img/toppay/sprites/bni.png"
                  alt=""
                />
                <label>BNI Virtual Account</label>
                <input
                  type="radio"
                  id="bni"
                  value="bni"
                  name="payment"
                  onChange={(e) => setBank(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 items-center">
                <img
                  src="https://images.tokopedia.net/img/toppay/bank-bri.png"
                  alt=""
                />
                <label>BRI Virtual Account</label>
                <input
                  type="radio"
                  id="bri"
                  value="bri"
                  name="payment"
                  onChange={(e) => setBank(e.target.value)}
                />
              </div>
            </form>
          </fieldset>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-3 p-5 pb-12">
            <div className="flex lg:flex-row lg:items-center lg:w-4/6">
              <h1 className="text-lg lg:text-2xl">Total Price :</h1>
              <p className="text-xl lg:text-2xl lg:ml-4">
                $ {sub_total + totalAllPriceItem}
              </p>
            </div>
            <Link to="/camplist">
              <Btns className="w-32" id="btn-cancel" label="Cancel" />
            </Link>
            <Btn
              className="w-32"
              id="btn-booknow"
              label="Book Now"
              onClick={() => handleOrder()}
              disabled={disabled}
            />
          </div>
        </>
      )}
    </Layout>
  );
}

export default Order;
