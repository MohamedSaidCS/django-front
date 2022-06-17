import axios from "axios";
import React, {useEffect, useState, useContext} from "react";
import {UserContext} from "../App";
import {Link, useNavigate} from "react-router-dom";
import background from "../assets/images/fotis-fotopoulos-LJ9KY8pIH3E-unsplash.jpg";

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
                        <h5 className="card-title">Job Description: {job.description}</h5>
                        <p className="card-text">Technologies Needed: {job.tags.map(tag => tag.name).join(', ')}</p>
                        <div className={'d-flex'}>
                            <Link to={`/jobs/${job.id}`} className="btn btn-warning ms-auto">More Details...</Link>
                        </div>
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
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            height: '100vh',
            paddingTop: "60px"
        }}>
        <div className={'container'}>
            <p className={'display-5 text-center text-white'}>Job Postings</p>
            <div className={'d-flex'}>
                {user.user_type === 'recruiter' && <Link to="/jobs/create" className="btn btn-success btn-lg ms-auto my-3">Create Job</Link>}
            </div>

            {jobs.length > 0 && renderJobs()}
        </div>
        </div>
    );
}

export default Jobs;
