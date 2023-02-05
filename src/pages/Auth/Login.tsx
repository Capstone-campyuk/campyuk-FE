import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Input } from "../../components/Input";
import { Btn, Btns } from "../../components/Button";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "token",
    "role",
  ]);

  useEffect(() => {
    if (username && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, password]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      username,
      password,
    };

    axios
      .post("https://abiasa.site/login", body)
      .then((res) => {
        console.log(res.data.data);
        setCookie("username", res.data.data.username);
        setCookie("token", res.data.token, { path: "/" });
        setCookie("role", res.data.data.role, { path: "/" });

        alert("Success login");
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className="flex min-h-screen items-center">
      <div
        className="hero w-1/2 h-screen hidden lg:block"
        style={{
          backgroundImage: `url(bg-login.jpg)`,
        }}
      >
        <span className="hero-overlay bg-opacity-60" />
      </div>
      <div className="mx-auto bg-bgcard w-full max-h-[550px] max-w-md rounded-3xl p-5 my-10 shadow-lg">
        <h1 id="login-page" className="text-3xl text-center mb-10">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            id="input-username"
            title="Username"
            placeholder="Username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            id="input-password"
            title="Password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Btn
            id="btn-login"
            disabled={disabled}
            className="my-3 mt-10"
            label="Login"
          />
        </form>
        <p className="text-center">Or</p>
        <Link to="/register">
          <Btns id="btn-register" className="my-3" label="Register" />
        </Link>
      </div>
    </div>
  );
}

export default Login;
