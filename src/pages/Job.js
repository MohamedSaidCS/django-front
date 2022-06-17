import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../App";
import {useNavigate} from "react-router-dom";
import background from "../assets/images/fotis-fotopoulos-LJ9KY8pIH3E-unsplash.jpg";

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
        if (user.authenticated)
            fetchJob(id);
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
            {!loading && (
                <div className={'container'}>
                    <div className={'d-flex align-items-center justify-content-center'}>
                    <div className="card col-8">
                        <h5 className="card-header">{job.name}</h5>
                        <div className="card-body">
                            <h5 className="card-title fs-3">Description: {job.description}</h5>
                            <p className="card-text fs-4">Technologies: {job.tags.map(tag => tag.name).join(', ')}</p>
                            <p className={'card-text fs-5'}>Status: {job.status}</p>
                            <div className={'d-flex justify-content-center'}>
                                <Link to={'/jobs'} className="btn btn-secondary btn-lg mx-2">Back</Link>
                                {user.id === job.created_by.id
                                    && job.status === 'open'
                                    && (
                                        <>
                                            <Link to={`/jobs/${job.id}/edit`} className="btn btn-success btn-lg mx-2">Edit</Link>
                                            <button className="btn btn-danger btn-lg mx-2">Delete</button>
                                        </>
                                    )}
                                {user.user_type === 'developer'
                                    && job.status === 'open'
                                    && <button className="btn btn-primary btn-lg mx-2">Apply</button>}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Job;