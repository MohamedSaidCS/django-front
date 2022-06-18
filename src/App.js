import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Job from "./pages/Job";
import CreateJob from "./pages/CreateJob";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import {createContext, useEffect, useState} from "react";
import axios from "axios";
import EditJob from "./pages/EditJob";
import EditProfile from "./pages/EditProfile";
import Notifications from "./pages/Notifications";
import Navbar from "./components/Navabar";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
    authenticated: false,
    token: '',
  });
  const [loading, setLoading] = useState(true);

  const checkToken = async (token) => {
    const response = await axios.post('http://127.0.0.1:8000/api/check-token', {token: token});
    return await response.data
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      checkToken(localStorage.getItem('token')).then(({user}) => {
        setUser({
          authenticated: true,
          token: localStorage.getItem('token'),
          ...user
        });
        setLoading(false);

      }).catch(e => {
        console.log(e);
      });
    } else {
      setLoading(false);
    }

  }, []);

  if(loading)
    return(
        <div>Loading</div>
    );

  return (
      <UserContext.Provider value={{user, setUser}}>
        <div className="App">
        <Navbar/>
          <Routes>
            {/*<Route path={"/"} element={<Navbar/>}/>*/}
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/jobs"} element={<Jobs/>}/>
            <Route path={"/jobs/:id"} element={<Job/>}/>
            <Route path={"/jobs/:id/edit"} element={<EditJob/>}/>
            <Route path={"/jobs/create"} element={<CreateJob/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/profile"} element={<Profile/>}/>
            <Route path={"/profile/:id"} element={<Profile/>}/>
            <Route path={"/profile/:id/edit"} element={<EditProfile/>}/>
            <Route path={"/notifications"} element={<Notifications/>}/>
          </Routes>
        </div>
      </UserContext.Provider>
  );
}

export default App;
