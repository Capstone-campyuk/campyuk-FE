import { Link } from "react-router-dom";

import { ReactImageCarouselViewer } from "react-image-carousel-viewer";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
} from "react-leaflet";

import L, { LatLngExpression } from "leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import tileLayer from "../utils/const/tileLayer";

import { Layout } from "../components/Layout";
import { Btn } from "../components/Button";
import { ImLocation } from "react-icons/im";

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

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row p-5 gap-5 justify-center">
        <div className="lg:w-4/6">
          <img
            src={content}
            alt=""
            className="w-full h-96 rounded-lg"
          />
        </div>
        <div className="hidden lg:block w-2/6">
          <div className="flex flex-col gap-5 h-full">
            <img
              src={content}
              alt=""
              className="w-full h-1/2 rounded-lg"
            />
            <div className="flex h-full gap-5">
              <img
                src={content}
                alt=""
                className="w-[48%] rounded-lg"
              />

              <img
                src={content}
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
      <div className="flex flex-col lg:flex-row justify-around p-5">
        <div className="lg:w-4/6">
          <h1 className="text-4xl">Danau Toba</h1>
          <div className="flex items-center">
            <ImLocation className="text-2xl" />
            <p className="font-semibold text-xl">City</p>
          </div>
          <p className="pt-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Morbi molestie tempus purus, at tristique justo vehicula
            id. Sed non mollis risus. Curabitur nisl risus, pretium
            vitae suscipit at, mattis quis lacus. Phasellus in orci
            aliquet, ultrices turpis feugiat, sagittis lacus. Vivamus
            mauris est, tincidunt in ipsum eu, sagittis placerat
            justo.
          </p>
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
            <h1 className="text-2xl">$ 50 /night</h1>
            <br />
            <h1 className="text-xl">Available Add On</h1>
            <br />
            <table className="border-collapse border border-slate-500 w-[90%] text-center mx-auto">
              <thead>
                <tr>
                  <th className="border border-slate-600">Items</th>
                  <th className="border border-slate-600">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-700">Tent</td>
                  <td className="border border-slate-700">$ 5</td>
                </tr>
                <tr>
                  <td className="border border-slate-700">Bonfire</td>
                  <td className="border border-slate-700">$ 3</td>
                </tr>
                <tr>
                  <td className="border border-slate-700">
                    Sleeping Bag
                  </td>
                  <td className="border border-slate-700">$ 2</td>
                </tr>
              </tbody>
            </table>
            <Link to={"/order/:id_order"}>
              <Btn className="mt-10" label="Reserve" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DetailCamp;
