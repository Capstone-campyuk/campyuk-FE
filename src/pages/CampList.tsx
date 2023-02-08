import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import { Layout } from "../components/Layout";
import { CardReg } from "../components/Card";
import { LoadingReg } from "../components/Loading";
import { MdArrowDropDownCircle } from "react-icons/md";
import Swal from "sweetalert2";

import { CampsTypes } from "../utils/types/campsTypes";

function CampList() {
  const [camps, setCamps] = useState<CampsTypes[]>([]);
  const [page, setPage] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(true);
  const path = useLocation().pathname;

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = (page: number) => {
    axios
      .get(`https://abiasa.site/camps/?page=${page}`)
      .then((res) => {
        setCamps(res.data.data);
      })
      .catch((err) => {
        Swal.fire({
          text: err.response.data.message,
          showCancelButton: false,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function nextPage() {
    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const newPage = page + 1;
    fetch(`https://abiasa.site/camps/?page=${page}`, request)
      .then((response) => response.json())
      .then((res) => {
        const results = res.data;
        const result = camps.slice();
        result.push(...results);
        setCamps(result);
        setPage(newPage);
      })
      .catch((err) => {
        Swal.fire({
          text: err.toString(),
          showCancelButton: false,
        });
      });
  }

  return (
    <Layout>
      <h1 id="camplist-page" className="text-4xl p-5">
        Camp Site
      </h1>
      <div className="flex justify-center px-2 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {loading
            ? [...Array(4).keys()].map((index) => (
                <LoadingReg key={index} />
              ))
            : camps.map((camp, index) => (
                <CardReg
                  key={index}
                  id={camp.id}
                  path={path}
                  image={camp.image}
                  campsite={camp.title}
                  price={camp.price}
                  distance={camp.distance}
                  loc={camp.city}
                />
              ))}
        </div>
      </div>
      <MdArrowDropDownCircle
        className="text-primary text-6xl w-full flex justify-center my-5 cursor-pointer"
        onClick={nextPage}
      />
    </Layout>
  );
}

export default CampList;
