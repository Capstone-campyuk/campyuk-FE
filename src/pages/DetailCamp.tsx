import react, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";

import { ReactImageCarouselViewer } from "react-image-carousel-viewer";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";

import L, { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";
import tileLayer from "../utils/const/tileLayer";

import { Layout } from "../components/Layout";
import { Btn } from "../components/Button";
import { ImLocation } from "react-icons/im";
import { CampTypes } from "../utils/types/campsTypes";

function DetailCamp() {
  const content =
    "https://images.unsplash.com/photo-1632714395151-aa853eac30e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1128&q=80";

  const position: LatLngExpression = [-6.8853, 107.61373];

  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const images = [
    {
      src: "https://images.tokopedia.net/img/JFrBQq/2022/6/22/307bcc9a-8564-49d9-999f-d47e7141320a.jpg",
    },
    {
      src: "https://images.tokopedia.net/img/JFrBQq/2022/6/22/56110566-f35c-43e4-93e3-b3ba554f0118.jpg",
    },
    {
      src: "https://images.tokopedia.net/img/JFrBQq/2022/6/22/307bcc9a-8564-49d9-999f-d47e7141320a.jpg",
    },
    {
      src: "https://images.tokopedia.net/img/JFrBQq/2022/6/22/56110566-f35c-43e4-93e3-b3ba554f0118.jpg",
    },
  ];

  const [detailcamp, setDetail] = useState<CampTypes[]>([]);
  const [cookie, setCookies] = useCookies();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchDetail();
  }, []);

  function fetchDetail() {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    };
    axios
      .get(`https://abiasa.site/camps/${id}`, config)
      .then((res) => {
        console.log("data detail", res);
        const { data } = res.data.data;
        setDetail(data);
      })
      .catch((err) => {});
  }

  return (
    <Layout>
      <div
        id="detail-camp-page"
        className="flex flex-col lg:flex-row p-5 gap-5 justify-center"
      >
        <div className="lg:w-4/6">
          <img src={content} alt="" className="w-full h-96 rounded-lg" />
        </div>
        <div className="hidden lg:block w-2/6">
          <div className="flex flex-col gap-5 h-full">
            <img src={content} alt="" className="w-full h-1/2 rounded-lg" />
            <div className="flex h-full gap-5">
              <img src={content} alt="" className="w-[48%] rounded-lg" />

              <img
                src={content}
                id="more-image"
                alt=""
                className="w-[48%] rounded-lg static"
                onClick={() => {
                  setIndex(index);
                  setIsOpen(true);
                }}
              />

              <p className="absolute right-16 items-center text-2xl font-bold opacity-75 py-10 text-white">
                More image
              </p>

              <ReactImageCarouselViewer
                open={isOpen}
                onClose={() => setIsOpen(false)}
                images={images}
                startIndex={index}
              />
            </div>
          </div>
        </div>
      </div>
      {detailcamp.map((data) => (
        <div className="flex flex-col lg:flex-row justify-around p-5">
          <div className="lg:w-4/6">
            <h1 className="text-4xl">{data.title}</h1>
            <div className="flex items-center">
              <ImLocation className="text-2xl" />
              <p className="font-semibold text-xl">{data.city}</p>
            </div>
            <p className="pt-5">{data.description}</p>
            <div className="py-10">
              <MapContainer
                center={position}
                zoom={20}
                scrollWheelZoom={true}
                style={{ height: "400px" }}
              >
                <TileLayer {...tileLayer} />
                <Marker position={position}>
                  <Popup>Center Warsaw</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
          <div className="lg:w-[25%]">
            <div className="p-5 bg-white rounded-xl">
              <h1 className="text-2xl">{data.price}/night</h1>
              <br />
              <h1 className="text-xl">Available Add On</h1>
              <br />
              <table className="border-collapse border border-slate-500 w-[90%] text-center mx-auto">
                <thead>
                  <tr>
                    <th className="border border-slate-600">
                      {data.items[0].name}
                    </th>
                    <th className="border border-slate-600">
                      {data.items[0].rent_price}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-700">
                      {data.items[1].name}
                    </td>
                    <td className="border border-slate-700">
                      {data.items[1].rent_price}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-700">
                      {data.items[2].rent_price}
                    </td>
                    <td className="border border-slate-700">
                      {data.items[2].rent_price}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-700">Sleeping Bag</td>
                    <td className="border border-slate-700">$ 2</td>
                  </tr>
                </tbody>
              </table>
              <Link to={"/order"}>
                <Btn className="mt-10" label="Reserve" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  );
}

export default DetailCamp;
