import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2/src/sweetalert2.js";
import { Btn } from "./Button";
import {
  IoIosPerson,
  IoMdMenu,
  IoIosBookmark,
  IoIosCompass,
} from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";

export function NavbarGuest() {
  return (
    <nav className="navbar bg-primary text-white p-5">
      <Link
        id="btn-home"
        to="/"
        className="navbar-start items-center gap-2"
      >
        <h1 className="font-extrabold antialiased text-2xl">
          campyuk
        </h1>
        <img
          src="https://i.im.ge/2023/02/02/a1ukPX.logo.png"
          alt="icon"
          className="w-7"
        />
      </Link>
      <div className="navbar-end">
        <Link to="/login">
          <Btn id="btn-login" label={"Login"} />
        </Link>
      </div>
    </nav>
  );
}

export function NavbarLogin() {
  const [isGuest, setIsGuest] = useState(true);
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies([
    "username",
    "token",
    "role",
  ]);

  const checkRole = cookie.role;

  useEffect(() => {
    if (cookie.role === "guest") {
      setIsGuest(true);
    } else setIsGuest(false);
  }, [isGuest]);

  const handleLogOut = () => {
    removeCookie("username");
    removeCookie("token");
    removeCookie("role");

    Swal.fire({
      title: "You've been Log Out",
      showCancelButton: false,
    });

    navigate("/login");
  };

  return (
    <div className="navbar bg-primary text-white p-5">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <IoMdMenu id="btn-menu" className="text-3xl" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content mt-3 p-2 shadow bg-primary rounded-box w-52"
          >
            {isGuest ? (
              <>
                <Link
                  id="btn-profilelg"
                  to={`/profile/${cookie.username}`}
                  className="flex items-center gap-2"
                >
                  <IoIosPerson className="text-2xl" />
                  <a>Profile</a>
                </Link>
                <Link
                  id="btn-bookinglg"
                  to="/booking-history"
                  className="flex items-center gap-2"
                >
                  <IoIosBookmark className="text-2xl" />
                  <a>My Booking</a>
                </Link>
                <Link
                  id="btn-camplg"
                  to="/camplist"
                  className="flex items-center gap-2"
                >
                  <IoIosCompass className="text-2xl" />
                  <a>Camp Site</a>
                </Link>
              </>
            ) : (
              <>
                <Link
                  id="btn-camplg"
                  to="/camplist"
                  className="flex items-center gap-2"
                >
                  <IoIosCompass className="text-2xl" />
                  <a>Camp Site</a>
                </Link>
              </>
            )}
          </ul>
        </div>

        {checkRole === "guest" || checkRole === "" ? (
          <Link
            id="btn-home"
            to="/"
            className="flex items-center gap-2"
          >
            <h1 className="font-extrabold antialiased text-2xl">
              campyuk
            </h1>
            <img
              src="https://i.im.ge/2023/02/02/a1ukPX.logo.png"
              alt="icon"
              className="w-7"
            />
          </Link>
        ) : (
          <></>
        )}

        {checkRole === "host" ? (
          <Link
            id="btn-home"
            to={`/host/${cookie.username}`}
            className="flex items-center gap-2"
          >
            <h1 className="font-extrabold antialiased text-2xl">
              campyuk
            </h1>
            <img
              src="https://i.im.ge/2023/02/02/a1ukPX.logo.png"
              alt="icon"
              className="w-7"
            />
          </Link>
        ) : (
          <></>
        )}

        {checkRole === "admin" ? (
          <Link
            id="btn-home"
            to="/admin"
            className="flex items-center gap-2"
          >
            <h1 className="font-extrabold antialiased text-2xl">
              campyuk
            </h1>
            <img
              src="https://i.im.ge/2023/02/02/a1ukPX.logo.png"
              alt="icon"
              className="w-7"
            />
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div className="navbar-end hidden lg:flex ">
        <ul className="flex gap-8">
          {isGuest ? (
            <>
              <Link
                id="btn-profilelg"
                to={`/profile/${cookie.username}`}
                className="flex items-center gap-2"
              >
                <IoIosPerson className="text-2xl" />
                <a>Profile</a>
              </Link>
              <Link
                id="btn-bookinglg"
                to="/booking-history"
                className="flex items-center gap-2"
              >
                <IoIosBookmark className="text-2xl" />
                <a>My Booking</a>
              </Link>
              <Link
                id="btn-camplg"
                to="/camplist"
                className="flex items-center gap-2"
              >
                <IoIosCompass className="text-2xl" />
                <a>Camp Site</a>
              </Link>
            </>
          ) : (
            <>
              <Link
                id="btn-addcamp"
                to="/addcamp"
                className="flex items-center gap-2"
              >
                <BsPencilSquare className="text-2xl" />
                <a>Add Camp</a>
              </Link>
              <Link
                id="btn-camplg"
                to="/camplist"
                className="flex items-center gap-2"
              >
                <IoIosCompass className="text-2xl" />
                <a>Camp Site</a>
              </Link>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end lg:max-w-[120px]">
        <Btn
          id="logout"
          // onClick={(e) => handleLogOut(e)}
          onClick={handleLogOut}
          className="max-w-[90px]"
          label={"Logout"}
        />
      </div>
    </div>
  );
}
