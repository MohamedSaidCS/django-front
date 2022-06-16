import React from 'react';
import {useParams} from "react-router-dom";

function Job(props) {
    const {id} = useParams();
    return (
        <div>
            job with id: {id}
        </div>
    );
}

export default Job;