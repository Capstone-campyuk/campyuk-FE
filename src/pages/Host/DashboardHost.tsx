import React from "react";
import { useNavigate } from "react-router-dom";

import { Layout } from "../../components/Layout";
import { CardHost } from "../../components/Card";
import { Btn, Btns } from "../../components/Button";

function DashboardHost() {
  const navigate = useNavigate();

  const content =
    "https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1222&q=80";

  return (
    <Layout>
      <h1 id="host-page" className="text-4xl p-5">Uname Host</h1>
      <div className="flex justify-center px-2 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <CardHost
            image={content}
            campsite={"Tanakita Camp"}
            price={60}
            loc={"Sukabumi"}
            status={"Accepted"}
          />
          <CardHost
            image={content}
            campsite={"Tanakita Camp"}
            price={60}
            loc={"Sukabumi"}
            status={"Accepted"}
          />
          <CardHost
            image={content}
            campsite={"Tanakita Camp"}
            price={60}
            loc={"Sukabumi"}
            status={"Accepted"}
          />
          <CardHost
            image={content}
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
          label="Order List"
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
