import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import {useGlobalState} from '../../state/provider';
import {axiosInstance} from '../../api/axios'


function PostModel({showModel, handelClick}) {
    const [{profile}] = useGlobalState();
    const [editorTitle, setEditorTitle] =  useState("");
    const [eidtorText, setEditorText] = useState("");
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
        handelClick(e);
    }

    const Post = async(e) => {
        if(shareImage){
            const fd = new FormData();
            fd.append("owner", profile.id)
            fd.append("body", shareImage, shareImage.name)
            if(eidtorText){
                fd.append("description", eidtorText)
            }
            if(editorTitle){
                fd.append("title", editorTitle)
            }
            await axiosInstance.post(`/user/post/`, fd)
            .then((res) => {
                console.log(res.data)
                window.location.reload();
            })
        }else{
            alert("Please Chose a image!");
        }
    }

    return (
        <>
            { showModel === "open" && (
            <Container>
                <Content>
                    <Header>
                        <h2>Create a post</h2>
                        <button onClick={(event) => reset(event)}>
                            X
                        </button>
                    </Header>
                    <SharedContent>
                        <UserInfo>
                            <img src={`http://127.0.0.1:8000${profile.avatar}`} alt="" />
                            <span>{profile.username}</span>
                        </UserInfo>
                        <Editor>
                            <p>Title</p>
                            <textarea value={editorTitle} 
                            placeholder="Write your Title here."
                            autoFocus={true}
                            onChange={e => setEditorTitle(e.target.value)} />
                            <p>Description</p>
                            <textarea value={eidtorText} 
                            placeholder="What do you want to talk about?"
                            autoFocus={true}
                            onChange={e => setEditorText(e.target.value)} />
                            <UploadImage>
                                <input type="file" 
                                    name="image"
                                    id="file"
                                    style={{display: "none"}}
                                    onChange={handleChange}
                                    accept="image/gif, image/jpeg, image/png, image/jpg"
                                />
                                <p>
                                    <label htmlFor="file">Select an <b>image</b> to share</label>
                                </p>
                                {shareImage && <img src={URL.createObjectURL(shareImage)} alt="" />}
                            </UploadImage>
                        </Editor>
                    </SharedContent>
                    <ShareCreation>
                        <AttachAssets>
                            <AssetButton>
                                <img src="/images/facebook.png" alt="" />
                            </AssetButton>
                            <AssetButton>
                                <img src="/images/gallery.png" alt="" />
                            </AssetButton>
                        </AttachAssets>
                        <ShareComment>
                            <AssetButton>
                                <img src="/images/share.png" alt="" />
                                Anyone
                            </AssetButton>
                        </ShareComment>
                        <PostButton onClick={Post}>
                            Post
                        </PostButton>
                    </ShareCreation>
                </Content>
            </Container>
            )}
        </>
    )
}

export default PostModel;

const Container = styled.div`
    position: fixed;
    top: 0;
    z-index: 999;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    animation: fadeIn 0.3s;
`

const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    border-radius: 5px;
    overflow: initial;
    position: relative;
    margin: auto auto;
    top: 32px;
`

const Header = styled.div`
    padding: 16px 2px;
    display: block;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    line-height: 1.5;
    font-size: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > button{
        padding: 5px 10px;
        background-color: transparent;
        border: 2px solid #0a66c2;
        border-radius: 4px;
        cursor: pointer;
        color: #0a66c2;
        font-weight: bold;
        font-size: 20px;
        transition-duration: 167ms;

        &:hover{
            background-color: #0a66c2;
            color: white;
        }
    }
`

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;

    svg, img{
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span{
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`

const ShareCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`

const AssetButton = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    img{
        width: 30px;
        height: 30px;
    }
`

const AttachAssets = styled.div`
    display: flex;
    align-items: center;
    padding-right: 8px;
    ${AssetButton}{
        width: 40px;
    }
`

const ShareComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.15);

    ${AssetButton}{
        svg, img{
            margin-right: 5px;
        }
    }
`

const PostButton = styled.button`
    min-width: 60px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    background-color: #0a66c2;
    color: white;
`

const Editor = styled.div`
    padding: 12px 24px;

    textarea{
        width: 100%;
        outline: none;
        min-height: 50px;
        border-radius: 5px;
        border: 2px solid #0a66c2;
    input{
        width: 100%;
        height: 35px;
        font-size: 16px;
    }
    }
`

const UploadImage = styled.div`
    text-align: center;
    img{
        width: 100%;
        height: 300px;
        object-fit: cover;
    }
    p{
        color: #0a66c2;
        label{
            cursor: pointer;
        }
    }
`