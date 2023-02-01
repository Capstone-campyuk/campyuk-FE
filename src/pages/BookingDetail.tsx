import { Layout } from "../components/Layout";
import { Btns } from "../components/Button";
import { ImLocation } from "react-icons/im";

function BookingDetail() {
  return (
    <Layout>
      <h1 className="font-bold text-3xl pt-5 px-20">Detail Transaction</h1>
      <div className="px-20 pt-10">
        <div className="flex  bg-white rounded-2xl h-80">
          <div className="flex-row w-3/5 ">
            <img
              className="rounded-t-2xl lg:rounded-l-3xl lg:w-full h-80 "
              src="https://dagodreampark.co.id/images/ke_2.jpg"
              alt=""
            />
          </div>
          <div className="flex-row w-2/5 px-10">
            <div className="flex flex-col pt-10">
              <h1 className="font-bold text-2xl">Tanakita Camp</h1>
              <div className="flex flex-row">
                <ImLocation className="w-8 h-8 " />
                <span className="text-xl font-semibold">sukabumi </span>
              </div>
              <div className="flex flex-col pt-10">
                <p className="text-xl">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Dolorem, placeat!
                </p>
              </div>

              <h1 className="text-3xl text-end pt-10">$ 5/night</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="px-20 pt-3 pb-10">
        <div className="flex  bg-white rounded-2xl h-auto">
          <div className="flex-row w-1/2 pt-10 px-10">
            <h1 className="font-bold text-3xl pb-5">
              Check-in: <span className="font-normal text-3xl">12-12-2022</span>
            </h1>

            <h1 className="font-bold text-3xl">Camp Ground </h1>
            <p className="text-2xl ">
              Total night:
              <span className="font-normal text-3xls">2</span>
            </p>

            <p className="text-2xl">
              Guest: <span className="font-normal text-3xl">5 person</span>
            </p>
            <p className="text-2xl">
              Sub Total:
              <span className="font-normal text-3xl">$ 225</span>
            </p>
            <p className="font-bold text-3xl pt-8">
              Total: <span className="font-normal text-3xl">$ 700</span>
            </p>
            <p className="font-bold text-3xl pt-8">
              E-ticket:{" "}
              <span className="font-normal text-3xl">
                ACT/34799/XVII-MMDKJF
              </span>
            </p>
          </div>
          <div className="flex-row w-1/2 pt-10">
            <h1 className="font-bold text-3xl pb-5">
              Check-out:<span className="font-normal text-3xl">13-13-2023</span>
            </h1>
            <h1 className="font-bold text-3xl">Tent</h1>
            <p className="text-2xl">
              Size:{" "}
              <span className="font-normal text-3xl">Small (1-2 person)</span>
            </p>

            <p className="text-2xl">
              Quantity:<span className="font-normal text-3xl">2</span>
            </p>
            <p className="text-2xl">
              Sub Total:
              <span className="font-normal text-3xl">$ 16</span>
            </p>
            <div className=" pt-8 px-80">
              <Btns label="Issued" className="w-48" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BookingDetail;
