import { useEffect, useState } from "react";
import axios from "axios";

import { Layout } from "../../components/Layout";
import { CardHistory } from "../../components/Card";
import { LoadingLong } from "../../components/Loading";

import { BookingsTypes } from "../../utils/types/bookingTypes";

function OrderListHost() {
  const [order, setOrder] = useState<BookingsTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://abiasa.site/bookings")
      .then((res) => {
        setOrder(res.data.data);
      })
      .catch((err) => {
        // alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout>
      <h1 id="orderhost-page" className="text-4xl p-5">
        Order List
      </h1>
      <div className="flex flex-col items-center gap-10 px-2 lg:px-6 pb-6">
        {loading ? (
          <LoadingLong />
        ) : (
          <CardHistory
            image={`img-content.jpg`}
            campsite={`Tanakita Camp`}
            loc={`Sukabumi`}
            checkin={`1 February 2023`}
            checkout={`5 February 2023`}
            eticket={`CPYK/362781/XVII-JOEKMS`}
            totalprice={420}
            status={`Completed`}
          />
        )}
      </div>
    </Layout>
  );
}

export default OrderListHost;
