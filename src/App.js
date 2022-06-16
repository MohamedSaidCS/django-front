import './App.css';
import {Routes, Route} from "react-router-dom";
import Jobs from "./pages/Jobs";
import Job from "./pages/Job";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Jobs/>}/>
        <Route path={"/jobs"} element={<Jobs/>}/>
        <Route path={"/jobs/:id"} element={<Job/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/register"} element={<Register/>}/>
        <Route path={"/profile"} element={<Profile/>}/>
        <Route path={"/profile/:id"} element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
