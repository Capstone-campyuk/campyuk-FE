import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

import { Layout } from "../../components/Layout";
import Swal from "../../utils/Swal";

function Profile() {
  const [cookie, setCookie, removeCookie] = useCookies([
    "token",
    "username",
    "role",
  ]);

  const [newPreviewImage, setNewPreviewImage] = useState<any>();
  const [username, setUsername] = useState<string>("");
  const [user_image, setUserimage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleEditImage = (file: any) => {
    setUserimage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setNewPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    getProfil();
  }, []);

  function getProfil() {
    axios
      .get(`https://abiasa.site/users`)
      .then((res) => {
        const { email, fullname, username, user_image } = res.data.data;

        setEmail(email);
        setFullname(fullname);
        setUsername(username);
        setUserimage(user_image);
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          text: err.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      });
  }

  function updateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    if (username) {
      formData.append("username", username);
    }
    if (fullname) {
      formData.append("fullname", fullname);
    }
    if (email) {
      formData.append("email", email);
    }
    if (user_image) {
      formData.append("user_image", user_image);
    }
    axios
      .put(`https://abiasa.site/users`, formData)
      .then((res) => {
        MySwal.fire({
          title: "Success",
          text: "Update profile success",
          showCancelButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(0);
          }
        });
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          text: err.data.message,
          title: "Oops...",
          showCancelButton: false,
        });
      });
  }

  function deleteAcc() {
    MySwal.fire({
      title: "Are you sure want to delete account?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://abiasa.site/users`)
          .then(() => {
            MySwal.fire({
              position: "center",
              icon: "success",
              text: "Delete successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            removeCookie("token");
            removeCookie("username");
            removeCookie("role");
            navigate("/login");
          })
          .catch(() => {
            MySwal.fire({
              icon: "error",
              title: "Oops...",
              text: "Delete account failed",
            });
          });
      }
    });
  }

  return (
    <Layout>
      <h1 id="profil-page" className="text-4xl p-5">
        Profile
      </h1>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:p-20">
        <div className="lg:w-1/3">
          <img
            className="rounded-full object-cover w-[300px] h-[300px]"
            src={
              user_image
                ? user_image
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
          />
        </div>
        <div className="lg:bg-bgcard p-10 shadow-lg rounded-3xl max-w-[100vw] lg:text-lg">
          <div className="flex gap-10 pt-5 pb-1">
            <h1>Full Name </h1>
            <p>: {fullname}</p>
          </div>
          <div className="flex gap-7 pt-5 pb-1">
            <h1>User Name </h1>
            <p>: {username}</p>
          </div>
          <div className="flex gap-20 pt-5 pb-1">
            <h1>Email </h1>
            <p>: {email}</p>
          </div>
          <div className="flex lg:gap-20 pt-5 pb-1">
            <label
              id="update-profil"
              htmlFor="my-modal-1"
              className="normal-case bg-transparent"
            >
              <div className="flex flex-col cursor-pointer">
                <div className="w-1/2 text-lg mx-10 capitalize bg-btn border-none shadow-lg text-white font-semibold rounded-lg btn hover:bg-btnh">
                  Update
                </div>
              </div>
            </label>

            <input type="checkbox" id="my-modal-1" className="modal-toggle" />
            <div className="modal modal-middle sm:modal-middle">
              <div className="modal-box bg-white  flex flex-col justify-center items-center">
                <h3 className="font-bold lg:text-2xl  text-base text-black text-center  ">
                  Update Profile
                </h3>
                <form onSubmit={updateProfile} encType="multipart/form-data">
                  <div className="flex py-2 w-full">
                    <label className="font-semibold text-black flex items-start justify-start w-1/2 text-start">
                      Full Name
                    </label>
                    <input
                      id="fullname-profil"
                      className="rounded-lg bg-white border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                      type="text"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                  <div className="flex py-2 w-full">
                    <label className="font-semibold text-black flex items-start justify-start w-1/2 text-start">
                      User name
                    </label>
                    <input
                      id="username-profil"
                      className="rounded-lg bg-white border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="flex py-2 w-full">
                    <label className="font-semibold text-black flex items-start justify-start w-1/2 text-start">
                      Email
                    </label>
                    <input
                      id="email-profil"
                      className="rounded-lg bg-white border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex py-2 w-full">
                    <label
                      htmlFor="edit-photo"
                      style={{ cursor: "pointer" }}
                      className="font-semibold text-black flex items-start justify-start w-1/2 text-start"
                    >
                      Upload image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      id="edit-photo"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        if (!e.target.files) return;
                        handleEditImage(e.target.files[0]);
                      }}
                    />
                    <img
                      src={newPreviewImage}
                      alt=""
                      width={200}
                      height={100}
                    />
                  </div>
                  <div className="grid grid-cols-2 w-2/3 md:w-full lg:w-full max-w-md mt-3">
                    <label
                      htmlFor="my-modal-1"
                      className="btn bg-btn normal-case border-none mx-1 hover:btnh text-white"
                    >
                      Cancel
                    </label>

                    <button
                      type="submit"
                      className="btn bg-btn normal-case  border-none mx-1 hover:btnh text-white"
                      onClick={() => updateProfile}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <label className="normal-case bg-transparent" id="remove-profil">
              <div className="flex flex-col cursor-pointer">
                <div
                  className="w-1/2 text-lg mx-10 capitalize bg-btn border-none shadow-lg text-white font-semibold rounded-lg btn hover:bg-btnh"
                  onClick={() => deleteAcc()}
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
