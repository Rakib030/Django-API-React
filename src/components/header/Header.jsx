import React from 'react';
import SearchIcon from "@material-ui/icons/Search";
import { Link } from 'react-router-dom';
import {Container,
    Content,
    Logo,
    Search,
    Work,
    SignOut,
SearchICN,
Nav,
User,
NavListWrap,
NavList,
} from './headerStyle';
import {axiosInitial} from '../../api/axios';
import {useGlobalState} from '../../state/provider';


function Header() {
    const [{profile}] = useGlobalState();
    console.log(profile);

    const signOut = async() => {
        await axiosInitial.post('/rest-auth/logout/')
            .then((res) => {
                localStorage.clear('token');
                window.location.reload();
            })
    }

    return (
        <Container>
            <Content>
                <Logo>
                    <Link to="#">
                        <img src="/images/home-logo.svg" alt="" />
                    </Link>
                </Logo>
                <Search>
                    <div>
                        <input type="text" placeholder="Search" />
                    </div>
                    <SearchICN>
                        <SearchIcon />
                    </SearchICN>
                </Search>
                <Nav>
                    <NavListWrap>
                        <NavList className="active">
                            <Link to="/">
                                <img src="/images/nav-home.svg" alt="" />
                                <span>Home</span>
                            </Link>
                        </NavList>

                        <NavList>
                            <Link to="/">
                                <img src="/images/nav-network.svg" alt="" />
                                <span>My Network</span>
                            </Link>
                        </NavList>

                        <NavList>
                            <Link to="/">
                                <img src="/images/nav-jobs.svg" alt="" />
                                <span>Jobs</span>
                            </Link>
                        </NavList>

                        <NavList>
                            <Link to="/">
                                <img src="/images/nav-messaging.svg" alt="" />
                                <span>Messages</span>
                            </Link>
                        </NavList>

                        <NavList>
                            <Link to="/">
                                <img src="/images/nav-notifications.svg" alt="" />
                                <span>Notifications</span>
                            </Link>
                        </NavList>

                        <User>
                            <Link to="/">
                                <img src={`http://127.0.0.1:8000${profile.avatar}`} alt="" />
                                <span>
                                    {profile?.username}
                                    <img src="/images/down-icon.svg" alt="" />
                                </span>
                            </Link>
                            <SignOut onClick={signOut}>
                                Sign Out
                            </SignOut>
                        </User>

                        <Work>
                            <Link to="/">
                                <img src="/images/nav-work.svg" alt="" />
                                <span>
                                    Work
                                    <img src="/images/down-icon.svg" alt="" />
                                </span>
                            </Link>
                        </Work>
                    </NavListWrap>
                </Nav>
            </Content>
        </Container>
    )
}

export default Header;
