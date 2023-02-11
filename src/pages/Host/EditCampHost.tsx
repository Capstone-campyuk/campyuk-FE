import { useEffect, useState, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import { useCookies } from "react-cookie";
import Swal from "../../utils/Swal";
import axios from "axios";

import { Layout } from "../../components/Layout";
import { Btn } from "../../components/Button";
import { InputSide } from "../../components/Input";

import tileLayer from "../../utils/const/tileLayer";

function EditCampHost() {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<any>();
  const [description, setDescription] = useState<string>("");
  const [latitude, setLatitude] = useState<any>();
  const [longitude, setLongitude] = useState<any>();
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [distance, setDistance] = useState<any>();
  const [document, setDocument] = useState<any>({});
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);
  const [cookie] = useCookies();
  const { id_camp }: any = useParams();
  const navigate = useNavigate();
  //image
  const [image, setEditImage] = useState<any>({});
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

  useEffect(() => {
    getCampHost();
  }, []);
  function getCampHost() {
    axios
      .get(`https://abiasa.site/camps/${id_camp}`)
      .then((res) => {
        const {
          title,
          address,
          city,
          description,
          distance,
          latitude,
          longitude,
          price,
        } = res.data.data;
        setTitle(title);
        setAddress(address);
        setCity(city);
        setDescription(description);
        setDistance(distance);
        setLatitude(latitude);
        setLongitude(longitude);
        setPrice(price);
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          text: error.data.message,
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
    if (images) {
      formData.append("images", images);
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
          text: "successful change camp",
          showCancelButton: false,
          confirmButtonText: "Ok",
        });
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          text: error.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  function addImage() {
    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append(`image`, image[i]);
    }
    formData.append("camp_id", id_camp);

    axios
      .post(`https://abiasa.site/images`, formData)
      .then((res) => {
        MySwal.fire({
          title: "Success",
          text: "successful add iamge",
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
          text: error.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  }

  function addItems() {
    setLoading(true);
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
      .catch((err) => {
        alert(err.response.data.message);
      })
      .finally(() => setLoading(false));
  }

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
              value={title}
            />
            <InputSide
              title="Price"
              id="input-price"
              type="number"
              onChange={(e) => setPrice(parseInt(e.target.value))}
              value={price}
            />
            <div className="flex w-full px-10">
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

            <div className="p-10 ">
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
              title="Image"
              id="input-image"
              type="file"
              onChange={(e) => {
                if (!e.currentTarget.files) return;
                setImages(e.target.files);
              }}
              accept="image/jpg, image/jpeg, image/png"
              multiple
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
          Add image
        </label>
        {/* modal edit image*/}
        <input type="checkbox" id="edit-modal-tent" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Image</h3>
            <div className="flex py-5 w-full px-10">
              <form
                onSubmit={addImage}
                encType="multipart/form-data"
                className="flex flex-row"
              >
                <label
                  htmlFor="edit-photo"
                  style={{ cursor: "pointer" }}
                  className="font-semibold text-black flex items-center justify-center w-1/3 text-center"
                >
                  Upload image
                </label>
                <input
                  title="Image"
                  id="input-image"
                  type="file"
                  onChange={(e) => {
                    if (!e.currentTarget.files) return;
                    setEditImage(e.target.files);
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
                onClick={() => addImage()}
              >
                Add Image
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

        {/* akhir modal edit iamge */}
        <label
          htmlFor="edit-modal-item"
          id="edit-item"
          className="btn bg-btns text-white hover:bg-btnsh border-none rounded-full"
        >
          Add Item
        </label>
        {/* modal edit item*/}
        <input type="checkbox" id="edit-modal-item" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <form onSubmit={addItems}>
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
                  onChange={(e) => setPriceItem(parseInt(e.target.value))}
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
                  onChange={(e) => setStock(parseInt(e.target.value))}
                />
              </div>

              <div className="modal-action">
                <button
                  className="btn bg-btn text-white hover:bg-btnh border-none rounded-full "
                  id="btn-add-item"
                  onClick={() => addItems()}
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
            </form>
          </div>
        </div>
        {/* akhir modal edit item */}
        <Btn
          className="w-18"
          label="Update Camp"
          id="update-camp"
          onClick={() => editCamp()}
        />
      </div>
    </Layout>
  );
}

export default EditCampHost;
