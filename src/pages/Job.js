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
    const [error, setError] = useState('');

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
            console.log(e)
        }
    }

    const handleApply = async () => {
        setError('');
        try {
            await axios.post(`http://127.0.0.1:8000/api/jobs/${id}/apply`, {}, {
                headers: {
                    'Authorization': `Token ${user.token}`,
                }
            });
            fetchJob(id);
        } catch (e) {
            setError(e.response.data.Error);
        }
    }

    const handleAccept = async (developerId) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/jobs/${id}/accept-developer`, {
                'developer_id': developerId,
            }, {
                headers: {
                    'Authorization': `Token ${user.token}`,
                }
            });
            const data = await response.data;
            console.log(data);
            fetchJob(id);
        } catch (e) {
            console.log(e)
        }
    }

    const handleFinish = async () => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/jobs/${id}/finish`, {}, {
                headers: {
                    'Authorization': `Token ${user.token}`,
                }
            });
            fetchJob(id);
        } catch (e) {
            console.log(e);
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/jobs/${id}/delete`, {
                headers: {
                    'Authorization': `Token ${user.token}`,
                }
            });
            navigate('/jobs');
        } catch (e){
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
                    <div className={'d-flex flex-column align-items-center justify-content-center'}>
                        <div className="card col-8">
                            <h5 className="card-header">{job.name}</h5>
                            <div className="card-body">
                                <h5 className="card-title fs-3">Description: {job.description}</h5>
                                <p className="card-text fs-4">Technologies: {job.tags.map(tag => tag.name).join(', ')}</p>
                                <p className={'card-text fs-5'}>Status: {job.status}</p>
                                <div className={'d-flex justify-content-center'}>
                                    <Link to={'/jobs'} className="btn btn-secondary btn-lg mx-2">Back</Link>
                                    {job.status === 'in_progress'
                                        && (job.created_by.id === user.id || job.developer.id === user.id)
                                        && (<button onClick={handleFinish} className="btn btn-success btn-lg mx-2">Finish Job</button>)}
                                    {user.id === job.created_by.id
                                        && job.status === 'open'
                                        && (
                                            <>
                                                <Link to={`/jobs/${job.id}/edit`}
                                                      className="btn btn-success btn-lg mx-2">Edit</Link>
                                                <button onClick={handleDelete} className="btn btn-danger btn-lg mx-2">Delete</button>
                                            </>
                                        )}
                                    {user.user_type === 'developer'
                                        && job.status === 'open'
                                        && (job.applied_developers.some(developer => developer.id === user.id)
                                            ? <button disabled className="btn btn-success btn-lg mx-2">Applied</button>
                                            : <button onClick={handleApply} className="btn btn-primary btn-lg mx-2">Apply</button>)}
                                </div>
                            </div>
                        </div>

                        {error && (<div className={'alert alert-danger'} role={'alert'}
                                        style={{whiteSpace: "pre-wrap"}}>{error}
                        </div>)}

                        {user.id === job.created_by.id
                            && job.status === 'open'
                            && (
                            <div className={"card col-8 mt-5"}>
                                <h5 className="card-header">Applicants</h5>
                                <div className="card-body">
                                    <div className={'d-flex flex-column'}>
                                        {job.applied_developers.map((developer) => {
                                            return (
                                                <div key={developer.id} className={'d-flex mx-2 my-3 justify-content-between'}>
                                                    <div className={'d-flex flex-column'}>
                                                        <h5 className="card-title">{developer.username}</h5>
                                                        <p className="card-text">{developer.email}</p>
                                                    </div>
                                                    <button onClick={() => handleAccept(developer.id)} className="btn btn-primary btn-lg mx-2">Accept</button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Job;