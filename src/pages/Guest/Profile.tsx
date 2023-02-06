import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

import axios from "axios";

import { Layout } from "../../components/Layout";

function Profile() {
  const [cookie, setCookie, removeCookie] = useCookies();
  const [username, setUsername] = useState<string>("");
  const [user_image, setUserimage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const navigate = useNavigate();

  //edit profile
  const [newPreviewImage, setNewPreviewImage] = useState<any>();
  const [editFullname, setEditFullname] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editUsername, setEditUsername] = useState<string>("");
  const [editImageprofil, setEditImageprofil] = useState<any>();

  const handleEditImage = (file: any) => {
    setEditImageprofil(file);
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
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    };
    axios
      .get(`https://abiasa.site/users`, config)
      .then((res) => {
        console.log(res);
        const { email, fullname, username, user_image, message } =
          res.data.data;

        setEmail(email);
        setFullname(fullname);
        setUsername(username);
        setUserimage(user_image);
      })
      .catch((error) => {
        alert(error);
      });
  }
  console.log(user_image);
  function editProfil(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", editUsername);
    formData.append("fullname", editFullname);
    formData.append("email", editEmail);
    formData.append("user_image", editImageprofil);

    const config = {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    };
    axios
      .put(`https://abiasa.site/users`, formData, config)
      .then((res) => {
        console.log("update profil", res);
        Swal.fire({
          title: "Success",
          text: "Berhasil mengubah akun",
          showCancelButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(0);
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something Wrong Error",
        });
      });
  }

  function hapusAkun() {
    axios
      .delete(`https://abiasa.site/users`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })

      .then((res) => {
        removeCookie("token");
        removeCookie("username");
        removeCookie("fullname");
        removeCookie("email");
        removeCookie("user_image");
        Swal.fire({
          title: "Are you sure want to delete account?",

          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Yes",
          cancelButtonColor: "#d33",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              position: "center",
              icon: "success",
              text: "Delete successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            removeCookie("token");
            navigate("/");
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Delete account failed",
        });
      });
  }

  return (
    <Layout>
      <h1 id="profil-page" className="text-4xl p-5">
        Profile
      </h1>
      <div className="flex flex-col lg:flex-row justify-center items-center p-20">
        <div className="lg:w-1/3">
          <img
            className="rounded-full"
            src={
              user_image
                ? user_image
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
          />
        </div>
        <div className="bg-bgcard p-10 border-2 shadow-lg rounded-3xl lg:text-lg">
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
          <div className="flex gap-20 pt-5 pb-1">
            <form onSubmit={editProfil}>
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
                  <div className="flex py-2 w-full">
                    <label className="font-semibold text-black flex items-center justify-center w-1/3 text-center">
                      Full Name
                    </label>
                    <input
                      id="fullname-profil"
                      className="rounded-lg bg-white border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                      type="text"
                      placeholder={fullname}
                      value={editFullname}
                      onChange={(e) => setEditFullname(e.target.value)}
                    />
                  </div>
                  <div className="flex py-2 w-full">
                    <label className="font-semibold text-black flex items-center justify-center w-1/3 text-center">
                      User name
                    </label>
                    <input
                      id="username-profil"
                      className="rounded-lg bg-white border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                      type="text"
                      placeholder={username}
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                    />
                  </div>
                  <div className="flex py-2 w-full">
                    <label className="font-semibold text-black flex items-center justify-center w-1/3 text-center">
                      Email
                    </label>
                    <input
                      id="email-profil"
                      className="rounded-lg bg-white border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                      type="email"
                      placeholder={email}
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex py-2 w-full">
                    <label
                      htmlFor="edit-photo"
                      style={{ cursor: "pointer" }}
                      className="font-semibold text-black flex items-center justify-center w-1/3 text-center"
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
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <label className="normal-case bg-transparent" id="remove-profil">
              <div className="flex flex-col cursor-pointer">
                <div
                  className="w-1/2 text-lg mx-10 capitalize bg-btn border-none shadow-lg text-white font-semibold rounded-lg btn hover:bg-btnh"
                  onClick={() => hapusAkun()}
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
