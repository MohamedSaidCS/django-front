import background from "../assets/images/fotis-fotopoulos-LJ9KY8pIH3E-unsplash.jpg";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import axios from "axios";

function EditProfile() {
    const {user} = useContext(UserContext);
    const [profileUser, setProfileUser] = useState({});
    const [error, setError] = useState('');
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState('');

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

    const handleEdit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        for (let att in profileUser)
            if (!profileUser[att])
                delete profileUser[att]
        try {
            await axios.put(`http://127.0.0.1:8000/api/profiles/edit/${user.id}`, profileUser, {
                headers: {
                    'Authorization': `Token ${user.token}`,
                }
            });
            setSuccess('Profile Edited Successfully!');
        } catch (e) {
            console.log(profileUser);
            console.log(e.response.data);
            let errors = '';
            let responseErrors = e.response.data;
            for (let error in responseErrors) {
                errors += `${error}: ${responseErrors[error].join(', ')} \n`;
            }
            setError(errors);
        }
    }

    useEffect(() => {
        setProfileUser(user);
        fetchTags();
        setLoading(false);
    }, []);

    if (loading)
        return (<div>Loading...</div>);

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            height: '140vh',
            paddingTop: "60px"
        }}>
            <div className={'container d-flex flex-column'} style={{}}>
                <div className="card">
                    <h5 className="card-header">Register</h5>
                    <div className="card-body bg-transparent">
                        <form onSubmit={handleEdit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label fw-bold fs-5">Username</label>
                                <input type="text" className="form-control" id="username" value={profileUser.username}
                                       onChange={(e) => setProfileUser({...profileUser, username: e.target.value})}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-bold fs-5">Email address</label>
                                <input type="email" className="form-control" id="email" value={profileUser.email}
                                       onChange={(e) => setProfileUser({...profileUser, email: e.target.value})}/>
                            </div>
                            {profileUser.user_type === 'developer' && (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="gender" className="form-label fw-bold fs-5">Gender</label>
                                        <select id="gender" className="form-select" value={user.gender}
                                                onChange={(e) => setProfileUser({
                                                    ...profileUser,
                                                    gender: e.target.value
                                                })}>
                                            <option value="">Select Type</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="tags" className="form-label fw-bold fs-5">Tags</label>
                                        <select multiple id="tags" className="form-select"
                                                onChange={(e) => setProfileUser({
                                                    ...profileUser,
                                                    tags: Array.from(e.target.selectedOptions, option => option.value)
                                                })}>
                                            {renderTags()}
                                        </select>
                                    </div>
                                </>
                            )}

                            {profileUser.user_type === 'recruiter' && (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="address" value={profileUser.address}
                                               onChange={(e) => setProfileUser({
                                                   ...profileUser,
                                                   address: e.target.value
                                               })}/>
                                    </div>
                                </>
                            )}
                            <button type="submit" className="btn btn-primary">Save</button>
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
    );
}

export default EditProfile;