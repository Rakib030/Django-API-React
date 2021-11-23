import "./login.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInitial } from "../../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    await axiosInitial.post("/api/user/login/", {
      email: email,
      password: password
    }).then(res => {
      console.log(res.data);
      localStorage.setItem("token", res.data);
      window.location.reload();
    })
  }
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <input type="text" onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <button onClick={signIn} className="loginButton">Sign In</button>
          <Link to="/register">
            <span>
              New to Netflix? <b style={{cursor: "pointer"}}>Sign up now.</b>
            </span>
          </Link>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
