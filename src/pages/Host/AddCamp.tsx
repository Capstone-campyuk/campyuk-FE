import { Layout } from "../../components/Layout";
import { Btn } from "../../components/Button";
import { ImLocation } from "react-icons/im";

function AddCamp() {
  return (
    <Layout>
      <h1 id="add-camp-page" className="font-bold text-3xl pt-5 px-20">
        Add Camp
      </h1>
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
                id="add-camp-title"
                placeholder=""
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-start justify-start w-1/3 text-center">
                Price
              </label>
              <input
                className="rounded-lg bg-[#cbd5e1] border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                type="number"
                id="add-camp-price"
                placeholder=""
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-start justify-start w-1/3 text-center">
                Description
              </label>
              <textarea
                className="w-full overflow-y-auto h-36 bg-[#cbd5e1] rounded-lg"
                style={{ resize: "none" }}
                id="add-camp-description"
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-center justify-start w-1/3 text-center">
                Location
              </label>
              <input
                type="number"
                id="add-camp-location"
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
                id="add-camp-address"
                className="input input-bordered bg-[#cbd5e1] w-full"
                placeholder=""
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-center justify-start w-1/3 text-center">
                Add image
              </label>
              <input
                id="add-camp-image"
                type="file"
                className="flex-row w-42 bg-white rounded-lg text-black"
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-center justify-start w-1/3 text-center">
                Add business licance
              </label>
              <input
                type="file"
                id="add-camp-businessL"
                className="flex-row w-42 bg-white rounded-lg text-black"
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-center justify-start w-1/3 text-center">
                Latitude
              </label>
              <input
                type="number"
                id="add-camp-latitude"
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
                id="add-camp-longtitude"
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
                id="add-camp-distance"
                className="input input-bordered bg-[#cbd5e1] w-full"
                placeholder=""
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-end p-5">
        <Btn className="w-18" id="btn-addcamp" label="Add Camp" />
      </div>
    </Layout>
  );
}

export default AddCamp;
