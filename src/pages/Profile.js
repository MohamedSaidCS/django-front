import React from 'react';
import {useParams} from "react-router-dom";

function Profile(props) {
    const {id} = useParams();
    return (
        <div>
            {id && ('different profile')}
            {!id && ('my profile')}
        </div>
    );
}

export default Profile;