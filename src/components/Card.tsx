import { Link } from "react-router-dom";

import { Btn } from "./Button";
import { ImLocation } from "react-icons/im";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
interface CardRegProps {
  id?: number;
  image: string;
  campsite: string;
  price: number;
  loc: string;
  distance?: number;
  status?: string;
  deleteCamp?: () => void;
  path?: string;
  uname?: string;
}

export function CardReg({
  id,
  campsite,
  image,
  loc,
  price,
  distance,
  status,
  deleteCamp,
  path,
  uname,
}: CardRegProps) {
  return (
    <div className="flex flex-col bg-bgcard rounded-3xl shadow-lg max-w-xl">
      {path === "/camplist" ? (
        <>
          <img className="rounded-t-3xl h-3/4" src={image} alt={image} />
          <div className="flex justify-between p-4">
            <div className="flex flex-col">
              <h1>{campsite}</h1>
              <p className="flex items-center">
                <ImLocation /> {loc}
              </p>
              <br />
              <p>{distance} km away from the city centre</p>
            </div>
            <div className="flex flex-col justify-between">
              <h1>$ {price} /night</h1>
              <Link to={`/camp/${id}`}>
                <Btn id="btn-detail" label="Check!" />
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <Link className="h-3/4" id="detail-camphost" to={`/camp-host/${id}`}>
            <img className="rounded-t-3xl h-full" src={image} alt={image} />
          </Link>
          <div className="flex justify-between p-4">
            <div className="flex flex-col">
              <h1>{campsite}</h1>
              <p className="flex items-center">
                <ImLocation /> {loc}
              </p>
            </div>
            <div className="flex flex-col justify-between">
              <h1 id="camp-title">$ {price} /night</h1>
              <br />
              {status === "REJECTED" && (
                <p
                  id="status"
                  className="bg-red-600 text-bgcard text-center rounded-3xl p-2"
                >
                  {status}
                </p>
              )}
              {status === "ACCEPTED" && (
                <p
                  id="status"
                  className="bg-green-600 text-bgcard text-center rounded-3xl p-2"
                >
                  {status}
                </p>
              )}
              {status === "PENDING" && (
                <p
                  id="status"
                  className="bg-yellow-600 text-bgcard text-center rounded-3xl p-2"
                >
                  {status}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between text-4xl p-4">
            <Link id="btn-edit" to={`/edit-camp/${id}`}>
              <HiOutlinePencilAlt />
            </Link>
            <HiOutlineTrash
              id="btn-delete"
              className="text-btn cursor-pointer"
              onClick={deleteCamp}
            />
          </div>
        </>
      )}
    </div>
  );
}
interface CardLongProps {
  id: number;
  image: string;
  campsite: string;
  loc: string;
  checkin?: string;
  checkout?: string;
  address?: string;
  eticket?: string;
  totalprice?: number;
  status?: string;
  host?: string;
  price?: number;
  path?: string;
}

export function CardLong({
  campsite,
  image,
  loc,
  totalprice,
  checkin,
  checkout,
  eticket,
  status,
  price,
  address,
  host,
  id,
  path,
}: CardLongProps) {
  return (
    <div className="flex flex-col md:flex-row bg-bgcard rounded-3xl shadow-lg lg:w-[70vw] lg:h-[50vh] w-full">
      <img
        className="object-cover md:rounded-l-3xl md:w-2/3"
        src={image}
        alt={image}
      />
      {path === "/admin" ? (
        <div className="flex flex-col p-4 justify-evenly md:w-1/3">
          <div>
            <h1 className="lg:text-xl">{campsite}</h1>
            <p className="flex items-center">
              <ImLocation /> {loc}
            </p>
          </div>
          <div>
            <h1 className="lg:text-xl">Address</h1>
            <p>{address}</p>
          </div>
          <div>
            <h1 className="lg:text-xl">Host Name</h1>
            <p>{host}</p>
          </div>
          <div className="flex flex-row gap-2 justify-between items-center">
            <h1 className="lg:text-2xl">$ {price} /night</h1>
            <Link to={`/camp-admin/${id}`}>
              <Btn id="btn-check" className="w-18" label="Check" />
            </Link>
          </div>
        </div>
      ) : (
        <Link
          id="detail-history"
          to={`/booking/${id}`}
          className="flex flex-col p-4 justify-evenly lg:w-1/3 cursor-pointer"
        >
          <div>
            <h1 className="text-xl">{campsite}</h1>
            <p className="flex items-center">
              <ImLocation /> {loc}
            </p>
          </div>
          <div>
            <h1 className="text-xl">Dates</h1>
            <p>
              {checkin} - {checkout}
            </p>
          </div>
          <div>
            <h1 className="text-xl">E-Ticket</h1>
            <p>{eticket}</p>
          </div>
          <div className="flex justify-between">
            <h1 className="text-2xl text-end">$ {totalprice}</h1>
            {status === "CANCELLED" && (
              <p
                id="status"
                className="bg-red-600 text-bgcard text-center rounded-3xl p-2"
              >
                {status}
              </p>
            )}
            {status === "SUCCESS" && (
              <p
                id="status"
                className="bg-green-600 text-bgcard text-center rounded-3xl p-2"
              >
                {status}
              </p>
            )}
            {status === "PENDING" && (
              <p
                id="status"
                className="bg-yellow-600 text-bgcard text-center rounded-3xl p-2"
              >
                {status}
              </p>
            )}
          </div>
        </Link>
      )}
    </div>
  );
}
