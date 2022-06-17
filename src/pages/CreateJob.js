import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {UserContext} from "../App";
import {Link, useNavigate} from "react-router-dom";

function CreateJob() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
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

    const handleCreateJob = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        const data = {
            'name': name,
            'description': description,
            'tags': selectedTags,
        }
        try {
            await axios.post('http://127.0.0.1:8000/api/jobs/create', data, {
                headers: {
                    'Authorization': `Token ${user.token}`
                }
            });
            setSuccess('Job Created Successfully!');
        } catch (e) {
            let errors = '';
            let responseErrors = e.response.data;
            for (let error in responseErrors) {
                errors += `${error}: ${responseErrors[error].join(', ')} \n`;
            }
            setError(errors);
        }
    }

    useEffect(() => {
        if(user.authenticated)
            fetchTags();
        else
            navigate('/login');
    }, [user])

    return (
        <>
            <form onSubmit={handleCreateJob}>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold fs-5">Name</label>
                    <input type="text" className="form-control" id="name"
                           onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label fw-bold fs-5">Description</label>
                    <input type="text" className="form-control" id="description"
                           onChange={(e) => setDescription(e.target.value)}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="tags" className="form-label fw-bold fs-5">Tags</label>
                    <select multiple id="tags" className="form-select"
                            onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, option => option.value))}>
                        {renderTags()}
                    </select>

                    <button type="submit" className="btn btn-primary">Create Job</button>
                    <Link to={'/jobs'} type="submit" className="btn btn-primary">Back</Link>
                </div>

            </form>

            {success && (<div className={'alert alert-success'} role={'alert'}>{success}
            </div>)}

            {error && (<div className={'alert alert-danger'} role={'alert'} style={{whiteSpace: "pre-wrap"}}>{error}
            </div>)}
        </>
    );
}

export default CreateJob;