import React from "react"
import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../App";
import axios from "axios";

const Navbar = () => {
    const {user, setUser} = useContext(UserContext);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Job App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-lg-0 w-100">
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link">Home</Link>
                            </li>
                            {user.authenticated && <>
                                <li className="nav-item">
                                    <Link to={'/jobs'} className="nav-link">Jobs</Link>
                                </li>
                                <li className="nav-item">
                                <Link to={'/notifications'} className="nav-link">Notifications</Link>
                                </li>
                            </>}
                            {!user.authenticated && (<>
                                <li className="nav-item ms-auto">
                                    <Link to={'/login'} className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/register'} className="nav-link">Register</Link>
                                </li>
                            </>)}
                            {user.authenticated && (<>
                                    <li className="nav-item ms-auto">
                                        <Link to={`/profile/${user.id}`} className="nav-link">Profile</Link>
                                    </li>
                                        <li className="nav-item">
                                            <a onClick={async () => {
                                                await axios.post('http://127.0.0.1:8000/api/logout', null, {
                                                    headers: {
                                                        'Authorization': `Token ${user.token}`
                                                    }
                                                });
                                                localStorage.removeItem('token');
                                                setUser({
                                                    authenticated: false,
                                                    token: '',
                                                    username: '',
                                                    id: '',
                                                    user_type: '',
                                                });
                                            }} className={'nav-link'}>Logout
                                            </a>
                                        </li>
                                </>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar