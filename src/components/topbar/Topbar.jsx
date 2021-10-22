import "./topbar.css";
import {Link} from 'react-router-dom';
import { axiosInstance } from '../../api/axios'
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useState } from "react";
import { useGlobalState } from '../../state/provider'

export default function Topbar() {
  const [showSpiner, setShowSpiner] = useState(false);
  const [{profile}, dispatch] = useGlobalState();
  const [showAction, setShowAction] = useState(false);

  const logoutHandle = async() => {
    await axiosInstance.post(`/rest-auth/logout/`)
      .then((res) => {
        console.log(res.data)
        localStorage.clear("token")
        setShowSpiner(!showSpiner)
        dispatch({
          type: "LOGIN_PROFILE",
          profile: null
        })
      })
  }

  return (
    <>
      <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
        <span className="logo">@RAKIB'S</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/">
          <span style={{marginLeft: "50px"}} className="topbarLink">Homepage</span>
          </Link>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
          <div>
          <img onClick={(e) => setShowAction(!showAction)} src={`http://127.0.0.1:8000${profile?.avatar}`} alt="" className="topbarImg"/>
          {showAction && (
            <div className="action">
              <ul>
                <Link to="/profile">
                  <li>Profile</li>
                </Link>

                <Link to="/profile">
                  <li>Settings</li>
                </Link>

                <li onClick={logoutHandle}>Logout</li>
              </ul>
            </div>
          )}
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
