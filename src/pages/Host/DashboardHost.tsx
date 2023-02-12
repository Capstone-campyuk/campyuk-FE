import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import withReactContent from "sweetalert2-react-content";

import { Layout } from "../../components/Layout";
import { CardReg } from "../../components/Card";
import { Btn, Btns } from "../../components/Button";
import { LoadingReg } from "../../components/Loading";
import { MdArrowDropDownCircle } from "react-icons/md";

import Swal from "../../utils/Swal";
import { CampsTypes } from "../../utils/types/campsTypes";

function DashboardHost() {
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
          text: err.response.data.message,
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
          text: err.response.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      });
  }

  const deleteCamp = (id: number) => {
    axios
      .delete(`https://abiasa.site/camps/${id}`)
      .then(() => {
        setCamps(
          camps.filter((camp) => {
            return camp.id !== id;
          })
        );
        MySwal.fire({
          icon: "success",
          title: "Done",
          text: "Delete Camp Success",
          showCancelButton: false,
        });
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          text: err.response.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      });
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center p-5 gap-4">
        <h1 id="host-page" className="text-4xl">
          {`${cookie.username} site`}
        </h1>
        <div className="flex gap-4">
          <Link to="/addcamp">
            <Btn id="btn-addcamp" className="w-18" label="Add Camp" />
          </Link>
          <Link to={`/booking-history/${cookie.username}`}>
            <Btns id="btn-bookings" className="w-18" label="Booking List" />
          </Link>
        </div>
      </div>
      <div className="flex justify-center px-2 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {loading ? (
            [...Array(4).keys()].map((index) => <LoadingReg key={index} />)
          ) : camps.length === 0 ? (
            <p className="lg:text-center">
              You don't have a camp site, please add camp first
            </p>
          ) : (
            camps.map((camp, index) => (
              <CardReg
                key={index}
                id={camp.id}
                uname={cookie.username}
                path={path}
                image={camp.image}
                campsite={camp.title}
                price={camp.price}
                loc={camp.city}
                status={camp.verification_status}
                deleteCamp={() => deleteCamp(camp.id)}
              />
            ))
          )}
        </div>
      </div>
      <MdArrowDropDownCircle
        className="text-primary text-6xl w-full flex justify-center my-5 cursor-pointer"
        onClick={nextPage}
      />
    </Layout>
  );
}

export default DashboardHost;
