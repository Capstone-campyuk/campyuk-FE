import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ReactImageCarouselViewer } from "react-image-carousel-viewer";
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import withReactContent from "sweetalert2-react-content";
import { useCookies } from "react-cookie";

import { Layout } from "../components/Layout";
import { Btn } from "../components/Button";
import { ImLocation } from "react-icons/im";
import { DotWave } from "@uiball/loaders";

import Swal from "../utils/Swal";
import tileLayer from "../utils/const/tileLayer";
import { CampTypes, ImageTypes } from "../utils/types/campsTypes";

const RecenterAutomatically = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
};

function DetailCampHost() {
  const [camp, setCamp] = useState<CampTypes>({});
  const [image, setImage] = useState<ImageTypes[] | any>([]);
  const [images, setImages] = useState<ImageTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cookie] = useCookies(["role"]);
  const { id_camp } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = () => {
    axios
      .get(`https://abiasa.site/camps/${id_camp}`)
      .then((res) => {
        const { data } = res.data;
        data.images.forEach((item: any) => {
          item.src = item.image;
        });
        setCamp(data);
        setImage(data.images);
        setImages(data.images);
        setLat(data.latitude);
        setLng(data.longitude);
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

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <DotWave size={100} color={"#1E3231"} />
        </div>
      ) : (
        <>
          <ReactImageCarouselViewer
            open={isOpen}
            onClose={() => setIsOpen(false)}
            images={image}
            startIndex={index}
          />
          <div
            id="detail-admin-page"
            className="flex flex-col lg:flex-row p-5 gap-5 justify-center"
          >
            <div className="lg:w-4/6">
              <img
                src={camp.images?.[0].image}
                alt={camp.title}
                className="object-cover w-full h-96 rounded-lg cursor-pointer"
                onClick={() => {
                  setIndex(index);
                  setIsOpen(true);
                }}
              />
            </div>
            <div className="hidden lg:block w-2/6 h-96">
              {images.length > 2 ? (
                <div className="flex flex-col gap-5 h-full">
                  <img
                    src={camp.images?.[1].image}
                    alt={camp.title}
                    className="object-cover w-full h-1/2 rounded-lg"
                  />
                  <div className="flex h-full gap-5">
                    <img
                      src={camp.images?.[2].image}
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
              ) : (
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
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center w-full py-4 lg:max-w-[70vw] m-5 lg:mx-auto">
            <div className="flex flex-col lg:w-1/3 gap-2">
              <div className="flex justify-between w-[90vw] lg:w-[70vw]">
                <h1 className="text-2xl lg:text-4xl">{camp.title}</h1>
                {cookie.role === "guest" ? (
                  <Link to={`/order/${id_camp}`}>
                    <Btn id="btn-reserve" label="Reserve" />
                  </Link>
                ) : (
                  <div>
                    <Btn id="btn-reserve" label="Reserve" disabled={true} />
                  </div>
                )}
              </div>
              <p className="flex items-center">
                <ImLocation />
                {camp.city} | {camp.host_name}
              </p>
              <p>{camp.distance} from the city centre</p>
              <h1 className="text-xl lg:my-5 lg:text-3xl">
                $ {camp.price} /night
              </h1>
            </div>
            <p className="w-[90vw] lg:w-2/3 text-justify mt-5 lg:mt-14">
              {camp.description}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row justify-center w-full py-4 lg:max-w-[70vw] m-5 lg:mx-auto">
            <h1 className="flex text-2xl lg:w-1/3">Add On Available</h1>
            {camp.items?.length === 0 ? (
              <p className="lg:text-center lg:w-2/3">
                This camp has no additional items
              </p>
            ) : (
              <table className="w-2/3 table-auto border-collapse border border-slate-600 mt-5 lg:mt-0">
                <thead>
                  <tr className="font-bold text-center">
                    <td className="border border-slate-700">Items</td>
                    <td className="border border-slate-700">Price</td>
                    <td className="border border-slate-700">Stock</td>
                  </tr>
                </thead>
                <tbody>
                  {camp.items?.map((item) => (
                    <tr key={item.item_id} className="text-center">
                      <td className="border border-slate-700">{item.name}</td>
                      <td className="border border-slate-700">
                        $ {item.rent_price}
                      </td>
                      <td className="border border-slate-700">{item.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="lg:max-w-[70vw] mx-auto py-10">
            <MapContainer
              id="map"
              center={[lat, lng]}
              zoom={10}
              scrollWheelZoom={true}
              style={{ height: "400px" }}
            >
              <TileLayer {...tileLayer} />
              <Marker position={[lat, lng]}>
                <Popup>{camp.title}</Popup>
              </Marker>
              <RecenterAutomatically lat={lat} lng={lng} />
            </MapContainer>
          </div>
        </>
      )}
    </Layout>
  );
}

export default DetailCampHost;
