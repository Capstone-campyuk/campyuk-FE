import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Btn } from "./Button";
import { ImLocation } from "react-icons/im";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { GiCampingTent } from "react-icons/gi";

interface CardCampProps {
  image: string;
  campsite: string;
  price: number;
  loc: string;
  distance: number;
}

export function CardCampList({
  campsite,
  image,
  loc,
  price,
  distance,
}: CardCampProps) {
  const navigate = useNavigate();
  const onClickDetail = () => {
    navigate(`/detail/:id_camp`);
  };
  return (
    <div className="flex flex-col bg-bgcard border-2 rounded-3xl shadow-lg max-w-2xl">
      <img className="rounded-t-3xl" src={image} alt={image} />
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
          <Btn
            label="Check!"
            onClick={() => {
              onClickDetail();
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface CardCampLongProps {
  image: string;
  campsite: string;
  loc: string;
  checkin: string;
  checkout: string;
  eticket: string;
  totalprice: number;
}

export function CardCampLong({
  campsite,
  image,
  loc,
  totalprice,
  checkin,
  checkout,
  eticket,
}: CardCampLongProps) {
  const navigate = useNavigate();
  const onClickDetail = () => {
    navigate(`/booking-detail/:id_booking`);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-bgcard border-2 rounded-3xl shadow-lg">
      <img
        className="rounded-t-2xl lg:rounded-l-3xl lg:w-2/3"
        src={image}
        alt={image}
      />
      <div
        className="flex flex-col p-4 justify-evenly lg:w-1/3 cursor-pointer"
        onClick={() => {
          onClickDetail();
        }}
      >
        <div>
          <h1 className="text-2xl">{campsite}</h1>
          <p className="flex items-center">
            <ImLocation /> {loc}
          </p>
        </div>
        <div>
          <h1 className="text-2xl">Dates</h1>
          <p>
            {checkin} - {checkout}
          </p>
        </div>
        <div>
          <h1 className="text-2xl">E-Ticket</h1>
          <p>{eticket}</p>
        </div>
        <h1 className="text-3xl text-end">$ {totalprice}</h1>
      </div>
    </div>
  );
}

interface CardHostProps {
  image: string;
  campsite: string;
  loc: string;
  price: number;
  status: string;
}

export function CardHost({
  campsite,
  image,
  loc,
  price,
  status,
}: CardHostProps) {
  const navigate = useNavigate();
  const onClickDetail = () => {
    navigate(`/detail-camp-host/:id_camp`);
  };
  return (
    <div className="flex flex-col bg-bgcard border-2 rounded-3xl shadow-lg max-w-2xl">
      <img className="rounded-t-3xl" src={image} alt={image} />
      <div className="flex justify-between p-4">
        <div className="flex flex-col">
          <h1>{campsite}</h1>
          <p className="flex items-center">
            <ImLocation /> {loc}
          </p>
        </div>
        <div className="flex flex-col justify-between">
          <h1>$ {price} /night</h1>
          <br />
          <p className="bg-primary text-bgcard text-center rounded-3xl p-2">
            {status}
          </p>
        </div>
      </div>
      <div className="flex justify-between text-4xl p-4">
        <HiOutlinePencilAlt />
        <GiCampingTent />
        <HiOutlineTrash className="text-btn" />
      </div>
    </div>
  );
}
