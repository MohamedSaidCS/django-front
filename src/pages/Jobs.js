import axios from "axios";
import React, { useEffect, useState } from "react";
function Jobs() {
  const [jobs, setJobs] = useState(null);
  const getAllJobs = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/jobs/");
    const data = await response.data;

    setJobs(data);
  };
  useEffect(() => {
    getAllJobs();
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
