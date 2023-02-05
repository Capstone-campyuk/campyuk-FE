import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MapContainer, useMap, TileLayer } from "react-leaflet";

import { Layout } from "../../components/Layout";
import { Btn, Btns } from "../../components/Button";
import { InputSide } from "../../components/Input";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import tileLayer from "../../utils/const/tileLayer";

const GetCoordinates = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const info = L.DomUtil.create("div", "legend");

    const positon = L.Control.extend({
      options: {
        position: "bottomleft",
      },

      onAdd: function () {
        info.textContent = "Click on map";
        return info;
      },
    });

    map.on("click", (e) => {
      info.textContent = e.latlng.toString();
    });

    map.addControl(new positon());
  }, [map]);

  return null;
};

function AddCamp() {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number | Blob>();
  const [description, setDescription] = useState<string>("");
  const [latitude, setLatitude] = useState<number | Blob>();
  const [longitude, setLongitude] = useState<number | Blob>();
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [distance, setDistance] = useState<number | Blob>();
  const [document, setDocument] = useState<any>({});
  const [images, setImages] = useState<any>({});
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

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
    formData.append("images", images);

    axios
      .post("https://abiasa.site/camps", formData)
      .then((res) => {
        alert("Success Add Camp");
        navigate("/host/:id-username");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  console.log(images);
  console.log(city);
  console.log(document);

  return (
    <Layout>
      <h1 id="add-camp-page" className="text-4xl p-5">
        Add Camp
      </h1>
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
        <div className="flex w-full px-10">
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
        <InputSide
          title="Latitude"
          id="input-latitude"
          type="number"
          onChange={(e) => setLatitude(parseInt(e.target.value))}
        />
        <InputSide
          title="Longitude"
          id="input-longitude"
          type="number"
          onChange={(e) => setLongitude(parseInt(e.target.value))}
        />
        <div className="p-10 ">
          <MapContainer
            center={[-2.175, 114.408]}
            zoom={5}
            scrollWheelZoom={true}
            style={{ height: "400px" }}
          >
            <TileLayer {...tileLayer} />
            <GetCoordinates />
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
          onChange={(e: any) => setImages(e.target.files[0])}
        />
        <InputSide
          title="Business License"
          id="input-license"
          type="file"
          onChange={(e: any) => setDocument(e.target.files[0])}
        />
        <InputSide
          title="Distance"
          id="input-distance"
          type="number"
          onChange={(e) => setDistance(parseInt(e.target.value))}
        />
      </form>
      <div className="flex justify-end gap-5 p-5">
        <Link to="/host/:id-username">
          <Btns id="btn-cancel" label="Cancel" className="w-18" />
        </Link>
        <Btn
          className="w-18"
          id="btn-addcamp"
          label="Add Camp"
          disabled={disabled}
          onClick={handleAddCamp}
        />
      </div>
    </Layout>
  );
}

export default AddCamp;
