import { Layout } from "../../components/Layout";
import { Btn, Btns } from "../../components/Button";

function EditCampHost() {
  return (
    <Layout>
      <h1 className="font-bold text-3xl pt-5 px-20">Edit Camp</h1>
      <div className="px-20 pt-10 pb-10">
        <div className="flex flex-col bg-bgcard  rounded-lg">
          <form action="">
            <div className="flex py-5 w-full px-10">
              <label className="font-semibold text-black flex items-start justify-start w-1/3 text-center">
                Title
              </label>
              <input
                className="rounded-lg bg-[#cbd5e1] border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                type="text"
                id="editcamp-title"
                placeholder=""
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-start justify-start w-1/3 text-center">
                Price
              </label>
              <input
                id="editcamp-price"
                className="rounded-lg bg-[#cbd5e1] border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                type="number"
                placeholder=""
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-start justify-start w-1/3 text-center">
                Description
              </label>
              <textarea
                className="w-full overflow-y-auto h-36 bg-[#cbd5e1] rounded-lg"
                id="editcamp-description"
                style={{ resize: "none" }}
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-center justify-start w-1/3 text-center">
                Location
              </label>
              <input
                type="number"
                id="editcamp-location"
                className="input input-bordered bg-[#cbd5e1] w-full"
                placeholder=""
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-center justify-start w-1/3 text-center">
                Address
              </label>
              <input
                type="text"
                id="editcamp-address"
                className="input input-bordered bg-[#cbd5e1] w-full"
                placeholder=""
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-center justify-start w-1/3 text-center">
                Add image
              </label>
              <input
                type="file"
                id="editcamp-image"
                className="flex-row w-42 bg-white rounded-lg text-black"
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-center justify-start w-1/3 text-center">
                Add business licance
              </label>
              <input
                type="file"
                id="editcamp-businessL"
                className="flex-row w-42 bg-white rounded-lg text-black"
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-center justify-start w-1/3 text-center">
                Latitude
              </label>
              <input
                type="number"
                id="editcamp-latitude"
                className="input input-bordered bg-[#cbd5e1] w-full"
                placeholder=""
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-center justify-start w-1/3 text-center">
                Longtitude
              </label>
              <input
                type="number"
                id="editcamp-longtitude"
                className="input input-bordered bg-[#cbd5e1] w-full"
                placeholder=""
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-center justify-start w-1/3 text-center">
                Distance
              </label>
              <input
                type="number"
                id="editcamp-distance"
                className="input input-bordered bg-[#cbd5e1] w-full"
                placeholder=""
              />
            </div>
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
                  e.target.files[0];
                }}
              />
              <img src={"newPreviewImage"} alt="" width={200} height={100} />
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
