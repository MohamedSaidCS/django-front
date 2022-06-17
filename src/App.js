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

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
    authenticated: false,
    token: '',
    id: 0,
    username: '',
    user_type: '',
  });
  const [loading, setLoading] = useState(true);

  const checkToken = async (token) => {
    const response = await axios.post('http://127.0.0.1:8000/api/check-token', {token: token});
    return await response.data
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      checkToken(localStorage.getItem('token')).then(({id, username, user_type}) => {
        setUser({
          authenticated: true,
          token: localStorage.getItem('token'),
          username: username,
          id: id,
          user_type: user_type,
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
          <Routes>
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
          </Routes>
        </div>
      </UserContext.Provider>
  );
}

export default App;
