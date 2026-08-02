import { useParams } from 'react-router-dom';
import styles from './EventDetails.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function EventDetails() {

  const [event, setEvent] = useState();

  const {eventId} = useParams(); 
  
  

  useEffect(()=>{
    
  async function getEvent() {
  try{
    const response = await axios.get(`/api/event/${eventId}`);
    setEvent(response.data.event);
  }catch(err){
    console.log(err)
  }
    }

    getEvent();

  
  },[eventId]);

  return ( 
    event && 
    <div className={styles.event} key={event._id} >
        <div className={styles.banner}>
          <img src={event.banner.url} alt="" />
        </div>
        <div className={styles.title}>{event.title}</div>
        <div className={styles.discription}>{event.discription}</div>
        <div className={styles.venue}>{event.venue}</div>
        <div className={styles.date}>{event.startDate}</div>
        <div className={styles.date}>{event.endDate}</div>
        <div className={styles.status}>{event.status}</div>
    </div>
);
}

export default EventDetails;