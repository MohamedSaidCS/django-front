import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import axios from "axios";
import background from "../assets/images/fotis-fotopoulos-LJ9KY8pIH3E-unsplash.jpg";

function Profile() {
    const {id} = useParams();
    const {user, setUser} = useContext(UserContext);
    const [profileUser, setProfileUser] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        if(id === user.id || !id) {
            setProfileUser(user);
        } else {
            const response = await axios.get(`http://127.0.0.1:8000/api/profiles/${id}`, {
                headers: {
                    'Authorization': `Token ${user.token}`,
                }
            });
            const data = await response.data[0];
            setProfileUser(data);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchUser();
        console.log(profileUser);
    }, []);

    if(loading) {
        return <div>Loading...</div>
    }

    return (
        <div style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                height: '100vh',
                paddingTop: "60px"
            }}>
            <div className={'container'}>
                <div className={'d-flex justify-content-center'}>
                    <div className="card text-center col-6">
                        <div className="card-header display-6">
                            Profile Data
                        </div>
                        <div className="card-body">
                            <h5 className="card-title fs-4">{profileUser.username.toUpperCase()}</h5>
                            <p className="card-text fw-bold fs-5">
                            <span>E-Mail: {profileUser.email}</span><br/>
                            <span>Gender: {profileUser.gender}</span><br/>
                            <span>Technologies: {profileUser.tags.map((tag)=>tag.name).join(', ')}</span><br/>
                            <span>Address: {profileUser.address}</span>
                            </p>
                            <div>
                                <button className={'btn btn-success btn-lg'}>Edit Profile</button>
                            </div>
                        </div>
                        <div className="card-footer text-primary fs-4">
                            {profileUser.user_type.toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
            {console.log(profileUser)}
        </div>
    );
}

export default Profile;