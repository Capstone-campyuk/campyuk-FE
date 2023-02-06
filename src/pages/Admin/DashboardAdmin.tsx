import { useEffect, useState } from "react";
import axios from "axios";

import { Layout } from "../../components/Layout";
import { CardAdmin } from "../../components/Card";
import { LoadingLong } from "../../components/Loading";

import { CampsTypes } from "../../utils/types/campsTypes";

function DashboardAdmin() {
  const [camps, setCamps] = useState<CampsTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://abiasa.site/camps")
      .then((res) => {
        console.log(res);
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
      <h1 id="admin-page" className="text-4xl p-5">
        Dashboard Admin
      </h1>
      <div className="flex flex-col items-center gap-10 px-2 lg:px-6 pb-6">
        {loading
          ? [...Array(4).keys()].map((index) => (
              <LoadingLong key={index} />
            ))
          : camps.map((camp, index) => (
              <CardAdmin
                key={index}
                id={camp.id}
                image={camp.image}
                campsite={camp.title}
                loc={camp.city}
                price={camp.price}
                host={camp.host_name}
              />
            ))}
      </div>
    </Layout>
  );
}

export default DashboardAdmin;
