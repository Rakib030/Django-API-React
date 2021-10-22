import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useGlobalState } from "../../state/provider";
import { useState } from "react";
import { axiosInstance } from "../../api/axios";

export default function Profile() {
  const [{profile}] = useGlobalState();
  const [showSpiner, setShowSpiner] = useState(false);
  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [updateImage, setUpdateImage] = useState(profile?.avatar);
  const [username, setUsername] = useState(profile?.username);

  const handleBox = () => {
    setShowUpdateBox(!showUpdateBox)
    setUpdateImage("")
  }

  const update = async() => {
    setShowSpiner(!showSpiner)
    const fd = new FormData();
    fd.append("username", username)
    fd.append("avatar", updateImage, updateImage.name)
    await axiosInstance.put(`/update-get/user/${profile?.id}/`, fd)
      .then((res) => {
        console.log(res.data)
        window.location.reload()
        setShowSpiner(!showSpiner)
      })
  }

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="assets/post/3.jpeg"
                alt=""
              />
              <div className="profileSet">
              <img className="profileUserImg"
                src={`http://127.0.0.1:8000${profile?.avatar}`}
                alt="" 
              />
              <img onClick={handleBox} className="camera" src="/assets/photo.svg" alt="" />
              </div>
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{profile?.username}</h4>
                <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed profile={true} />
            <Rightbar profil />
          </div>
        </div>
      </div>

      {
        showUpdateBox && (
          <div className="postX">
            <div className="content">
              <div className="header">
                <h2>Update Your Profile</h2>
                <button onClick={handleBox} className="HeaderButton">
                  X
                </button>
              </div>
              <div className="sharedContent">
                <div className="userInfo">
                  <img style={{width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover"}} src={`http://127.0.0.1:8000${profile?.avatar}`} alt="" />
                  <span>{profile?.name}</span>
                </div>
                <div className="editor">
                  <input placeholder="Your Username" value={username} onChange={(e) => setUsername(e.target.value)}
                    style={{outline: "none", border: "2px solid #0a66c2", padding: "5px", borderRadius: "5px"}}
                    type="text" />
                  </div>
                  <div className="uploadImage">
                    <input type="file" 
                    name="image"
                    id="file"
                    onChange = {(e) => setUpdateImage(e.target.files[0])}
                    style={{display: "none"}}
                    accept="image/gif, image/jpeg, image/png, image/jpg"
                    />
                    <p>
                      <label htmlFor="file">Select an <b style={{color: "#0a66c2", cursor: "pointer"}}>image</b> to Profile</label>
                    </p>
                    {updateImage && <img style={{width: "350px", 
                    height: "350px", objectFit: "contain", borderRadius: "5px"}} 
                    src={URL.createObjectURL(updateImage)} alt="" />}
                </div>
              </div>
              <div className="ShareCreation">
                <div className="AttachAssets">
                  <button className="AssetButton">
                    <img onClick={e => document.getElementById("file").click()} src="/assets/facebook.png" alt="" />
                  </button>
                  <button className="AssetButton">
                    <img onClick={e => document.getElementById("file").click()} src="/assets/gallery.png" alt="" />
                  </button>
                </div>
                <button onClick={update} className="PostButton">
                  Update
                </button>
              </div>
            </div>
          </div>
        )
      }
      {showSpiner && (
        <div className="spiner">
        <img src="/assets/walk.gif" alt="" />
      </div>
      )}
      
    </>
  );
}
