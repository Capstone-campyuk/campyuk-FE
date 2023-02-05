import { useEffect, useState } from "react";
import axios from "axios";

import { Layout } from "../components/Layout";
import { CardCampList } from "../components/Card";
import { LoadingReg } from "../components/Loading";

import { CampsTypes } from "../utils/types/campsTypes";

function CampList() {
  const [camps, setCamps] = useState<CampsTypes[]>([]);
  const [page, setPage] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    fethData(1);
  }, []);

  const fethData = (page: number) => {
    axios
      .get("https://abiasa.site/camps")
      .then((res) => {
        setCamps(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      })
      .finally(() => setLoading(true));
  };

  function nextPage() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const newPage = page + 1;
    fetch(
      `https://onallo.store/products/?page=${page}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        const results = res.data;
        const result = camps.slice();
        result.push(...results);
        setCamps(result);
        setPage(newPage);
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  return (
    <Layout>
      <h1 id="camplist-page" className="text-4xl p-5">
        Camp Site
      </h1>
      <div className="flex justify-center px-2 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {loading ? (
            <LoadingReg />
          ) : (
            <CardCampList
              image={"img-content.jpg"}
              campsite={"Tanakita Camp"}
              price={60}
              distance={5}
              loc={"Sukabumi"}
            />
          )}
        </div>
      </div>
      <button
        className="text-3xl w-full flex justify-center p-3"
        onClick={() => nextPage()}
      >
        load more
      </button>
    </Layout>
  );
}

export default CampList;
