import { useEffect, useState } from "react";
import axios from "axios";

import { Layout } from "../../components/Layout";
import { CardSAdmin } from "../../components/Card";
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
        {loading ? (
          <LoadingLong />
        ) : (
          <CardSAdmin
            image={`img-content.jpg`}
            campsite={`Tanakita Camp`}
            loc={`Sukabumi`}
            price={40}
            address={`Jl. Tdiosfh, Hweiu City, West Java, 23623`}
            id_camp={948239049}
          />
        )}
      </div>
    </Layout>
  );
}

export default DashboardAdmin;
