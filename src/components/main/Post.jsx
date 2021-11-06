import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {useGlobalState} from '../../state/provider';
import {axiosInstance} from '../../api/axios';
import { Article, SharedActor, Description, SharedImg, SocialCounts, SocialActions} from './MainStyle';

function Post({post}) {
    const [{profile}] = useGlobalState();
    const [likes, setLikes] = useState();
    const [comment, setComment] = useState(false);
    const [comments, setComments] = useState();
    const [commentText, setCommentText] = useState("");

    const commentPost = async() => {
        await axiosInstance.post(`/user/post/comment/${post.id}/`,{
            owner: profile.id,
            post_select: post.id,
            body: commentText
        }).then(async(res) => {
            setCommentText("");
            await axiosInstance.get(`/user/post/comment/${post.id}/`)
                .then(res => {
                    setComments(res.data)
                })
        })
    }

    const likePost = async() => {
        await axiosInstance.post(`/user/post/like/${post.id}/`)
            .then(async(res) => {
                await axiosInstance.get(`/user/post/like/${post.id}/`)
                    .then(res => {
                        setLikes(res.data)
                    })
            })
    }

    useEffect(()=>{
        const fetchLikes = async() => {
            const res = await axiosInstance.get(`/user/post/like/${post.id}/`)
            setLikes(res.data);
            console.log(res.data)
        }

        const fetchComments = async() => {
            const res = await axiosInstance.get(`/user/post/comment/${post.id}/`)
            setComments(res.data)
        }
        fetchComments();
        fetchLikes();
    }, [post?.id])
    console.log(likes)

    return (
        <>
            <Article>
                <SharedActor>
                    <Link to="/">
                        <img style={{objectFit: "cover"}} src={`http://127.0.0.1:8000${post.profile.avatar}`} alt="" />
                        <div>
                            <span>{post.profile.username}</span>
                            <span>{post.title}</span>
                            <span>{post.get_created}</span>
                        </div>
                    </Link>
                    <button>
                        {/* <MoreVert /> */}
                    </button>
                </SharedActor>
                <Description>
                    {post.description}
                </Description>
                <SharedImg>
                    <Link>
                        <img src={`http://127.0.0.1:8000${post.body}`} alt="" />
                    </Link>
                </SharedImg>

                <SocialCounts>
                    <li>
                        <button>
                            <img src="/images/like.png" alt="" />
                            <img src="/images/heart.png" alt="" />
                            <img src="/images/share.png" alt="" />
                            <span>{likes?.is_liked}</span>
                        </button>
                    </li>
                    <li>
                        <Link to="/">
                            {comments?.length} Comment's
                        </Link>
                    </li>
                </SocialCounts>
                <SocialActions >
                    <button onClick={likePost}>
                        <img src="/images/like1.png" alt="" />
                        {!likes?.is_like? <span>Like</span> : <span style={{color: "red"}}>Unlike</span>}
                    </button>
                    <button onClick={e => setComment(!comment)}>
                        <img src="/images/comments.png" alt="" />
                        <span>Comments</span>
                    </button>
                    <button>
                        <img src="/images/share.png" alt="" />
                        <span>Share</span>
                    </button>
                    <button>
                        <img src="/images/send.png" alt="" />
                        <span>Send</span>
                    </button>
                </SocialActions>
                {comment && (
                    <Comments>
                        
                        {comments.map((comment) => (
                            <Comment>
                                <img src={`http://127.0.0.1:8000${comment.profile.avatar}`} alt="" />
                                <Body>
                                    <span>{comment.profile.username}</span>
                                    <p>{comment.body}</p>
                                </Body>
                            </Comment>
                        ))}
                        
                        <Box>
                            <img src={`http://127.0.0.1:8000${profile.avatar}`} alt="" />
                            <input onChange={(e) => setCommentText(e.target.value)} value={commentText} placeholder="Write your comment here." type="text" />
                            <img onClick={commentPost} style={{width: "30px", height: "30px", marginLeft: "auto", cursor: "pointer"}} 
                            src="/images/send.png" alt="" />
                        </Box>
                    </Comments>
                )}
            </Article>
        </>
    )
}

export default Post;

const Comments = styled.div`
    margin-top: 15px;
    padding: 10px;
    border-top: 0.1px solid rgba(0, 0, 0, 0.05);
`

const Comment = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    span{
        margin-right: auto;
        font-size: 12px;
    }
    img{
        width: 30px;
        height: 30px;
        object-fit: cover;
        border-radius: 50%;
    }
`

const Body = styled.div`
    background-color: rgba(0, 0, 0, 0.09);
    padding: 10px;
    border-radius: 20px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
`

const Box = styled.div`
    display: flex;
    margin-top: 20px;
    align-items: center;
    img:nth-child(1){
        width: 30px;
        height: 30px;
        object-fit: cover;
        border-radius: 50%;
    }
    input{
        width: 85%;
        margin-left: 10px;
        outline: none;
        border-radius: 10px;
        padding: 10px;
        font-size: 15px;
        border: 2px solid rgba(0, 0, 0, 0.09)
    }
`

