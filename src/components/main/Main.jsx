import React, { useEffect } from 'react';
import { useState } from 'react';
import PostModel from '../postModel/PostModel';
import {Container, ShareBox} from './MainStyle';
import {useGlobalState} from '../../state/provider';
import { axiosInstance } from '../../api/axios';
import Post from './Post';

function Main() {
    const [showModel, setShowModel] = useState('close');
    const [{profile}] = useGlobalState();
    const [posts, setPosts] = useState();

    const handelClick = (e) => {
        if(e.target !== e.currentTarget){
            return;
        }

        switch(showModel){
            case ('open'):
                setShowModel("close");
                break;
            case ('close'):
                setShowModel("open")
                break;
            default:
                setShowModel("close")
                break;
        }
    }

    useEffect(()=> {
        const fetchPost = async () => {
            const res = await axiosInstance.get(`/user/post/`)
            setPosts(res.data);
        }
        fetchPost();
    }, [])
    console.log(posts)

    return (
        <Container>
            <ShareBox>
                Share
                <div>
                    <img src={`http://127.0.0.1:8000${profile.avatar}`} alt="" />
                    <button onClick={handelClick}>Start a Post</button>
                </div>
                <div>
                    <button>
                        <img src="/images/gallery.png" alt="" />
                        <span>Photo</span>
                    </button>

                    <button>
                        <img src="/images/facebook.png" alt="" />
                        <span>video</span>
                    </button>

                    <button>
                        <img src="/images/planner.png" alt="" />
                        <span>Events</span>
                    </button>

                    <button>
                        <img src="/images/article.png" alt="" />
                        <span>Write Article</span>
                    </button>
                </div>
            </ShareBox>
            <div>
                
                {posts?.map((post)=> (
                    <Post key={post.id} post={post} />
                ))}
            </div>
            <PostModel showModel={showModel} handelClick={handelClick} />
        </Container>
    )
}

export default Main;