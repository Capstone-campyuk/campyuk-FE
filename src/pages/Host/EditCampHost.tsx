import { useEffect, useState, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import { HiOutlineTrash } from "react-icons/hi";
import { useCookies } from "react-cookie";
import Swal from "../../utils/Swal";
import { DotWave } from "@uiball/loaders";
import axios from "axios";

import { Layout } from "../../components/Layout";
import { Btn, Btns } from "../../components/Button";
import { InputSide } from "../../components/Input";

import "leaflet/dist/leaflet.css";
import tileLayer from "../../utils/const/tileLayer";
import { CampTypes, ImageTypes } from "../../utils/types/campsTypes";

function EditCampHost() {
  const [camp, setCamp] = useState<CampTypes>({});
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [distance, setDistance] = useState<number>();
  const [document, setDocument] = useState<any>({});
  const [image, setImage] = useState<ImageTypes[] | any>([]);
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);
  const [cookie] = useCookies();
  const { id_camp }: any = useParams();
  const navigate = useNavigate();
  //image
  const [images, setEditImages] = useState<any>({});
  // edit item
  const [stock, setStock] = useState<number>(1);
  const [priceItem, setPriceItem] = useState<number>(1);
  const [name, setName] = useState<string>("");

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

  const preventChar = (e: React.KeyboardEvent) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  useEffect(() => {
    getCampHost();
  }, []);

  function getCampHost() {
    axios
      .get(`https://abiasa.site/camps/${id_camp}`)
      .then((res) => {
        const { data } = res.data;
        data.images.forEach((item: any) => {
          item.src = item.image;
        });
        setCamp(data);
        setImage(data.images);
        setTitle(data.title);
        setAddress(data.address);
        setCity(data.city);
        setDescription(data.description);
        setDistance(data.distance);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setPrice(data.price);
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          text: error.response.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      });
  }

  const editCamp = () => {
    setLoading(true);
    const formData = new FormData();
    if (title) {
      formData.append("title", title);
    }
    if (price) {
      formData.append("price", JSON.stringify(price));
    }
    if (description) {
      formData.append("description", description);
    }
    if (latitude) {
      formData.append("latitude", JSON.stringify(latitude));
    }
    if (longitude) {
      formData.append("longitude", JSON.stringify(longitude));
    }
    if (address) {
      formData.append("address", address);
    }
    if (city) {
      formData.append("city", city);
    }
    if (distance) {
      formData.append("distance", JSON.stringify(distance));
    }
    if (document) {
      formData.append("document", document);
    }
    if (image) {
      formData.append("images", image);
    }
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    };
    axios
      .put(`https://abiasa.site/camps/${id_camp}`, formData, config)
      .then((res) => {
        MySwal.fire({
          title: "Success",
          text: "successful update camp",
          showCancelButton: false,
        });
        navigate(`/camp-host/${id_camp}`);
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          text: error.response.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  function addImage() {
    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append(`image`, images[i]);
    }
    formData.append("camp_id", id_camp);

    axios
      .post(`https://abiasa.site/images`, formData)
      .then((res) => {
        MySwal.fire({
          title: "Success",
          text: "successful add image",
          showCancelButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(0);
          }
        });
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          text: error.response.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  }

  function addItem(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("stock", JSON.stringify(stock));
    formData.append("price", JSON.stringify(priceItem));
    formData.append("name", name);
    formData.append("camp_id", id_camp);
    axios
      .post(`https://abiasa.site/items`, formData)
      .then((res) => {
        MySwal.fire({
          title: "Success",
          text: "successful add item",
          showCancelButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(0);
          }
        });
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          text: error.response.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  }

  function deleteItem(id: number | any) {
    axios
      .delete(`https://abiasa.site/items/${id}`)
      .then(() => {
        MySwal.fire({
          title: "Success",
          text: "successful delete item",
          showCancelButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(0);
          }
        });
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          text: error.response.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  }

  function deleteImage(id: number | any) {
    axios
      .delete(`https://abiasa.site/images/${id}`)
      .then(() => {
        MySwal.fire({
          title: "Success",
          text: "successful delete image",
          showCancelButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(0);
          }
        });
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          text: error.response.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <Layout>
      <h1 id="edit-camp-page" className="text-4xl p-5">
        Edit Camp
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <DotWave size={100} color={"#1E3231"} />
        </div>
      ) : (
        <>
          <div className="bg-bgcard flex flex-col gap-5 m-5 py-8 rounded-3xl shadow-md">
            <form
              onSubmit={editCamp}
              encType="multipart/form-data"
              className="flex flex-col gap-5"
            >
              <InputSide
                title="Title"
                id="input-title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <InputSide
                title="Price"
                id="input-price"
                type="number"
                min="1"
                onKeyDown={preventChar}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                value={price}
              />
              <div className="flex w-full px-5 md:px-10">
                <label className="text-black font-bold flex items-start mt-2 w-1/3">
                  Description
                </label>
                <textarea
                  className="w-full overflow-y-auto h-36 rounded-lg bg-form px-2 p-2 border-2 focus:outline-none text-black"
                  style={{ resize: "none" }}
                  value={description}
                  id="add-camp-description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="p-5 md:p-10">
                <p className="text-black font-bold py-5">Select Location</p>
                <MapContainer
                  id="map"
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
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <InputSide
                title="Address"
                id="input-address"
                value={address}
                type="text"
                onChange={(e) => setAddress(e.target.value)}
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
                value={distance}
                type="number"
                min="1"
                onKeyDown={preventChar}
                onChange={(e) => setDistance(parseInt(e.target.value))}
              />
            </form>
            <div className="flex items-center w-full px-5 md:px-10">
              <label className="text-black font-bold flex items-start w-1/4">
                Image
              </label>
              <label
                htmlFor="edit-modal-tent"
                id="edit-tent"
                className="btn bg-btn text-white hover:bg-btnh border-none rounded-full"
              >
                Add image
              </label>
              {/* modal edit image*/}
              <input
                type="checkbox"
                id="edit-modal-tent"
                className="modal-toggle"
              />
              {loading ? (
                <div className="flex justify-center items-center h-[60vh]">
                  <DotWave size={100} color={"#1E3231"} />
                </div>
              ) : (
                <div className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg py-5">Add Image</h3>
                    <div className="flex py-5 w-full px-10">
                      <form
                        onSubmit={addImage}
                        encType="multipart/form-data"
                        className="flex flex-row gap-4"
                      >
                        <label
                          htmlFor="edit-photo"
                          style={{ cursor: "pointer" }}
                          className="font-semibold text-black flex items-start justify-start w-1/3 text-center"
                        >
                          Upload image
                        </label>
                        <input
                          title="Image"
                          id="input-image"
                          type="file"
                          onChange={(e) => {
                            if (!e.currentTarget.files) return;
                            setEditImages(e.target.files);
                          }}
                          accept="image/jpg, image/jpeg, image/png"
                          multiple
                        />
                      </form>
                    </div>
                    <div className="modal-action">
                      <button
                        className="btn bg-btn text-white hover:bg-btnh border-none rounded-full "
                        id="btn-add-tent"
                        onClick={addImage}
                      >
                        Add Image
                      </button>
                      <label
                        htmlFor="edit-modal-tent"
                        id="cancel"
                        className="btn bg-btns text-white hover:bg-btnsh border-none rounded-full "
                      >
                        Cancel
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {/* akhir modal edit iamge */}
            </div>
            <div className="flex-col px-14 p-5 grid md:grid-cols-4 lg:grid-cols-5 gap-2 ">
              {camp.images?.map((item) => (
                <div key={item.image_id}>
                  <span
                    className="hero cursor-pointer rounded-lg w-40 h-40"
                    style={{
                      backgroundImage: `url(${item.image})`,
                    }}
                  >
                    <HiOutlineTrash
                      id="delete-image"
                      className="hero-overlay text-btn cursor-pointer bg-opacity-30 antialiased  rounded-lg w-8 h-8"
                      onClick={() => deleteImage(item.image_id)}
                    />
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center w-full px-5 md:px-10">
              <label className="text-black font-bold flex items-start w-1/4">
                Add On Available
              </label>
              <label
                htmlFor="edit-modal-item"
                id="edit-item"
                className="btn bg-btn text-white hover:bg-btnh border-none rounded-full"
              >
                Add Item
              </label>
              {/* modal edit item*/}
              <input
                type="checkbox"
                id="edit-modal-item"
                className="modal-toggle"
              />
              {loading ? (
                <div className="flex justify-center items-center h-[60vh]">
                  <DotWave size={100} color={"#1E3231"} />
                </div>
              ) : (
                <div className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box">
                    <form onSubmit={addItem}>
                      <h3 className="font-bold text-lg">Add Item</h3>
                      <div className="flex py-5 w-full px-10">
                        <label className="font-semibold text-black flex items-start justify-start w-1/3 text-center">
                          Name
                        </label>
                        <input
                          className="rounded-lg bg-[#cbd5e1] border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                          type="text"
                          id="edititem-price"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="flex py-5 w-full px-10">
                        <label className="font-semibold text-black flex items-start justify-start w-1/3 text-center">
                          Price
                        </label>
                        <input
                          className="rounded-lg bg-[#cbd5e1] border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                          type="number"
                          id="edititem-price"
                          onKeyDown={preventChar}
                          onChange={(e) =>
                            setPriceItem(parseInt(e.target.value))
                          }
                        />
                      </div>
                      <div className="flex py-5 w-full px-10">
                        <label className="font-semibold text-black flex items-start justify-start w-1/3 text-center">
                          Stock
                        </label>
                        <input
                          className="rounded-lg bg-[#cbd5e1] border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                          type="number"
                          id="edititem-stok"
                          onKeyDown={preventChar}
                          onChange={(e) => setStock(parseInt(e.target.value))}
                        />
                      </div>
                      <div className="modal-action">
                        <button
                          className="btn bg-btn text-white hover:bg-btnh border-none rounded-full "
                          id="btn-add-item"
                          onClick={() => addItem}
                        >
                          Add Item
                        </button>
                        <label
                          htmlFor="edit-modal-item"
                          id="cencel-edit-item"
                          className="btn bg-btns text-white hover:bg-btnsh border-none rounded-full "
                        >
                          Cancel
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {/* akhir modal edit item */}
            </div>
            <table className="table-auto border-collapse border border-slate-600 mt-5 mx-5 md:mx-10">
              <thead>
                <tr className="font-bold text-center">
                  <td className="border border-slate-700">Items</td>
                  <td className="border border-slate-700">Price</td>
                  <td className="border border-slate-700">Stock</td>
                  <td className="border border-bgcard"></td>
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
                    <td className="border border-bgcard">
                      <HiOutlineTrash
                        id="btn-delete"
                        className="text-btn cursor-pointer"
                        onClick={() => deleteItem(item.item_id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex md:w-[40vw] md:justify-end mx-5 md:mx-10 gap-4 mt-16">
              <Btns
                className="w-32"
                label="Cancel"
                id="btn-cancelupdate"
                onClick={() => navigate(`/host/${id_camp}`)}
              />
              <Btn
                className="w-32"
                label="Update Camp"
                id="btn-updatecamp"
                onClick={() => editCamp()}
              />
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default EditCampHost;
