import {  useNavigate, useParams } from 'react-router-dom';
import styles from './EventDetails.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function EventDetails() {

  const [event, setEvent] = useState();
  const [role, setRole] = useState();
  
  const {eventId} = useParams(); 
  const navigate = useNavigate();


  useEffect(()=>{
    async function getEvent() {
      try{
        // both promises running in parallel.
        const [eventRes, userRes] = await Promise.all([ 
          axios.get(`/api/event/${eventId}`),
          axios.get('/api/auth/me')
        ])
        setEvent(eventRes.data.event);
        setRole(userRes.data.role);
      }catch(err){
        console.log(err.response.data.message);
      }
    }

    getEvent();
  
  },[eventId]);


  async function handleRoleAction(){

    if(role === "Visitor"){
      navigate('/registration')
    }else if(role === 'Exhibitor'){
      navigate('/booth-booking')
    }else if(role === 'Admin'){
      navigate(`/event/${eventId}/edit`)
    }else{
      navigate('/login')
    }

  }

  

  return (
    event && (
      <div className={styles.event} key={event._id}>
        <div className={styles.banner}>
          <img src={event.banner.url} alt="" />
        </div>
        <div className={styles.title}>{event.title}</div>
        <div className={styles.description}>{event.description}</div>
        <div className={styles.venue}>{event.venue}</div>
        <div className={styles.date}>{event.startDate}</div>
        <div className={styles.date}>{event.endDate}</div>
        <div className={styles.status}>{event.status}</div>
        <button onClick={handleRoleAction}>
          {role === "Visitor"
            ? "Register"
            : role === "Exhibitor"
              ? "Book booth"
              : role === "Admin" 
                ? "Edit Event"
                : "Log in"}
        </button>
      </div>
    )
  );
}

export default EventDetails;