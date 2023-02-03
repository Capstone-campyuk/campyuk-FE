import { Layout } from "../../components/Layout";
import { Modals2 } from "../../components/Modal";

function Profile() {
  const data = {
    username: "Ronaldo",
    fullname: "Cristiano Ronaldo",
    email: "ajksdhjadhs@gmail.com",
    user_image:
      "https://pbs.twimg.com/profile_images/1596028249943179264/YyjBXZ_o_400x400.jpg",
  };

  return (
    <Layout>
      <h1 className="text-4xl p-5">Profile</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center p-20">
        <div className="lg:w-1/3">
          <img className="rounded-full" src={data.user_image} />
        </div>
        <div className="bg-bgcard p-10 border-2 shadow-lg rounded-3xl lg:text-lg">
          <div className="flex gap-10 pt-5 pb-1">
            <h1>Full Name </h1>
            <p>: {data.fullname}</p>
          </div>
          <div className="flex gap-7 pt-5 pb-1">
            <h1>User Name </h1>
            <p>: {data.username}</p>
          </div>
          <div className="flex gap-20 pt-5 pb-1">
            <h1>Email </h1>
            <p>: {data.email}</p>
          </div>
          <div className="flex gap-20 pt-5 pb-1">
            <label
              id="update-profil"
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
              input1={
                <div className="flex py-2 w-full">
                  <label className="font-semibold text-black flex items-center justify-center w-1/3 text-center">
                    Full Name
                  </label>
                  <input
                    id="fullname-profil"
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
                    id="username-profil"
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
                    id="email-profil"
                    className="rounded-lg bg-white border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                    type="email"
                    placeholder="email"
                  />
                </div>
              }
              input4={
                <div className="flex py-2 w-full">
                  <label className="font-semibold text-black flex items-center justify-center w-1/3"></label>
                  <input
                    id="picture-profil"
                    className="file-input file:rounded-lg file:border-none file:text-white text-black rounded-lg border-2 border-[#e5e5e5] bg-white focus:outline-none w-full"
                    type="file"
                    placeholder="picture"
                  />
                </div>
              }
              tombol1={"Cancel"}
              tombol2={"Save"}
              onClick={() => "haha"}
            />
            <label className={`normal-case bg-transparent`} id="remove-profil">
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
    </Layout>
  );
}
export default Profile;
