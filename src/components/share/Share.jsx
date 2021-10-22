import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import { useState } from "react";
import {axiosInstance} from '../../api/axios';
import {useGlobalState} from '../../state/provider'

export default function Share() {
  const [{profile}] = useGlobalState();
  const [showSpiner, setShowSpiner] = useState(false);
  const [shareShow, setShareShow] = useState(false);
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0]

    if(image === '' || image === undefined){
        alert(`Not an image, the file is a ${typeof{ image }}`);
        return;
    }
    setShareImage(image)
  }

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setShareShow(!shareShow)
  }

  const postUpload = async(e) => {
    setShowSpiner(!showSpiner)
    const fd = new FormData();
    fd.append("title", editorText)
    fd.append("user", profile.id)
    fd.append("post", shareImage, shareImage.name)
    await axiosInstance.post(`/post/`, fd)
      .then(async(res) => {
        console.log(res.data)
        reset()
        setShareShow(false)
        window.location.reload();
        setShowSpiner(!showSpiner)
        
      })
  }

  return (
    <>
      <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={`http://127.0.0.1:8000${profile?.avatar}`} alt="" />
          <input onFocus={(e) => setShareShow(true)}
            placeholder={`What's in your mind ${profile?.username}?`}
            className="shareInput"
          />
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span onClick={(e) => setShareShow(true)} className="shareOptionText">Photo or Video</span>
                </div>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton">Share</button>
        </div>
      </div>

      {shareShow && (
        <div className="postX">
          <div className="content">
            <div className="header">
              <h2>Create a Post</h2>
              <button onClick={reset} className="HeaderButton">
                X
              </button>
            </div>
            <div className="sharedContent">
              <div className="userInfo">
                <img style={{width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover"}} src={`http://127.0.0.1:8000${profile?.avatar}`} alt="" />
                <span>{profile?.username}</span>
              </div>
              <div className="editor">
                <textarea value={editorText} onChange={(e) => setEditorText(e.target.value)}
                placeholder="What do you want to talk about?" autoFocus={true} />
                </div>
                <div className="uploadImage">
                  <input type="file" 
                  name="image"
                  id="file"
                  onChange={handleChange}
                  style={{display: "none"}}
                  accept="image/gif, image/jpeg, image/png, image/jpg"
                  />
                  <p>
                    <label htmlFor="file">Select an <b style={{color: "#0a66c2", cursor: "pointer"}}>image</b> to share</label>
                  </p>
                  {shareImage && <img style={{width: "350px", 
                  height: "350px", objectFit: "contain", borderRadius: "5px"}} 
                  src={URL.createObjectURL(shareImage)} alt="" />}
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
              <button onClick={postUpload} className="PostButton">
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    {showSpiner && (
      <div className="spiner">
      <img src="/assets/walk.gif" alt="" />
    </div>
    )}
    </>
  );
}
