import React, {useContext} from 'react';
import background from '../assets/images/fotis-fotopoulos-LJ9KY8pIH3E-unsplash.jpg'
import {Link} from "react-router-dom";
import {UserContext} from "../App";
import axios from "axios";

function Home() {
    const {user, setUser} = useContext(UserContext);
    return (
        <div>
            <div style={{backgroundImage : `url(${background})`, backgroundSize:'cover', height:'100vh'}}>
                <p className={'display-1 p-5 text-light ms-3'}> Hello, {user.authenticated ? user.username : ('Guest!')}</p>
                <div className={'d-flex justify-content-center align-items-center'}>
                    {
                        user.authenticated && (<>
                            <Link to={'/jobs'} className={'btn btn-info btn-lg text-white p-2 m-2'}>Jobs</Link>
                            <button onClick={async () => {
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
                            }} className={'btn btn-info btn-lg text-white p-2 m-2'}>Logout</button>
                        </>)
                    }
                    {
                        !user.authenticated && (<>
                            <Link to={'login'} className={'btn btn-info btn-lg text-white p-2 m-2'}>Login</Link>
                            <Link to={'register'} className={'btn btn-info btn-lg text-white p-2 m-2'}>Sign Up</Link>
                        </>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;