import { Layout } from "../components/Layout";
import { CardOrder, CardReviewOrder } from "../components/Card";
//

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
      <CardReviewOrder
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
      />
    </Layout>
  );
}

export default Order;
