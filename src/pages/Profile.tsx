import { Layout } from "../components/Layout";
import { Modals2 } from "../components/Modal";

function Profile() {
  return (
    <Layout>
      <div className="px-10 pt-10">
        <h1 className="text-4xl font-bold">Profile</h1>
      </div>
      <div className="flex flex-row px-10 pt-10">
        <div className="flex w-1/2 px-32">
          <div className="flex justify-center">
            <div className="w-[350px] h-[350px] mx-auto mt-3 bg-white border-none">
              <img
                src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              />
            </div>
          </div>
        </div>
        <div className="flex w-1/2 bg-white mr-44">
          <div className="px-10 pt-10">
            <div className="flex flex-row gap-8 pt-5 pb-1">
              <p className="font-bold text-xl">Full Name </p>
              <p className="text-lg">:{"name"}</p>
            </div>
            <div className="flex flex-row gap-6 pt-5 pb-1">
              <p className="font-bold text-xl">User Name </p>
              <p className="text-lg ">:{"username"}</p>
            </div>
            <div className="flex flex-row gap-20 pt-5 pb-1">
              <p className="font-bold text-xl">Email </p>
              <p className="text-lg ">:{"email"}</p>
            </div>
            <div className="flex flex-row gap-20 pt-5 pb-1">
              <label
                htmlFor={`my-modal-1`}
                className={`normal-case bg-transparent`}
              >
                <div className="flex flex-col cursor-pointer">
                  <div className="w-1/2 text-lg mx-10 capitalize bg-btn border-none shadow-lg text-white font-semibold rounded-lg btn hover:bg-btnh">
                    Update
                  </div>
                </div>
              </label>
              <Modals2
                no={1}
                titleModal={"Update Profile"}
                input4={
                  <div className="flex py-2 w-full">
                    <label className="font-semibold text-black flex items-center justify-center w-1/3"></label>
                    <input
                      className="file-input file:rounded-lg file:border-none file:text-white 
                                    text-black rounded-lg border-2 border-[#e5e5e5] bg-white focus:outline-none w-full"
                      type="file"
                      placeholder="Profile Picture"
                    />
                  </div>
                }
                input1={
                  <div className="flex py-2 w-full">
                    <label className="font-semibold text-black flex items-center justify-center w-1/3 text-center">
                      Full Name
                    </label>
                    <input
                      className="rounded-lg bg-white border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                      type="text"
                      placeholder="Full Name"
                    />
                  </div>
                }
                input2={
                  <div className="flex py-2 w-full">
                    <label className="font-semibold text-black flex items-center justify-center w-1/3 text-center">
                      User name
                    </label>
                    <input
                      className="rounded-lg bg-white border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                      type="text"
                      placeholder="username"
                    />
                  </div>
                }
                input3={
                  <div className="flex py-2 w-full">
                    <label className="font-semibold text-black flex items-center justify-center w-1/3 text-center">
                      Email
                    </label>
                    <input
                      className="rounded-lg bg-white border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                      type="email"
                      placeholder="email"
                    />
                  </div>
                }
                tombol1={"Cancel"}
                tombol2={"Save"}
                onClick={() => "haha"}
              />
              <label className={`normal-case bg-transparent`}>
                <div className="flex flex-col cursor-pointer">
                  <div
                    className="w-1/2 text-lg mx-10 capitalize bg-btn border-none shadow-lg text-white font-semibold rounded-lg btn hover:bg-btnh"
                    onClick={() => "haha"}
                  >
                    Remove
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Profile;
