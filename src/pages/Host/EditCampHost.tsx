import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";

import { MapContainer, useMap, TileLayer } from "react-leaflet";
import { Layout } from "../../components/Layout";
import { Btn, Btns } from "../../components/Button";
import { InputSide } from "../../components/Input";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import tileLayer from "../../utils/const/tileLayer";

function EditCampHost() {
  const [cookie, setCookie, removeCookie] = useCookies();
  const [gettitle, setTitleget] = useState<string>("");
  const [getprice, setPriceget] = useState<any>();
  const [getdescription, setDescriptionget] = useState<string>("");
  const [getlatitude, setLatitudeget] = useState<any>();
  const [getlongitude, setLongitudeget] = useState<any>();
  const [getaddress, setAddressget] = useState<string>("");
  const [getcity, setCityget] = useState<string>("");
  const [getdistance, setDistanceget] = useState<any>();
  const [getdocument, setDocumentget] = useState<any>({});
  const { id } = useParams();

  //edit
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
  const [newPreviewImage, setNewPreviewImage] = useState<any>();

  const handleImage = (file: any) => {
    setImages(file);
    const reader = new FileReader();
    reader.onload = () => {
      setNewPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

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
      getCampHost();
    }, [map]);

    return null;
  };

  function getCampHost() {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    };
    axios
      .get(`https://abiasa.site/camps/${id}`, config)
      .then((res) => {
        console.log(res);
        const {
          gettitle,
          getaddress,
          getcity,
          getdescription,
          getdistance,
          getdocument,
          getlatitude,
          getlongitude,
          getprice,
        } = res.data.data;
        setTitleget(gettitle);
        setAddressget(getaddress);
        setCityget(getcity);
        setDescriptionget(getdescription);
        setDistanceget(getdistance);
        setDocumentget(getdocument);
        setLatitudeget(getlatitude);
        setLongitudeget(getlongitude);
        setPriceget(getprice);
      })
      .catch((error) => {
        alert(error);
      });
  }
  const editCamp = (e: React.FormEvent<HTMLFormElement>) => {
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
      .put(`https://abiasa.site/camps/${id}`, formData)
      .then((res) => {})
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <Layout>
      <h1 id="edit-camp-page" className="font-bold text-3xl pt-5 px-20">
        Edit Camp
      </h1>
      <div className="px-20 pt-10 pb-10">
        <div className="flex flex-col bg-bgcard  rounded-lg">
          <form
            onSubmit={editCamp}
            encType="multipart/form-data"
            className="bg-bgcard flex flex-col gap-5 m-5 py-8 rounded-3xl shadow-md"
          >
            <InputSide
              title="Title"
              id="input-title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder={gettitle}
            />
            <InputSide
              title="Price"
              id="input-price"
              type="number"
              onChange={(e) => setPrice(parseInt(e.target.value))}
              placeholder={getprice}
            />
            <div className="flex w-full px-10">
              <label className="text-black font-bold flex items-start mt-2 w-1/3">
                Description
              </label>
              <textarea
                className="w-full overflow-y-auto h-36 rounded-lg bg-form px-2 p-2 border-2 focus:outline-none text-black"
                style={{ resize: "none" }}
                placeholder={getdescription}
                id="add-camp-description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <InputSide
              title="Latitude"
              id="input-latitude"
              type="number"
              placeholder={getlatitude}
              onChange={(e) => setLatitude(parseInt(e.target.value))}
            />
            <InputSide
              title="Longitude"
              id="input-longitude"
              type="number"
              placeholder={getlongitude}
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
              placeholder={getcity}
              onChange={(e) => setCity(e.target.value)}
            />
            <InputSide
              title="Address"
              id="input-address"
              placeholder={getaddress}
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />
            <InputSide
              title="Image"
              id="input-image"
              type="file"
              onChange={(e) => {
                if (!e.target.files) return;
                handleImage(e.target.files[0]);
              }}
            />
            <InputSide
              title="Business License"
              id="input-license"
              placeholder={getdocument}
              type="file"
              onChange={(e: any) => setDocument(e.target.files[0])}
            />
            <InputSide
              title="Distance"
              id="input-distance"
              placeholder={getdistance}
              type="number"
              onChange={(e) => setDistance(parseInt(e.target.value))}
            />
          </form>
        </div>
      </div>
      <div className="flex justify-center gap-20 pb-10">
        <label
          htmlFor="edit-modal-tent"
          id="edit-tent"
          className="btn bg-btns text-white hover:bg-btnsh border-none rounded-full"
        >
          Edit Tent
        </label>
        {/* modal edit tent*/}
        <input type="checkbox" id="edit-modal-tent" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Tent</h3>
            <div className="flex py-5 w-full px-10">
              <label className="font-semibold text-black flex items-start justify-start w-1/3 text-center">
                Size
              </label>
              <select
                name="size"
                id="size"
                className="bg-[#cbd5e1]  w-full rounded-lg text-black p-3 border focus:outline-none focus:border-black"
              >
                <option value="small">S</option>
                <option value="medium">M</option>
                <option value="large">L</option>
              </select>
            </div>
            <div className="flex py-5 w-full px-10">
              <label className="font-semibold text-black flex items-start justify-start w-1/3 text-center">
                Price
              </label>
              <input
                className="rounded-lg bg-[#cbd5e1] border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                type="number"
                id="edittent-price"
                placeholder=""
              />
            </div>
            <div className="flex py-5 w-full px-10">
              <label className="font-semibold text-black flex items-start justify-start w-1/3 text-center">
                Stok
              </label>
              <input
                className="rounded-lg bg-[#cbd5e1] border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                type="number"
                id="edittent-stok"
                placeholder=""
              />
            </div>

            <div className="flex py-5 w-full px-10">
              <label
                htmlFor="edit-photo"
                id="add-image"
                style={{ cursor: "pointer" }}
                className={
                  "font-semibold text-black flex items-start justify-start w-1/3 text-center"
                }
              >
                Add image
              </label>
              <input
                type="file"
                accept="image/*"
                id="edit-photo"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (!e.target.files) return;
                  handleImage(e.target.files[0]);
                }}
              />
            </div>
            <div className="modal-action">
              <button
                className="btn bg-btn text-white hover:bg-btnh border-none rounded-full "
                id="btn-add-tent"
              >
                Add Tent
              </button>
              <label
                htmlFor="edit-modal-tent"
                id="cancel"
                className="btn bg-btn text-white hover:bg-btnh border-none rounded-full "
              >
                Cancel
              </label>
            </div>
          </div>
        </div>
        {/* akhir modal edit tent */}
        <label
          htmlFor="edit-modal-item"
          id="edit-item"
          className="btn bg-btns text-white hover:bg-btnsh border-none rounded-full"
        >
          Edit Item
        </label>
        {/* modal edit item*/}
        <input type="checkbox" id="edit-modal-item" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Item</h3>
            <div className="flex py-5 w-full px-10">
              <label className="font-semibold text-black flex items-start justify-start w-1/3 text-center">
                Size
              </label>
              <select
                name="size"
                id="size"
                className="bg-[#cbd5e1]  w-full rounded-lg text-black p-3 border focus:outline-none focus:border-black"
              >
                <option value="small">Bonfire</option>
                <option value="medium">Sleeping Bag</option>
              </select>
            </div>
            <div className="flex py-5 w-full px-10">
              <label className="font-semibold text-black flex items-start justify-start w-1/3 text-center">
                Price
              </label>
              <input
                className="rounded-lg bg-[#cbd5e1] border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                type="number"
                id="edititem-price"
                placeholder=""
              />
            </div>
            <div className="flex py-5 w-full px-10">
              <label className="font-semibold text-black flex items-start justify-start w-1/3 text-center">
                Stok
              </label>
              <input
                className="rounded-lg bg-[#cbd5e1] border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                type="number"
                id="edititem-stok"
                placeholder=""
              />
            </div>

            <div className="modal-action">
              <button
                className="btn bg-btn text-white hover:bg-btnh border-none rounded-full "
                id="btn-add-item"
              >
                Add Item
              </button>
              <label
                htmlFor="edit-modal-item"
                id="cencel-edit-item"
                className="btn bg-btn text-white hover:bg-btnh border-none rounded-full "
              >
                Cancel
              </label>
            </div>
          </div>
        </div>
        {/* akhir modal edit item */}

        <Btn className="w-18" label="Update Camp" id="update-camp" />
      </div>
    </Layout>
  );
}

export default EditCampHost;
