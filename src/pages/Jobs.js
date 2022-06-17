import axios from "axios";
import React, {useEffect, useState, useContext} from "react";
import {UserContext} from "../App";
import {Link, useNavigate} from "react-router-dom";

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

    const renderJobs = () => {
        console.log(jobs);
        return jobs.map((job) => {
            return (
                <div key={job.id} className="card">
                    <h5 className="card-header">{job.name}</h5>
                    <div className="card-body">
                        <h5 className="card-title">{job.description}</h5>
                        <p className="card-text">{job.tags.map(tag => tag.name).join(', ')}</p>
                        <Link to={`/jobs/${job.id}`} className="btn btn-primary">Details</Link>
                    </div>
                </div>
            )
        });
    }

    useEffect(() => {
        if (user.authenticated)
            getAllJobs();
        else
            navigate('/login');
    }, []);

    return (
        <div>
            {user.user_type === 'recruiter' && <Link to="/jobs/create" className="btn btn-primary">Create Job</Link>}
            {jobs.length > 0 && renderJobs()}
        </div>
    );
}

export default Jobs;
