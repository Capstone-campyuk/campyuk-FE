import { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useCookies } from "react-cookie";
import withReactContent from "sweetalert2-react-content";

import { Layout } from "../../components/Layout";
import { Btn, Btns } from "../../components/Button";
import { InputSide } from "../../components/Input";
import { DotWave } from "@uiball/loaders";

import Swal from "../../utils/Swal";
import "leaflet/dist/leaflet.css";
import tileLayer from "../../utils/const/tileLayer";

function AddCamp() {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number | Blob>();
  const [description, setDescription] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [distance, setDistance] = useState<number | Blob>();
  const [document, setDocument] = useState<any>();
  const [images, setImages] = useState<any>([]);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cookie] = useCookies(["username"]);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [position, setPosition] = useState({
    lat: -2.175,
    lng: 114.408,
  });
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          setLatitude(marker.getLatLng().lat);
          setLongitude(marker.getLatLng().lng);
        }
      },
    }),
    []
  );

  useEffect(() => {
    if (
      title &&
      price &&
      description &&
      latitude &&
      longitude &&
      address &&
      city &&
      distance &&
      document &&
      images
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  });

  const handleAddCamp = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", JSON.stringify(price));
    formData.append("description", description);
    formData.append("latitude", JSON.stringify(latitude));
    formData.append("longitude", JSON.stringify(longitude));
    formData.append("address", address);
    formData.append("city", city);
    formData.append("distance", JSON.stringify(distance));
    formData.append("document", document);
    for (let i = 0; i < images.length; i++) {
      formData.append(`images`, images[i]);
    }

    axios
      .post("https://abiasa.site/camps", formData)
      .then((res) => {
        MySwal.fire({
          icon: "success",
          title: "Done",
          text: "Add Camp Success",
          showCancelButton: false,
        });
        navigate(`/host/${cookie.username}`);
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          text: err.response.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <h1 id="add-camp-page" className="text-4xl p-5">
        Add Camp
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <DotWave size={100} color={"#1E3231"} />
        </div>
      ) : (
        <form
          onSubmit={handleAddCamp}
          encType="multipart/form-data"
          className="bg-bgcard flex flex-col gap-5 m-5 py-8 rounded-3xl shadow-md"
        >
          <InputSide
            title="Title"
            id="input-title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputSide
            title="Price"
            id="input-price"
            type="number"
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <div className="flex w-full px-5 md:px-10">
            <label className="text-black font-bold flex items-start mt-2 w-1/3">
              Description
            </label>
            <textarea
              className="w-full overflow-y-auto h-36 rounded-lg bg-form px-2 p-2 border-2 focus:outline-none text-black"
              style={{ resize: "none" }}
              placeholder="Description"
              id="add-camp-description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="p-5 md:p-10 ">
            <p className="text-black font-bold py-5">Select Location</p>
            <MapContainer
              center={[-2.175, 114.408]}
              zoom={5}
              scrollWheelZoom={true}
              style={{ height: "400px" }}
            >
              <TileLayer {...tileLayer} />
              <Marker
                draggable={true}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}
              ></Marker>
            </MapContainer>
          </div>
          <InputSide
            title="City"
            id="input-city"
            type="text"
            onChange={(e) => setCity(e.target.value)}
          />
          <InputSide
            title="Address"
            id="input-address"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />
          <InputSide
            title="Image"
            id="input-image"
            type="file"
            onChange={(e) => {
              if (!e.currentTarget.files) return;
              setImages(e.target.files);
            }}
            accept="image/jpg, image/jpeg, image/png"
            multiple
            min={3}
          />
          <InputSide
            title="Business License"
            id="input-license"
            type="file"
            onChange={(e) => {
              if (!e.currentTarget.files) return;
              setDocument(e.currentTarget.files[0]);
            }}
            accept="application/pdf"
          />
          <InputSide
            title="Distance"
            id="input-distance"
            type="number"
            onChange={(e) => setDistance(parseInt(e.target.value))}
          />
          <div className="flex justify-end gap-5 p-5">
            <Link to={`/host/${cookie.username}`}>
              <Btns id="btn-cancel" label="Cancel" className="w-18" />
            </Link>
            <Btn
              className="w-18"
              id="btn-addcamp"
              label="Add Camp"
              disabled={disabled || loading}
            />
          </div>
        </form>
      )}
    </Layout>
  );
}

export default AddCamp;
