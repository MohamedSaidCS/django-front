import React, {useState} from 'react'
import {useContext, useEffect} from "react";
import {UserContext} from "../App";
import axios from "axios"
import {Link, useNavigate} from "react-router-dom";
import background from "../assets/images/fotis-fotopoulos-LJ9KY8pIH3E-unsplash.jpg";

const Notifications = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  const getAllNotifications = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/notification",{
      headers : {
        'Authorization': `Token ${user.token}`
      }
    });
    const data = await response.data
    setNotifications(data)
  }

  const renderNotifications = () => {
    console.log(notifications)
    return( notifications.map((notification) =>{
      return(
          <div className={'align-self-center col-6'}>
          <div key={notification.id} className={'card mb-4'}>
            <h5 className="card-header">Notification Time:{notification.modification_time}</h5>
            <div className="card-body">
              <h5 className="card-title">{notification.name}</h5>
            </div>
          </div>
          </div>
      )
        })

    )
  }

  useEffect(() => {
    if (user.authenticated)
      getAllNotifications();
    else
      navigate('/login');
  }, []);

  return (
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      height: '100vh',
      paddingTop: "60px"
    }}>
      <div className={'container'}>
        <div className={'d-flex flex-column justify-content-center'}>
          {notifications.length > 0 && renderNotifications()}
        </div>
      </div>
    </div>
  )
}

export default Notifications