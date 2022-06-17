import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import axios from "axios";

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
        <div>
            {console.log(profileUser)}
        </div>
    );
}

export default Profile;