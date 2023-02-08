import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import withReactContent from "sweetalert2-react-content";

import { Layout } from "../../components/Layout";
import { CardLong } from "../../components/Card";
import { LoadingLong } from "../../components/Loading";
import { MdArrowDropDownCircle } from "react-icons/md";

import Swal from "../../utils/Swal";
import { CampsTypes } from "../../utils/types/campsTypes";

function DashboardAdmin() {
  const [camps, setCamps] = useState<CampsTypes[]>([]);
  const [page, setPage] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(true);
  const [cookie] = useCookies(["username", "token"]);
  const path = useLocation().pathname;
  const MySwal = withReactContent(Swal);

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
        MySwal.fire({
          icon: "error",
          text: err.data.message,
          title: "Oops...",
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
        Authorization: `Bearer ${cookie.token}`,
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
        MySwal.fire({
          icon: "error",
          text: err.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      });
  }
  return (
    <Layout>
      <h1 id="admin-page" className="text-4xl p-5">
        Dashboard Admin
      </h1>
      <div className="flex flex-col items-center gap-10 px-2 lg:px-6 pb-6">
        {loading
          ? [...Array(4).keys()].map((index) => <LoadingLong key={index} />)
          : camps.map((camp, index) => (
              <CardLong
                key={index}
                id={camp.id}
                path={path}
                image={camp.image}
                campsite={camp.title}
                loc={camp.city}
                price={camp.price}
                host={camp.host_name}
                address={camp.address}
              />
            ))}
      </div>
      <MdArrowDropDownCircle
        className="text-primary text-6xl w-full flex justify-center my-5 cursor-pointer"
        onClick={nextPage}
      />
    </Layout>
  );
}

export default DashboardAdmin;
