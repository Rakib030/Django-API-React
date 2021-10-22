import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useGlobalState } from './state/provider';
import { useEffect } from "react";
import { axiosInstance } from "./api/axios";

function App() {
  const [{profile}, dispatch] = useGlobalState();
  useEffect(() => {
    const fetchProflie = async () => {
      await axiosInstance.get(`/user/profile/`)
        .then((res) => {
          dispatch({
            type: "LOGIN_PROFILE",
            profile: res.data.user_profile
          })
          console.log(res.data)
        })
    }
    fetchProflie();
  }, [dispatch])
  return(
    <Router>
      <Switch>
        <Route path="/login">
          {!profile ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route path="/register">
          {!profile ? <Register /> : <Redirect to="/" /> }
        </Route>
        <Route exact path="/">
          {profile ? <Home /> : <Redirect to="/login" /> }
        </Route>
        <Route path="/profile">
          {profile? <Profile /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
