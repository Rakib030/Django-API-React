import "./app.scss"
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import {useGlobalState} from "./state/provider";

const App = () => {
  const [{profile}] = useGlobalState();
  return (
    <>
        <Router>
          <Switch>
            {!profile ? <Route path="/register" component={Register} /> : <Redirect to="/home" />}
            {!profile ? <Route path="/login" component={Login} /> : <Redirect to="/home" />}
            {profile ? <Route exact path="/" component={Home} /> : <Redirect to="/login" />}
            {profile ? <Route path="/watch/" component={Watch} /> : <Redirect to="/login" />}
          </Switch>
        </Router>
    </>
  );
};

export default App;