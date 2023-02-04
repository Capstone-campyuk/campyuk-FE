import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { Btn } from "./Button";
import {
  IoIosPerson,
  IoMdMenu,
  IoIosBookmark,
  IoIosCompass,
} from "react-icons/io";

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
  const [cookie, setCookie, removeCookie] = useCookies([
    "id",
    "username",
    "token",
  ]);
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeCookie("id");
    removeCookie("username");
    removeCookie("token");
    alert("You've been log out");
    navigate("/");
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
            <Link
              id="btn-profile"
              to={`/profile/:id-username`}
              className="flex items-center gap-2"
            >
              <IoIosPerson className="text-2xl" />
              <a>Profile</a>
            </Link>
            <Link
              id="btn-booking"
              to="/booking-history"
              className="flex items-center gap-2"
            >
              <IoIosBookmark className="text-2xl" />
              <a>My Booking</a>
            </Link>
            <Link
              id="btn-camp"
              to="/camplist"
              className="flex items-center gap-2"
            >
              <IoIosCompass className="text-2xl" />
              <a>Camp Site</a>
            </Link>
          </ul>
        </div>
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
      </div>
      <div className="navbar-end hidden lg:flex ">
        <ul className="flex gap-8">
          <Link
            id="btn-profilelg"
            to={`/profile/:id-username`}
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
        </ul>
      </div>
      <div className="navbar-end lg:max-w-[120px]">
        <Btn
          id="logout"
          onClick={handleLogOut}
          className="max-w-[90px]"
          label={"Logout"}
        />
      </div>
    </div>
  );
}
