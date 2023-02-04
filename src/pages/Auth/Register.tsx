import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../../components/Input";
import { Btn } from "../../components/Button";

function Register() {
  const [role, setRole] = useState("guest");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (username && fullname && email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, fullname, email, password]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      role,
      username,
      fullname,
      email,
      password,
    };

    axios
      .post("https://abiasa.site/register", body)
      .then((res) => {
        alert("Success signup");
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  console.log(role)

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
          <p className="my-1 font-bold text-lg">Register as</p>
          <select
            name="role"
            id="input-role"
            onChange={(e) => setRole(e.target.value)}
            className="bg-form w-full rounded-lg text-black p-3 border focus:outline-none focus:border-black"
          >
            <option id="guest" value="guest" selected>
              Guest
            </option>
            <option id="host" value="host">
              Host
            </option>
          </select>
          <Input
            id="input-username"
            title="Username"
            placeholder="Username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            id="input-fullname"
            title="Full Name"
            placeholder="Full Name"
            type="text"
            onChange={(e) => setFullname(e.target.value)}
          />
          <Input
            id="input-email"
            title="Email"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="input-password"
            title="Password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-sm pt-2">
            Already have an account?
            <Link
              id="direct-login"
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
