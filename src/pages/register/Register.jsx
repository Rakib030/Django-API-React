import "./register.css";
import { axiosMain } from "../../api/axios";
import {Link} from 'react-router-dom';
import { useState } from "react";

export default function Register() {
  const [showSpiner, setShowSpiner] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const signupHandle = (e) => {
    setShowSpiner(!showSpiner)
    if(password1 === password2){
      
      axiosMain.post(`/api/user/`, {
        "email": email,
        "password": password1,
        "username": username
      })
        .then((res) => {
          localStorage.setItem("token", res.data)
          console.log(res.data)
          window.location.reload();
          setShowSpiner(!showSpiner)
        })
        .catch((err) => {
          console.log(err)
          window.location.reload();
          setShowSpiner(!showSpiner)
        })
    }else{
      alert("Password Doesn't Match. \n Please try again.")
    }
  }
  return (
    <>
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
              <input onChange={e => setUsername(e.target.value)} placeholder="Username" className="loginInput" />
              <input onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" className="loginInput" />
              <input onChange={e => setPassword1(e.target.value)} placeholder="Password" type="password" className="loginInput" />
              <input onChange={e => setPassword2(e.target.value)} placeholder="Password Again" type="password" className="loginInput" />
              <button onClick={signupHandle} className="loginButton">Sign Up</button>
              <Link to="/login">
              <button className="loginRegisterButton">
                Log into Account
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
    </>
  );
}
