import React from 'react';
import background from '../assets/images/fotis-fotopoulos-LJ9KY8pIH3E-unsplash.jpg'

function Home() {
    return (
        <div>
            <div style={{backgroundImage : `url(${background})`, backgroundSize:'cover', height:'100vh'}}>
                <p className={'display-1 p-5 text-light ms-3'}> Hello, Guest!</p>
                <div className={'d-flex justify-content-center align-items-center'}>
                    <button className={'btn btn-info btn-lg text-white p-2 m-2'}>Login</button>
                    <button className={'btn btn-info btn-lg text-white p-2 m-2'}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default Home;