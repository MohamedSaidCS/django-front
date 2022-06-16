import axios from "axios";
import React, { useEffect, useState } from "react";
function Jobs() {
  const [jobsList, SetjobsList] = useState(null);
  const getAllJobs = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/jobs/");
    const data = await response.data;

    SetjobsList(data);
  };
  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div>
      jobs
      {jobsList &&
        jobsList.map((job) => {
          console.log(job);
        })}
    </div>
  );
}

export default Jobs;
