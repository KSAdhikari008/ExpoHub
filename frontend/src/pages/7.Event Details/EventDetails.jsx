import {  useNavigate, useParams } from 'react-router-dom';
import styles from './EventDetails.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function EventDetails() {

  const [event, setEvent] = useState();
  const [user, setUser] = useState({role: 'Guest',id: null});
  const [booths, setBooths] = useState();
  const [isBooked, setIsBooked] = useState(false);
  const [boothId, setBoothId] = useState();

  const {eventId} = useParams(); 
  const navigate = useNavigate();


  useEffect(()=>{
    async function getEvent() {
      try{
        // both promises running in parallel.
        // const [eventRes, userRes] = await Promise.all([ 
        //   axios.get(`/api/events/${eventId}`),
        //   axios.get('/api/auth/me')
        // ])
        // setEvent(eventRes.data.event);
        // setUser(userRes.data.user.role);

        const eventRes = await axios.get(`/api/events/${eventId}`);
        setEvent(eventRes.data.event);
        const userRes = await axios.get('/api/auth/me');
        const userRole = userRes.data.role;
        setUser(userRes.data);

        if(userRole === 'Exhibitor'){
          const boothRes = await axios.get(`/api/booths/${eventId}`);
          const booth = boothRes.data.booths.find(booth => booth.exhibitor === userRes.data.id);
          if(booth){
            setIsBooked({booth: booth, id: booth._id});
          }else{
            setBooths(boothRes.data.booths);
          }
        }

      }catch(err){
        if(err.response){
          console.log(err.response.data.message);
        }else{
          console.log(err.message);
        }
      }
    }

    getEvent();
  
  },[eventId]);


  async function handleRoleAction(){

    if(user.role === "Visitor"){
      registerToEvent();
    }else if(user.role === 'Exhibitor'){
      if(isBooked){
        navigate(`/booking/${isBooked.id}`);
      }else{
        bookBooth();
      }
    }else if(user.role === 'Admin'){
      editEvent();
    }else if(user.role === 'Guest'){
      navigate('/login')
    }

  }

  async function registerToEvent(){
    try{
      const response = await axios.post(`/api/registrations/${eventId}`);
      console.log(response.data);
      navigate('/registration')
    }catch(err){
      if(err.response){
        console.log(err.response.data.message);
      }else{
        console.log(err.message);
      }
    }
  }
  async function bookBooth(){
    try{
      console.log(boothId);
      const response = await axios.post(`/api/booths/booking/${boothId}`);
      console.log(response.data);
      navigate('/booth-booking')
    }catch(err){
      if(err.response){
        console.log(err.response.data.message);
      }else{
        console.log(err.message);
      }
    }
  }
  async function editEvent(){
    // try{
    //   const response = await axios.post(`/api/registrations/${eventId}`);
    //   console.log(response.data);
    //   navigate(`/event/${eventId}/edit`);
    // }catch(err){
    //   if(err.response){
    //     console.log(err.response.data.message);
    //   }else{
    //     console.log(err.message);
    //   }
    // }
  }


  return (
    event && (
      <div className={styles.event} key={event._id}>
        {user.role === "Visitor" ? (
          <div className="event-visitor">
            <div className={styles.banner}>
              <img src={event.banner.url} alt="" />
            </div>
            <div className={styles.title}>{event.title}</div>
            <div className={styles.description}>{event.description}</div>
            <div className={styles.venue}>{event.venue}</div>
            <div className={styles.date}>{event.startDate}</div>
            <div className={styles.date}>{event.endDate}</div>
            <div className={styles.status}>{event.status}</div>
            <button onClick={handleRoleAction}>Register</button>
          </div>
        ) : user.role === "Exhibitor" ? (
          <div className="event-exhibitor">
            <div className={styles.banner}>
              <img src={event.banner.url} alt="" />
            </div>
            <div className={styles.title}>{event.title}</div>
            <div className={styles.description}>{event.description}</div>
            <div className={styles.venue}>{event.venue}</div>
            <div className={styles.date}>{event.startDate}</div>
            <div className={styles.date}>{event.endDate}</div>
            <div className={styles.status}>{event.status}</div>
            {booths && booths.map(booth => (
              <button className="booth" key={booth._id} onClick={()=>{setBoothId(booth._id);console.log(booth._id)}}>{booth.boothName} {booth.size} {booth.status}</button>
            ))}
            <button onClick={handleRoleAction}>{isBooked ? 'View bookind detials' : 'Book Booth'}</button>
          </div>
        ) : user.role === "Admin" ? (
          <div className="event-admin">
            <div className={styles.banner}>
              <img src={event.banner.url} alt="" />
            </div>
            <div className={styles.title}>{event.title}</div>
            <div className={styles.description}>{event.description}</div>
            <div className={styles.venue}>{event.venue}</div>
            <div className={styles.date}>{event.startDate}</div>
            <div className={styles.date}>{event.endDate}</div>
            <div className={styles.status}>{event.status}</div>
            <button onClick={handleRoleAction}>Edit Event</button>
          </div>
        ) : (
          <div className="event-guest">
            <div className={styles.banner}>
              <img src={event.banner.url} alt="" />
            </div>
            <div className={styles.title}>{event.title}</div>
            <div className={styles.description}>{event.description}</div>
            <div className={styles.venue}>{event.venue}</div>
            <div className={styles.date}>{event.startDate}</div>
            <div className={styles.date}>{event.endDate}</div>
            <div className={styles.status}>{event.status}</div>
            <button onClick={handleRoleAction}>Login</button>
          </div>
        )}
      </div>
    )
  );
}

export default EventDetails;