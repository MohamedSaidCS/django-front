import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import {useNavigate} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {user, setUser} = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
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
        if(user.authenticated)
            navigate('/');
    }, [user])

    return (
        <>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {error && (<div className={'alert alert-danger'} style={{whiteSpace: "pre-wrap"}}>{error}</div>)}
        </>
    );
}

export default Login;