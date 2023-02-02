import React from "react";

import { Layout } from "../../components/Layout";
import { CardHost } from "../../components/Card";
import { Btn } from "../../components/Button";

function DashboardHost() {
  return (
    <Layout>
      <h1 className="text-4xl p-5">Uname Host</h1>
      <div className="flex justify-center px-2 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <CardHost
            image={"img-content.jpg"}
            campsite={"Tanakita Camp"}
            price={60}
            loc={"Sukabumi"}
            status={"Accepted"}
          />
          <CardHost
            image={"img-content.jpg"}
            campsite={"Tanakita Camp"}
            price={60}
            loc={"Sukabumi"}
            status={"Accepted"}
          />
          <CardHost
            image={"img-content.jpg"}
            campsite={"Tanakita Camp"}
            price={60}
            loc={"Sukabumi"}
            status={"Accepted"}
          />
          <CardHost
            image={"img-content.jpg"}
            campsite={"Tanakita Camp"}
            price={60}
            loc={"Sukabumi"}
            status={"Accepted"}
          />
        </div>
      </div>
      <div className="flex justify-end p-5">
        <Btn className="w-18" label="Add Campsite" />
      </div>
    </Layout>
  );
}

export default DashboardHost;
