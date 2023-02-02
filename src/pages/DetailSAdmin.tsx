import { ReactImageCarouselViewer } from "react-image-carousel-viewer";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import tileLayer from "../utils/tileLayer";
import { Layout } from "../components/Layout";
import { Btn, Btns } from "../components/Button";
import { GiPositionMarker } from "react-icons/gi";

function DetailSAdmin() {
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
          <img src={content} alt="" className="w-full h-96 rounded-lg" />
        </div>
        <div className="hidden lg:block w-2/6">
          <div className="flex flex-col gap-5 h-full">
            <img src={content} alt="" className="w-full h-1/2 rounded-lg" />
            <div className="flex h-full gap-5">
              <img src={content} alt="" className="w-[48%] rounded-lg" />
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
            </div>
          </div>
        </div>
      </div>
      <div className="flex pt-10">
        <div className="flex-row w-1/4 px-10">
          <h1 className="font-bold text-2xl pb-3">Tanakita Camp</h1>
          <div className="flex flex-rows pb-3">
            <GiPositionMarker className="w-8 h-8" />
            <span className="font-semibold text-xl">Alamat</span>
          </div>
          <p className="font-semibold text-xl pb-3">
            5 km away from the city centre
          </p>
          <p className="font-bold text-3xl pb-3">
            $ 60 <span className="font-normal text-xl">/night</span>
          </p>
        </div>
        <div className="flex-row w-3/4 px-20">
          <p className="text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            molestie tempus purus, at tristique justo vehicula id. Sed non
            mollis risus. Curabitur nisl risus, pretium vitae suscipit at,
            mattis quis lacus. Phasellus in orci aliquet, ultrices turpis
            feugiat, sagittis lacus. Vivamus mauris est, tincidunt in ipsum eu,
            sagittis placerat justo. Donec vitae dui mollis, mattis mi eget,
            semper quam. In tempus finibus vulputate. In sed est magna. Proin
            sed lectus vel orci cursus dignissim.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 px-10 pt-10">
        <div className="flex flex-col">
          <h1 className="font-bold text-4xl pb-3">Tent</h1>
          <p className="font-semibold text-xl pb-3">Small (1-2 person) </p>
          <p className="font-semibold text-xl pb-3">Medium (3-4 person) </p>
          <p className="font-semibold text-xl pb-3">Large (4-5 person) </p>
        </div>
        <div>
          <h1 className="font-bold text-4xl pb-3">Stock</h1>
          <p className="font-semibold text-xl pb-3 px-8">4</p>
          <p className="font-semibold text-xl pb-3 px-8">4</p>
          <p className="font-semibold text-xl pb-3 px-8">4</p>
        </div>

        <div>
          <h1 className="font-bold text-4xl pb-3">Price</h1>
          <p className="font-semibold text-xl pb-3 px-8">$8</p>
          <p className="font-semibold text-xl pb-3 px-8">$10</p>
          <p className="font-semibold text-xl pb-3 px-8">$12</p>
        </div>
        <div className="mr-8">
          <img
            src={content}
            alt=""
            className="w-80 rounded-lg absolute"
            onClick={() => {
              setIndex(index);
              setIsOpen(true);
            }}
          />
          <p className="inline-block py-16 px-16 text-2xl font-bold opacity-75 text-white">
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
      <div className="px-10">
        <label htmlFor="" className="font-bold text-2xl text-sky-900">
          Download Business Lisance
        </label>
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
              <Popup>Center Warsaw</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="flex-row w-1/2 px-10">
          <p className="text-3xl px-10 ">
            Jl. Spartan No.IV, Gotham city, West Java, 53241 +62 985904
          </p>
          <div className="flex justify-end gap-20 pb-10 pt-60 ">
            <Btns label="Unaccept" className="w-48" />
            <Btn label="Accept" className="w-48" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DetailSAdmin;
