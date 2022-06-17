import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import {useNavigate} from "react-router-dom";
import background from "../assets/images/fotis-fotopoulos-LJ9KY8pIH3E-unsplash.jpg";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {user, setUser} = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        const data = {
            username: username,
            password: password,
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', data);
            const result = await response.data;
            const user = {
                authenticated: true,
                token: result.token,
                username: result.username,
                id: result.id,
                user_type: result.user_type,
            }
            setUser(user);
            localStorage.setItem('token', user.token);
            navigate('/');
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
    }, [user])

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            height: '100vh',
            paddingTop: "60px"
        }}>
            <div className={'d-flex flex-column align-items-center'}>
                <div className="card col-3">
                    <h5 className="card-header fs-2 text-center">Login</h5>
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label fw-bold fs-5">Username</label>
                                <input type="text" className="form-control" id="username"
                                       onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-bold fs-5">Password</label>
                                <input type="password" className="form-control" id="password"
                                       onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className={'d-flex justify-content-center'}>
                                <button type="submit" className="btn btn-primary btn-lg align-self-center">Login</button>
                            </div>

                        </form>
                        {error && (
                            <div className={'alert alert-danger'} style={{whiteSpace: "pre-wrap"}}>{error}</div>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;