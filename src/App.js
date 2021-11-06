import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Login from './pages/login/Login';
import { axiosInstance } from './api/axios';
import {useGlobalState} from './state/provider';
import { useEffect } from 'react';

function App() {
  const [{profile}, dispatch] = useGlobalState();

  useEffect(()=>{
    const fetchProfile = async () => {
      const response = await axiosInstance.get('/user/profile/');
      dispatch({
        type: 'SET_PROFILE', 
        profile: response.data
      });
    }
    fetchProfile();
  }, [dispatch]);
  return (
    <div className="App">
      <Router >
        <Switch>
          <Route exact path="/">
            {!profile ? <Login /> : <Redirect to="/home" />}
          </Route>
          <Route path="/home">
            {profile ? <><Header /> <Home /></> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
