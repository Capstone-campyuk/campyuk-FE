import React from "react";

import { Layout } from "../components/Layout";
import { CardCampLong } from "../components/Card";

function BookingHistory() {
  return (
    <Layout>
      <h1 className="text-4xl p-5">Camp Site</h1>
      <div className="flex flex-col items-center gap-10 px-2 lg:px-6 pb-6">
        <CardCampLong
          image={`img-content.jpg`}
          campsite={`Tanakita Camp`}
          loc={`Sukabumi`}
          checkin={`1 February 2023`}
          checkout={`5 February 2023`}
          eticket={`CPYK/362781/XVII-JOEKMS`}
          totalprice={420}
        />
        <CardCampLong
          image={`img-content.jpg`}
          campsite={`Tanakita Camp`}
          loc={`Sukabumi`}
          checkin={`1 February 2023`}
          checkout={`5 February 2023`}
          eticket={`CPYK/362781/XVII-JOEKMS`}
          totalprice={420}
        />
        <CardCampLong
          image={`img-content.jpg`}
          campsite={`Tanakita Camp`}
          loc={`Sukabumi`}
          checkin={`1 February 2023`}
          checkout={`5 February 2023`}
          eticket={`CPYK/362781/XVII-JOEKMS`}
          totalprice={420}
        />
      </div>
    </Layout>
  );
}

export default BookingHistory;
