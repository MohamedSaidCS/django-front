import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import {UserContext} from "../App";
import {useNavigate} from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const getAllJobs = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/jobs/", {
      headers: {
        'Authorization': `Token ${user.token}`
      }
    });
    const data = await response.data;
    setJobs(data);
  };
  useEffect(() => {
    if(user.authenticated)
      getAllJobs();
    else
      navigate('/login');
  }, []);

  return (
    <div>
      jobs
      {jobs &&
        jobs.map((job) => {
          console.log(job);
        })}
    </div>
  );
}

export default Jobs;
