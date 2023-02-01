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
    </Layout>
  );
}

export default Order;
