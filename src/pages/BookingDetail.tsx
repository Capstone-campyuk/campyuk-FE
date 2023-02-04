import { Layout } from "../components/Layout";
import { Btns } from "../components/Button";
import { ImLocation } from "react-icons/im";

import { datacamp } from "../utils/const/datas";

function BookingDetail() {
  return (
    <Layout>
      <h1 id="booking-detail-page" className="font-bold text-3xl pt-5 px-20">
        Detail Transaction
      </h1>
      <div className="px-20 ">
        <div className="flex flex-col lg:flex-row m-5 bg-bgcard rounded-3xl shadow-lg">
          <img
            className="lg:w-1/2 lg:rounded-l-3xl"
            src={datacamp.images[1]}
            alt={datacamp.title}
          />
          <div className="flex flex-col p-5 lg:w-1/2 cursor-pointer ">
            <div>
              <h1 className="text-2xl">{datacamp.title}</h1>
              <p className="flex items-center">
                <ImLocation /> {datacamp.city}
              </p>
              <p className="text-xl">{datacamp.description}</p>
            </div>

            <div className="flex justify-end pt-20">
              <h1 className="text-3xl text-end">${datacamp.price}/night </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="px-20 pt-3 pb-10">
        <div className="flex flex-col gap-3 p-5 m-5 bg-bgcard rounded-3xl shadow-lg border-2">
          <h1 className="text-xl">
            Check In : <span className="font-normal">{`2 February 2023`}</span>
          </h1>
          <h1 className="text-xl">
            Check Out : <span className="font-normal">{`5 February 2023`}</span>
          </h1>
          <div className="flex flex-col lg:flex-row gap-10">
            <div>
              <h1 className="text-lg mb-2">Campsite Cost</h1>
              <p>Night</p>
              <p>Price</p>
              <p>Guest</p>
              <p>Sub Total</p>
            </div>
            <div>
              <h1 className="text-lg mb-2">Items</h1>
              <p>Night</p>
              <p>Price</p>
              <p>Guest</p>
              <p>Sub Total</p>
            </div>
            <div>
              <h1 className="text-lg mb-2">Items</h1>
              <p>Night</p>
              <p>Price</p>
              <p>Guest</p>
              <p>Sub Total</p>
            </div>
            <div>
              <h1 className="text-lg mb-2">Items</h1>
              <p>Night</p>
              <p>Price</p>
              <p>Guest</p>
              <p>Sub Total</p>
            </div>
          </div>
          <div>
            <h1 className="text-lg mb-2">Total Price</h1>
            <h1 className="text-lg mb-2">Payment</h1>
            <h1 className="text-lg mb-2">Bank</h1>
            <h1 className="text-lg mb-2">Virtual Account</h1>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-3 pb-12">
              <div className="flex lg:flex-row lg:items-center lg:w-4/6">
                <h1 className="text-lg lg:text-2xl">E-ticket :</h1>
                <p className="text-xl lg:text-2xl lg:ml-4">
                  {"ACT / 34799 / XVII - MMDKJF"}
                </p>
              </div>
              <p className="bg-primary text-bgcard text-center rounded-3xl p-2">
                {"issued"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BookingDetail;
