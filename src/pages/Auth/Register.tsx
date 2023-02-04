import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../../components/Input";
import { Btn } from "../../components/Button";

function Register() {
  const [formRegister, setFormRegister] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    role: "",
  });
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormRegister({
      ...formRegister,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (
      formRegister.fullname &&
      formRegister.username &&
      formRegister.email &&
      formRegister.password &&
      formRegister.role
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formRegister]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("https://-/register", formRegister)
      .then(() => {
        alert("Success signup");
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className="flex min-h-screen items-center">
      <div
        className="hero w-1/2 min-h-screen hidden lg:block"
        style={{
          backgroundImage: `url(bg-register.jpg)`,
        }}
      >
        <span className="hero-overlay bg-opacity-60" />
      </div>
      <div className="mx-auto bg-bgcard w-full max-w-md rounded-3xl p-5 my-5 shadow-lg">
        <h1 id="register-page" className="text-3xl text-center mb-10">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            id="input-username"
            title="Username"
            placeholder="Username"
            type="text"
            onChange={handleChange}
            value={formRegister.username}
          />
          <Input
            id="input-fullname"
            title="Full Name"
            placeholder="Full Name"
            type="text"
            onChange={handleChange}
            value={formRegister.fullname}
          />
          <Input
            id="input-email"
            title="Email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            value={formRegister.email}
          />
          <Input
            id="input-password"
            title="Password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            value={formRegister.password}
          />
          <p className="my-1 font-bold text-lg">Register as</p>
          <select
            name="role"
            id="input-role"
            className="bg-form w-full rounded-lg text-black p-3 border focus:outline-none focus:border-black"
          >
            <option id="guest" value="guest">
              Guest
            </option>
            <option id="host" value="host">
              Host
            </option>
          </select>
          <p className="text-sm pt-2">
            Already have an account?
            <Link
              id="btn-login"
              className="text-blue-700 font-bold ml-1"
              to="/login"
            >
              login
            </Link>
          </p>
          <Btn
            id="btn-register"
            disabled={disabled}
            className="my-10"
            label="Register"
          />
        </form>
      </div>
    </div>
  );
}

export default Register;
