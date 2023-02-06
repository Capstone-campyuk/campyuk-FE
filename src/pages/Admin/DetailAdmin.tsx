import react, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import { ReactImageCarouselViewer } from "react-image-carousel-viewer";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
} from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";
import tileLayer from "../../utils/const/tileLayer";
import { Layout } from "../../components/Layout";
import { Btn, Btns } from "../../components/Button";
import { GiPositionMarker } from "react-icons/gi";
import { CampTypes } from "../../utils/types/campsTypes";

function DetailAdmin() {
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

  const [camp, setCamp] = useState<CampTypes>({});
  const [cookie, setCookies] = useCookies();
  const navigate = useNavigate();
  const { id_camp } = useParams();

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    };
    console.log(id_camp);
    axios
      .get(`https://abiasa.site/camps/${id_camp}`, config)
      .then((res) => {
        setCamp(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {});
  };

  const acceptCamp = () => {
    axios
      .put(`https://abiasa.site/camps/${id_camp}/accept`)
      .then(() => {
        alert(`accept camps success`);
        navigate(`/admin`);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const declineCamp = () => {
    axios
      .put(`https://abiasa.site/camps/${id_camp}/decline`)
      .then(() => {
        alert(`decline camps success`);
        navigate(`/admin`);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <Layout>
      <div
        id="detail-admin-page"
        className="flex flex-col lg:flex-row p-5 gap-5 justify-center"
      >
        <ReactImageCarouselViewer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          images={images}
          startIndex={index}
        />
        <div className="lg:w-4/6">
          <img
            src={camp.images?.[0].image}
            alt={camp.title}
            className="object-cover w-full h-96 rounded-lg"
          />
        </div>
        <div className="hidden lg:block w-2/6">
          <div className="flex flex-col gap-5 h-full">
            <img
              src={camp.images?.[0].image}
              alt={camp.title}
              className="object-cover w-full h-1/2 rounded-lg"
            />
            <div className="flex h-full gap-5">
              <img
                src={camp.images?.[0].image}
                alt={camp.title}
                className="object-cover w-[48%] rounded-lg"
              />
              <span
                className="hero cursor-pointer rounded-lg"
                style={{
                  backgroundImage: `url(${camp.images?.[0].image})`,
                }}
                id="more-image"
                onClick={() => {
                  setIndex(index);
                  setIsOpen(true);
                }}
              >
                <span className="hero-overlay bg-opacity-30 text-white text-xl font-bold antialiased flex justify-center items-center rounded-lg">
                  More Images
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex pt-10">
          <div className="flex-row w-1/4 px-10">
            <h1 className="text-2xl pb-3">{camp.title}</h1>
            <div className="flex flex-rows pb-3">
              <GiPositionMarker className="w-8 h-8" />
              <span className="font-semibold text-xl">
                {camp.city}
              </span>
            </div>
            <p className="font-semibold text-xl pb-3">
              {camp.distance} km away from the city centre
            </p>
            <p className="font-bold text-3xl pb-3">
              {camp.price}
              <span className="font-normal text-xl">/night</span>
            </p>
          </div>
          <div className="flex-row w-3/4 px-20">
            <p className="text-xl">{camp.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 px-10 pt-10">
          <div className="flex flex-col">
            <h1 className=" text-4xl pb-3">Tent</h1>
            <p className="font-semibold text-xl pb-3">
              {`camp.items[0].name`}
            </p>
            <p className="font-semibold text-xl pb-3">
              Medium (3-4 person)
            </p>
            <p className="font-semibold text-xl pb-3">
              Large (4-5 person)
            </p>
          </div>
          <div>
            <h1 className="text-4xl pb-3">Stock</h1>
            <p className="font-semibold text-xl pb-3 px-8">
              {`camp.items[0].stock`}
            </p>
            <p className="font-semibold text-xl pb-3 px-8">4</p>
            <p className="font-semibold text-xl pb-3 px-8">4</p>
          </div>

          <div>
            <h1 className="text-4xl pb-3">Price</h1>
            <p className="font-semibold text-xl pb-3 px-8">
              {`camp.items[0].rent_price`}
            </p>
            <p className="font-semibold text-xl pb-3 px-8">$10</p>
            <p className="font-semibold text-xl pb-3 px-8">$12</p>
          </div>
        </div>
        <div className="px-10">
          <a
            href={camp.document}
            className="font-bold text-2xl text-sky-900"
          >
            Download Business License
          </a>
        </div>
        <h1 className="px-10 py-5 text-2xl ">Available Add On</h1>
        <div className="flex flex-col lg:flex-row gap-10 px-10">
          <div>
            <h1 className="text-lg mb-2">Item Bonfire</h1>
            <p>{`camp.items[1].stock`}</p>
            <p>{`camp.items[1].rent_price`}</p>
          </div>
          <div>
            <h1 className="text-lg mb-2">Item Sleeping Bag</h1>
            <p>{`camp.items[2].stock`}</p>
            <p>{`camp.items[2].rent_price`}</p>
          </div>
        </div>
        <div className="flex px-10 pt-10 pb-10">
          <div className="flex-row w-1/2">
            <MapContainer
              center={position}
              zoom={20}
              scrollWheelZoom={true}
              style={{ height: "400px" }}
            >
              <TileLayer {...tileLayer} />
              <Marker position={position}>
                <Popup>{camp.title}</Popup>
              </Marker>
            </MapContainer>
          </div>
          <div className="flex-row w-1/2 px-10">
            <p className="text-3xl px-10">{camp.address}</p>
            <div className="flex justify-end gap-20 pb-10 pt-60 ">
              <Btns
                label="Decline"
                id="btn-decline"
                className="w-48"
                onClick={() => declineCamp()}
              />
              <Btn
                label="Accept"
                id="btn-accept"
                className="w-48"
                onClick={() => acceptCamp()}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DetailAdmin;
