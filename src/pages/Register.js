import {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {UserContext} from "../App";
import {useNavigate} from 'react-router-dom';
import background from "../assets/images/fotis-fotopoulos-LJ9KY8pIH3E-unsplash.jpg";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [userType, setUserType] = useState('');
    const [gender, setGender] = useState('');
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [address, setAddress] = useState('');
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

    const handleRegister = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        const data = {
            'username': username,
            'email': email,
            'password': password,
            'password_confirmation': passwordConfirmation,
            'user_type': userType,
        }
        if (userType === 'recruiter')
            data.address = address
        else if (userType === 'developer') {
            data.gender = gender;
            data.tags = selectedTags;
        }
        try {
            await axios.post('http://127.0.0.1:8000/api/signup', data);
            setSuccess('Registration Successful!');
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
        if (user.authenticated)
            navigate('/');
        fetchTags();
    }, [user])

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            height: '140vh',
            paddingTop: "60px"
        }}>
            <div className={'container d-flex flex-column'} style={{}}>
                <div className={'d-flex col-4 align-self-center'}>
                    {error && (<div className={'alert alert-danger'} style={{whiteSpace: "pre-wrap"}}>{error}</div>)}
                </div>
                <div className="card">
                    <h5 className="card-header">Register</h5>
                    <div className="card-body bg-transparent">
                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label fw-bold fs-5">Username</label>
                                <input type="text" className="form-control" id="username"
                                       onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-bold fs-5">Email address</label>
                                <input type="email" className="form-control" id="email"
                                       onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-bold fs-5">Password</label>
                                <input type="password" className="form-control" id="password"
                                       onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirm-password" className="form-label fw-bold fs-5">Confirm
                                    Password</label>
                                <input type="password" className="form-control" id="confirm-password"
                                       onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="user-type" className="form-label fw-bold fs-5">User Type</label>
                                <select id="user-type" className="form-select"
                                        onChange={(e) => setUserType(e.target.value)}>
                                    <option value="">Select Type</option>
                                    <option value="recruiter">Recruiter</option>
                                    <option value="developer">Developer</option>
                                </select>
                            </div>
                            {userType === 'developer' && (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="gender" className="form-label fw-bold fs-5">Gender</label>
                                        <select id="gender" className="form-select"
                                                onChange={(e) => setGender(e.target.value)}>
                                            <option value="">Select Type</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="tags" className="form-label fw-bold fs-5">Tags</label>
                                        <select multiple id="tags" className="form-select"
                                                onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, option => option.value))}>
                                            {renderTags()}
                                        </select>
                                    </div>
                                </>
                            )}

                            {userType === 'recruiter' && (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="address"
                                               onChange={(e) => setAddress(e.target.value)}/>
                                    </div>
                                </>
                            )}
                            {userType !== '' && <button type="submit" className="btn btn-primary">Register</button>}
                        </form>
                        {success && (<div className={'alert alert-success'} role={'alert'}>{success}
                            <button type="button" className="btn-close" data-bs-dismiss="alert"
                                    aria-label="Close"></button>
                        </div>)}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;