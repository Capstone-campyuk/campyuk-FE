import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Layout } from "../../components/Layout";
import { CardHost } from "../../components/Card";
import { Btn, Btns } from "../../components/Button";
import { LoadingReg } from "../../components/Loading";

import { CampsTypes } from "../../utils/types/campsTypes";
import axios from "axios";

function DashboardHost() {
  const [camps, setCamps] = useState<CampsTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://abiasa.site/camps")
      .then((res) => {
        console.log(res)
        setCamps(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout>
      <h1 id="host-page" className="text-4xl p-5">
        Uname Host
      </h1>
      <div className="flex justify-center px-2 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {loading ? (
            <LoadingReg />
          ) : (
            <CardHost
              image={
                "https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1222&q=80"
              }
              campsite={"Tanakita Camp"}
              price={60}
              loc={"Sukabumi"}
              status={"Accepted"}
            />
          )}
        </div>
      </div>
      <div className="flex justify-end p-5 gap-5">
        <Link to="/orderlist-host">
          <Btns
            id="btn-orderlist"
            className="w-18"
            label="Order List"
          />
        </Link>
        <Link to="/addtent">
          <Btn
            id="btn-addcamp"
            className="w-18"
            label="Add Campsite"
          />
        </Link>
      </div>
    </Layout>
  );
}

export default DashboardHost;
