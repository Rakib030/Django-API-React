import "./app.scss"
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import {useGlobalState} from "./state/provider";
import { useEffect } from "react";
import { axiosInstance } from "./api/axios";

const App = () => {
  const [{profile}, dispatch] = useGlobalState();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axiosInstance.get("/user/profile/");
      console.log(res.data);
      dispatch({
        type: "SET_PROFILE",
        profile: res.data
      })
    }
    fetchProfile();
  }, [dispatch]);
  return (
    <>
        <Router>
          <Switch>
            <Route exact path="/">
              {profile ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route path="/watch">
              {profile ? <Watch /> : <Redirect to="/login" />}
            </Route>
            <Route path="/register">
              {!profile ? <Register /> : <Redirect to="/" />}
            </Route>
            <Route path="/login">
              {!profile ? <Login /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </Router>
    </>
  );
};

export default App;