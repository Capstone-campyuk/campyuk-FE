import { CardOrder } from "../components/Card";
import { Layout } from "../components/Layout";
import { Btn, Btns } from "../components/Button";

function Order() {
  return (
    <Layout>
      <h1 className="font-bold text-3xl pt-5 px-20">Order</h1>
      <CardOrder
        image={"https://dagodreampark.co.id/images/ke_2.jpg"}
        campsite={"Tanakita Camp"}
        price={60}
        loc={"Sukabumi"}
      />
      {/* <CardReviewOrder
        checkin={21 - 21 - 2022}
        checkout={12 - 12 - 2022}
        pricecamp={100}
        totalnight={2}
        guest={2}
        subtotalcamp={200}
        size={"small"}
        pricetent={50}
        quantity={2}
        subtotaltent={100}
        total={500}
      /> */}
      <div className="px-20 pt-3 pb-10">
        <div className="bg-white rounded-2xl h-auto">
          <div className="flex flex-row px-10 pt-10 gap-40">
            <h1 className="font-bold text-2xl">
              Check-in: <span>{"12 - 12 - 2020"}</span>
            </h1>
            <h1 className="font-bold text-2xl">
              Check-out: <span>{"14 - 12 - 2020"}</span>
            </h1>
          </div>

          <div className="grid grid-cols-4 gap-4 px-10 pt-10">
            <div className="flex flex-col">
              <h1 className="font-bold text-4xl pb-3">Camping Ground</h1>
              <p className="font-semibold text-xl pb-3">
                Total night: <span>{"2 night"}</span>
              </p>
              <p className="font-semibold text-xl pb-3">
                Price: <span>{"$ 20"}</span>
              </p>
              <p className="font-semibold text-xl pb-3">
                Guest: <span>{"5"}</span>
              </p>
              <p className="font-semibold text-xl pb-3">
                Sub total: <span>{"$ 200"}</span>
              </p>
            </div>
            <div>
              <h1 className="font-bold text-4xl pb-3">Tent</h1>
              <p className="font-semibold text-xl pb-3">
                Size: <span>{"small"}</span>
              </p>
              <p className="font-semibold text-xl pb-3">
                Price: <span>{"$ 10"}</span>
              </p>
              <p className="font-semibold text-xl pb-3">
                Quantity: <span>{"2"}</span>
              </p>
              <p className="font-semibold text-xl pb-3">
                Sub total: <span>{"$ 20"}</span>
              </p>
            </div>

            <div>
              <h1 className="font-bold text-4xl pb-3">Bonfire</h1>

              <p className="font-semibold text-xl pb-3">
                Price: <span>{"$ 4"}</span>
              </p>
              <p className="font-semibold text-xl pb-3">
                Quantity: <span>{"1"}</span>
              </p>
              <p className="font-semibold text-xl pb-3">
                Sub total: <span>{"$ 4"}</span>
              </p>
            </div>
            <div className="mr-8">
              <h1 className="font-bold text-4xl pb-3">Sleeping bag</h1>

              <p className="font-semibold text-xl pb-3">
                Price: <span>{"$ 10"}</span>
              </p>
              <p className="font-semibold text-xl pb-3">
                Quantity: <span>{"2"}</span>
              </p>
              <p className="font-semibold text-xl pb-3">
                Sub total: <span>{"$ 20"}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center px-10">
          <h1 className="font-bold text-2xl">
            Total: <span>{"$ 244"}</span>
          </h1>
          <Btn className="w-48" label="cancel" />
          <Btns className="w-48" label="book now" />
        </div>
      </div>
    </Layout>
  );
}

export default Order;
