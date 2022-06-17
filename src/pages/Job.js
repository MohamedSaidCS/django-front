import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../App";
import {useNavigate} from "react-router-dom";

function Job() {
    const {id} = useParams();
    const [job, setJob] = useState({});
    const [loading, setLoading] = useState(true);

    const {user} = useContext(UserContext);

    const navigate = useNavigate();

    const fetchJob = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/jobs/${id}`, {
                headers: {
                    'Authorization': `Token ${user.token}`
                }
            });
            const data = await response.data;
            setJob(data);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(user.authenticated)
            fetchJob(id);
        else
            navigate('/login');
    }, []);

    return (
        <div>
            {!loading && (
                <div className="card">
                    <h5 className="card-header">{job.name}</h5>
                    <div className="card-body">
                        <h5 className="card-title">{job.description}</h5>
                        <p className="card-text">{job.tags.map(tag => tag.name).join(', ')}</p>
                        <p className={'card-text'}>Status: {job.status}</p>
                        <Link to={'/jobs'} className="btn btn-primary">Back</Link>
                        {user.id === job.created_by.id
                            && job.status === 'open'
                            && (
                            <>
                                <Link to={`/jobs/${job.id}/edit`} className="btn btn-primary">Edit</Link>
                                <button className="btn btn-primary">Delete</button>
                            </>
                        )}
                        {user.user_type === 'developer'
                            && job.status === 'open'
                            && <button className="btn btn-primary">Apply</button>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Job;