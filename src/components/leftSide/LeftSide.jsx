import React, { useState } from 'react';
import {Container, 
    ArtCard,
    UserInfo,
    CardBackgroud,
    Photo,
    Link,
    AddPhotoTxt,
    Widget,
    Item,
    CommunityCard,
} from './leftSideStyle';
import {useGlobalState} from '../../state/provider';
import styled from 'styled-components';
import {axiosInstance} from '../../api/axios';

function LeftSide() {
    const [{profile}] = useGlobalState();
    const [popUp, setPopUp] = useState(false);
    const [shareImage, setShareImage] = useState("");
    const [username, setUsername] = useState(profile.username);

    const handleClose = (e) => {
        setShareImage("");
        setPopUp(!popUp);
    }

    const update = async() => {
        const fd = new FormData();
        fd.append("username", username);
        if(shareImage){
            fd.append("avatar", shareImage, shareImage.name);
        }
        await axiosInstance.post(`/user/update/`, fd)
            .then((res)=> {
                console.log(res.data);
                window.location.reload();
            })
    }

    return (
        <>
        <Container>
            <ArtCard>
                <UserInfo>
                    <CardBackgroud />
                    <Photo src={`http://127.0.0.1:8000${profile.avatar}`} /> 
                    <Link>Welcome, There</Link>
                    <a href>
                        <AddPhotoTxt onClick={e => setPopUp(!popUp)}>Add a photo</AddPhotoTxt>
                    </a>
                </UserInfo>
                <Widget>
                    <a href>
                        <div>
                            <span>Connections</span>
                            <span>Grow your Network</span>
                        </div>
                        <img src="/images/widget-icon.svg" alt="" />
                    </a>
                </Widget>
                <Item>
                    <span>
                        <img src="/images/item-icon.svg" alt="" />
                        My Items
                    </span>
                </Item>
            </ArtCard>
            <CommunityCard>
                <a href>
                    <span>Groups</span>
                </a>
                <a href>
                    <span>
                        Events
                        <img src="/images/plus-icon.svg" alt="" />
                    </span>
                </a>
                <a href>
                    <span>Follow Hashtags</span>
                </a>
                <a href>
                    <span>
                        Discover More
                    </span>
                </a>
            </CommunityCard>
        </Container>
        {popUp && (
            <PopUp>
                <Content>
                    <Header>
                        <h2>Create a post</h2>
                        <button onClick={handleClose}>
                            X
                        </button>
                    </Header>
                    <SharedContent>
                        <UserInfoPop>
                            <img src={`http://127.0.0.1:8000${profile.avatar}`} alt="" />
                            <span>{profile.username}</span>
                        </UserInfoPop>
                        <Editor>
                            <UploadImage>
                                <label htmlFor="text">Username: </label>
                                <input style={{padding: "10px", outline: "none", borderRadius: "5px", border: "1px solid rgba(0, 0, 0, 0.5)"}} 
                                type="text" value={username} onChange={e => setUsername(e.target.value)} />
                                <input type="file" 
                                    name="image"
                                    id="file"
                                    style={{display: "none"}}
                                    onChange={e => setShareImage(e.target.files[0])}
                                    accept="image/gif, image/jpeg, image/png, image/jpg"
                                />
                                <p>
                                    <label htmlFor="file">Select an profile <b>image</b> to Update</label>
                                </p>
                                {shareImage ? (<img src={URL.createObjectURL(shareImage)} alt="" />) : <img src={`http://127.0.0.1:8000${profile.avatar}`} alt="" />} 
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
                        <PostButton onClick={update}>
                            Update
                        </PostButton>
                    </ShareCreation>
                </Content>
            </PopUp>
        )}
        </>
    )
}

export default LeftSide;

const PopUp = styled.div`
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

const UserInfoPop = styled.div`
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
        min-height: 100px;
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
        height: 350px;
        object-fit: cover;
    }
    p{
        color: #0a66c2;
        label{
            cursor: pointer;
        }
    }
`
