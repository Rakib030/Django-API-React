import Post from "../post/Post";
import Share from "../share/Share";
import { useState, useEffect } from "react";
import "./feed.css";
import { axiosInstance } from '../../api/axios'


export default function Feed({profile}) {
  const [posts, setPosts] = useState();
  const [userPosts, setUserPosts] = useState();

  useEffect(() => {
    const fetchUserPost = async () => {
      await axiosInstance.get(`/user/profile/`)
        .then((res) => {
          setUserPosts(res.data.user_post)
        })
    }

    const fetchPost = async () => {
      await axiosInstance.get(`/post/`)
        .then((res) => {
          setPosts(res.data)
        })
    }
    fetchPost();
    fetchUserPost();
  }, [])
  
  return (
    <>
      {!profile ? (
        <div className="feed">
        <div className="feedWrapper">
          <Share />
          {posts?.map((p) => (
            <Post key={p.id} post={p} />
          ))}
        </div>
      </div>
      )
      : (
        <div className="feed">
        <div className="feedWrapper">
          <Share />
          <h2
            style={{marginTop: "20px", marginLeft: "140px", color: "#0a66c2", fontWeight: "100"}}
          >Your Uploaded Post.</h2>
          {userPosts?.map((p) => (
            <Post key={p.id} post={p} />
          ))}
        </div>
      </div>
      )
    }
    </>
  );
}
