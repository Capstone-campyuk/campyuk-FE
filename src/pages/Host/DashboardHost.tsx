import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

import { Layout } from "../../components/Layout";
import { CardHost } from "../../components/Card";
import { Btn, Btns } from "../../components/Button";
import { LoadingReg } from "../../components/Loading";

import { CampsTypes } from "../../utils/types/campsTypes";

function DashboardHost() {
  const [camps, setCamps] = useState<CampsTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cookie] = useCookies(["username"]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://abiasa.site/camps")
      .then((res) => {
        console.log(res.data);
        setCamps(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteCamp = (id: number) => {
    axios
      .delete(`https://abiasa.site/camps/${id}`)
      .then((res) => {
        alert(`delete camps success`);
        setCamps(
          camps.filter((camp) => {
            return camp.id !== id;
          })
        );
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <Layout>
      <h1 id="host-page" className="text-4xl p-5">
        {`${cookie.username} site`}
      </h1>
      <div className="flex justify-center px-2 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {loading
            ? [...Array(4).keys()].map((index) => (
                <LoadingReg key={index} />
              ))
            : camps.map((camp, index) => (
                <CardHost
                  key={index}
                  image={camp.image}
                  campsite={camp.title}
                  price={camp.price}
                  loc={camp.city}
                  status={camp.verification_status}
                  deleteCamp={() => deleteCamp(camp.id)}
                />
              ))}
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
        <Link to="/addcamp">
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
