import { useState } from "react";
import {axiosMain} from '../../api/axios';
import {Link} from 'react-router-dom';
import "./login.css";

export default function Login() {
  const [showSpiner, setShowSpiner] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    setShowSpiner(!showSpiner)
    const fd = new FormData();
    fd.append("email", email)
    fd.append("password", password)
    axiosMain.post(`/api/login/`, fd)
      .then(res => {
        localStorage.setItem("token", res.data)
        console.log(res.data)
        window.location.reload()
        setShowSpiner(!showSpiner)
      })
      .catch(err => {
        setShowSpiner(!showSpiner)
        console.log(err.data)
      })
  }
  
  return (
    <div>
      <div style={{
      backgroundImage: "url(/assets/add.jpg)", 
      top: "0", left: "0", zIndex: "9999", position: "fixed",
         }} className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 style={{color: "rgba(0, 0, 0, 0.8)"}} className="loginLogo">@RAKIB'S</h3>
            <span style={{color: "rgba(0, 0, 0, 0.8)"}} className="loginDesc">
              Connect with friends and the world around you on Lamasocial.
            </span>
          </div>
          <div className="loginRight">
            <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}} className="loginBox">
              <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="loginInput" />
              <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="loginInput" />
              <button onClick={handleLogin} className="loginButton">Log In</button>
              <span className="loginForgot">Forgot Password?</span>
              <Link to="/register">
                <button className="loginRegisterButton">
                  Create a New Account
                </button>
              </Link>
            </div>
          </div>
        </div>
    </div>
    {showSpiner && (
      <div className="spiner">
      <img src="/assets/walk.gif" alt="" />
    </div>
    )}
    </div>
  );
}
