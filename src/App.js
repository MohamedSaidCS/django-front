import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Job from "./pages/Job";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
    authenticated: false,
    token: '',
    id: 0,
    user_type: '',
  });

  const checkToken = async (token) => {
    const response = await axios.post('http://127.0.0.1:8000/api/check-token', {token: token});
    return await response.data
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      checkToken(localStorage.getItem('token')).then(({id, user_type}) => {
        setUser({
          authenticated: true,
          token: localStorage.getItem('token'),
          id: id,
          user_type: user_type,
        })

      }).catch(e => {
        console.log(e);
      });
    }

  }, []);

  return (
      <UserContext.Provider value={{user, setUser}}>
        <div className="App">
          <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/jobs"} element={<Jobs/>}/>
            <Route path={"/jobs/:id"} element={<Job/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/profile"} element={<Profile/>}/>
            <Route path={"/profile/:id"} element={<Profile/>}/>
          </Routes>
        </div>
      </UserContext.Provider>
  );
}

export default App;
