import background from "../assets/images/fotis-fotopoulos-LJ9KY8pIH3E-unsplash.jpg";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {useContext, useEffect} from "react";
import {UserContext} from "../App";
import axios from "axios";

function EditJob() {
    const {id} = useParams();
    const [job, setJob] = useState({
        'name': '',
        'description': '',
    });
    const [tags, setTags] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const {user} = useContext(UserContext);

    const navigate = useNavigate();

    const fetchTags = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/tags');
        const tags = await response.data;
        setTags(tags);
    }

    const renderTags = () => {
        return tags.map((tag) => {
            return (<option key={tag.id} value={tag.id}>{tag.name}</option>)
        })
    }

    const handleEditJob = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        try {
            await axios.put(`http://127.0.0.1:8000/api/jobs/${id}/edit`, job, {
                headers: {
                    'Authorization': `Token ${user.token}`
                }
            });
            setSuccess('Job Edited Successfully!');
        } catch (e) {
            console.log(e);
            let errors = '';
            let responseErrors = e.response.data;
            for (let error in responseErrors) {
                errors += `${error}: ${responseErrors[error].join(', ')} \n`;
            }
            setError(errors);
        }
    }

    const fetchJob = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/jobs/${id}`, {
                headers: {
                    'Authorization': `Token ${user.token}`
                }
            });
            const data = await response.data;
            setJob(data);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (user.authenticated) {
            fetchTags();
            fetchJob(id);
        }
        else
            navigate('/login');
    }, [user])

    return (
        <div>
            <div>
                <div style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    height: '100vh',
                    paddingTop: "60px"
                }}>
                    <div className={'d-flex flex-column align-items-center'}>
                        <div className="card col-6">
                            <h5 className="card-header fs-2 text-center">Edit Job</h5>
                            <div className="card-body">
                                <form onSubmit={handleEditJob}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label fw-bold fs-5">Name</label>
                                        <input type="text" className="form-control" id="name"
                                               onChange={(e) => setJob({...job, name: e.target.value})} value={job.name}/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label fw-bold fs-5">Description</label>
                                        <input type="text" className="form-control" id="description"
                                               onChange={(e) => setJob({...job, description: e.target.value})} value={job.description}/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="tags" className="form-label fw-bold fs-5">Tags</label>
                                        <select multiple id="tags" className="form-select"
                                                onChange={(e) => setJob({...job, tags: Array.from(e.target.selectedOptions, option => option.value)})}>
                                            {renderTags()}
                                        </select>
                                        <div className={'d-flex align-items-center justify-content-center mt-2'}>
                                            <Link to={'/jobs'} type="submit" className="btn btn-secondary mx-2">Back</Link>
                                            <button type="submit" className="btn btn-primary mx-2">Save</button>
                                        </div>
                                    </div>

                                </form>

                                {success && (<div className={'alert alert-success'} role={'alert'}>{success}
                                </div>)}

                                {error && (<div className={'alert alert-danger'} role={'alert'}
                                                style={{whiteSpace: "pre-wrap"}}>{error}
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditJob;