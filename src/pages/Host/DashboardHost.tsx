import React from "react";
import { useNavigate } from "react-router-dom";

import { Layout } from "../../components/Layout";
import { CardHost } from "../../components/Card";
import { Btn, Btns } from "../../components/Button";

function DashboardHost() {
  const navigate = useNavigate();

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
      <div className="flex justify-end p-5 gap-5">
        <Btns
          className="w-18"
          label="Booking List"
          onClick={() => navigate("/orderlist-host")}
        />
        <Btn
          className="w-18"
          label="Add Campsite"
          onClick={() => navigate("/addtent")}
        />
      </div>
    </Layout>
  );
}

export default DashboardHost;
