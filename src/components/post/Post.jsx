import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useEffect, useState } from "react";
import {axiosInstance} from '../../api/axios';
import {useGlobalState} from '../../state/provider';

export default function Post({ post }) {
  const [{profile}] = useGlobalState();
  const [textComment, setTextComment] = useState("");
  const [comment, setComment] = useState(false);
  const [comments, setComments] = useState();

  useEffect(() => {
    const fetchComments = async() => {
      await axiosInstance.get(`/post/comments/${post?.id}/`)
        .then((res) => {
          console.log(res.data)
          setComments(res.data)
        })
    }
    fetchComments();
  }, [post?.id])

  const commentPost = async() => {
    await axiosInstance.post(`/post/comments/${post?.id}/`,{
      user: profile?.id,
      userpost: post?.id,
      body: textComment
    })
    .then( async(res) => {
      console.log(res.data)
      await axiosInstance.get(`/post/comments/${post?.id}/`)
        .then((res) => {
          console.log(res.data)
          setComments(res.data)
          setTextComment("")
        })
    })
  }

  const likeHandler = async()=>{
      await axiosInstance.post(`/post/react/${post.id}/`, {
        "react": 1
      })
        .then((res) => window.location.reload())
  }
  return (
    <>
      <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src= {`http://127.0.0.1:8000${post?.profile?.avatar}`}
              className="postProfileImg"
              alt=""
            />
            <span className="postUsername">
              {post?.profile?.username}
            </span>
            <span className="postDate">{post?.get_created}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.title}</span>
          <img className="postImg" 
          src={`http://127.0.0.1:8000${post?.post}`} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
            <img id="likeIcon" className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter"> {post?.react} people like it</span>
          </div>
          <div className="postBottomRight">
            <span onClick={(e) => setComment(!comment)} className="postCommentText">
              <img style={{width: "25px", height: "25px", objectFit: "cover"}} src="/assets/comments.png" alt="" />
            </span>
          </div>
        </div>
      </div>
    </div>
    {comment && (
      <div className="comment">
        <div className="commentContent">

          {comments?.comments?.map((comment) => (
            <div key={comment.id} className="userComment">
              <img style={{width: "30px", height: "30px", objectFit: "cover", borderRadius: "50%"}}  
              src={`http://127.0.0.1:8000${comment?.profile?.avatar}`} alt="" />
              <div className="commentInfo">
                <h6>{comment?.profile?.username}</h6>
                <h5>{comment.body}</h5>
              </div>
            </div>
          ))}
        
          <div className="commentBox">
            <textarea value={textComment}  onChange={(e) => setTextComment(e.target.value)}
                placeholder="Write your comment here." autoFocus={true} />
            <button onClick={commentPost}>Submit</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
