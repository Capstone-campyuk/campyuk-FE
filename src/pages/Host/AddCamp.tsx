import { Layout } from "../../components/Layout";
import { Btn } from "../../components/Button";
import { ImLocation } from "react-icons/im";

function AddCamp() {
  return (
    <Layout>
      <h1 className="font-bold text-3xl pt-5 px-20">Add Camp</h1>
      <div className="px-20 pt-10 pb-10">
        <div className="flex flex-col bg-white rounded-lg">
          <form action="">
            <div className="flex py-5 w-full px-10">
              <label className="font-semibold text-black flex items-start justify-start w-1/3 text-center">
                Title
              </label>
              <input
                className="rounded-lg bg-[#cbd5e1] border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                type="text"
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
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-center justify-start w-1/3 text-center">
                Location
              </label>
              <input
                type="number"
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
                className="flex-row w-42 bg-white rounded-lg text-black"
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-center justify-start w-1/3 text-center">
                Add business licance
              </label>
              <input
                type="file"
                className="flex-row w-42 bg-white rounded-lg text-black"
              />
            </div>
            <div className="flex py-2 w-full px-10">
              <label className="font-semibold text-black flex items-center justify-start w-1/3 text-center">
                Latitude
              </label>
              <input
                type="number"
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
                className="input input-bordered bg-[#cbd5e1] w-full"
                placeholder=""
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-end p-5">
        <Btn className="w-18" label="Add Camp" />
      </div>
    </Layout>
  );
}

export default AddCamp;
