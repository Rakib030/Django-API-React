import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import{Container, Nav, Join, SignIn, Section, Hero, Google, Form, } from './loginStyle.js';
import {axiosInitial} from '../../api/axios';

function Login() {
    const [popLogin, setPopLogin] = useState(false);
    const [popSignUp, setpopSignUp] = useState(false);
    const popHandlerLog = () => {
        setPopLogin(!popLogin)
    }

    const popHandlerSign = () => [
        setpopSignUp(!popSignUp)
    ]

    // For login and register
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();

    const register = async() => {
        if(password1 === password2){
            await axiosInitial.post(`/user/`, {
                'username': username,
                'email': email,
                'password': password1
            }).then(async(res) => {
                console.log(res.data)
                await axiosInitial.post(`/user/login/`, {
                    'username': username,
                    'password': password1
                }).then((res) => {
                    console.log(res.data)
                    localStorage.setItem('token', res.data)
                    window.location.reload();
                })
            })
        }else{
            alert("Password doesn't match.")
        }
    }

    const login = async() => {
        await axiosInitial.post(`/user/login/`, {
            'username': username,
            'password': password1
        }).then((res) => {
            console.log(res.data)
            localStorage.setItem('token', res.data)
            window.location.reload();
        }).catch((err) => {
            alert("Username or Password are incorrect.")
            window.location.reload();
        })
    }

    return (
        <Container>
            <Nav>
                <Link to="#">
                    <img src="/images/login-logo.svg" alt="" />
                </Link>
                <div>
                    <Join onClick={e => setpopSignUp(!popSignUp)}>Join Now</Join>
                    <SignIn onClick={e => setPopLogin(!popLogin)} to="#">Sign In</SignIn>
                </div>
            </Nav>
            <Section>
                <Hero>
                    <h1>Welcome to your professional community</h1>
                    <img src="/images/login-hero.svg" alt="" />
                </Hero>
                <Form>
                    <Google onClick={(e)=> setPopLogin(!popLogin)}>
                        <img src="/images/home-logo.svg" alt="" />
                        Sign in to your Account
                    </Google>
                </Form>
            </Section>
            {popLogin && (
                <PopLogin>
                    <Content popLogin={true}>
                        <div>
                            <h3>Login to your Account</h3>
                            <p onClick={e => setPopLogin(!popLogin)}>X</p>
                        </div>
                        <Info>
                            <label htmlFor="text">Username or Email</label>
                            <input onChange={e => setUsername(e.target.value)} type="text" />
                            <label htmlFor="text">Password</label>
                            <input onChange={e => setPassword1(e.target.value)} type="password" />
                        </Info>
                        <Button onClick={login}>
                            Login 
                        </Button>
                        <p>Haven't create a account yet? <b onClick={() => {popHandlerLog(); popHandlerSign()}}>Sign Up</b></p>
                    </Content>
                </PopLogin>
            )}
            {popSignUp &&(
                <PopLogin>
                    <Content>
                        <div>
                            <h3>Please Sign Up</h3>
                            <p onClick={e => setpopSignUp(!popSignUp)}>X</p>
                        </div>
                        <Info>
                            <label htmlFor="text">Username</label>
                            <input onChange={e => setUsername(e.target.value)} type="text" />
                            <label htmlFor="text">Email</label>
                            <input onChange={e => setEmail(e.target.value)} type="text" />
                            <label htmlFor="password">Password</label>
                            <input onChange={e => setPassword1(e.target.value)} type="text" />
                            <label htmlFor="password">Set Password</label>
                            <input onChange={e => setPassword2(e.target.value)} type="text" />
                        </Info>
                        <Button onClick={register}>
                            Sign Up 
                        </Button>
                        <p>Have a account? <b onClick={() => {popHandlerLog(); popHandlerSign()}}>Sign In</b></p>
                    </Content>
                </PopLogin>
            )}
        </Container>
    )
}


export default Login;

const PopLogin = styled.div`
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 99999;
    width: 100%;
    height: 100%;
`

const Content = styled.div`
    margin: auto;
    margin-top: 200px;
    width: 20%;
    height: ${({ popLogin }) => (popLogin ? '40%' : '50%')};
    background-color: #0959a8;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: white;

    div{
        display: flex;
        width: 100%;
        justify-content: space-between;

        p{
            font-weight: 700;
            border: 2px solid white;
            border-radius: 4px;
            padding: 5px 10px;
            transition: 200ms;

            :hover{
                background-color: white;
                color: #0959a8;
                cursor: pointer;
            }
        }
    }

    b{
        cursor: pointer;
    }
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > input{
        border: 2px solid #0a66c2;
        height: 20px;
        background-color: #067df5;
        border-radius: 10px;
        outline: none;
        padding: 3px;
        width: 100%;
        font-size: 16px;
        margin-top: 5px;
        color: white;
    }
    & > label{
        margin-top: 10px;
        font-weight: 400;
    }
`

const Button = styled.button`
    width: 50%;
    height: 40px;
    border: 3px solid #107eec;
    background-color: inherit;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: 167ms;

    :hover{
        background-color: #107eec;
    }
`