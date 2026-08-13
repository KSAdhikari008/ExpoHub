import { useEffect, useState} from 'react';
import styles from './VisitorEventDetails.module.css'
import axios from 'axios';
import Registration from '../pages/9.Registrations/Registration';

function VisitorEventDetails({eventId}) {

  
  const [event, setEvent] = useState();
  const [registration, setRegistration] = useState();
  const [overlay, setOverlay] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  

  useEffect(()=>{
  
    async function getEvent() {
      try{

        // > Get Event.
        const response = await axios.get(`/api/events/${eventId}`);
        setEvent(response.data.event); 
        
        // > CHECK IF ALREADY REGISTERD.
        const regRes = await axios.get(`/api/registrations/${eventId}`);
        setRegistration(regRes.data.registration)
        setIsRegistered(true);

      }catch(err){
        
        if(err.response){          
          // > Only alert if res comes from events api call.
          if(err.response.data.message !== 'Registration not found'){
            alert(err.response.data.message);
          }
        }else{
          console.log(err.message);
        }
      }
    }
    getEvent()
  },[eventId]);

  async function registerToEvent(){
    try{

      // > CREATE REGISTRATION
      const response = await axios.post(`/api/registrations/${eventId}`);
      setRegistration(response.data.registration);
      setIsRegistered(true);
      setOverlay(true);
    }catch(err){
      if(err.response){
        alert(err.response.data.message);
      }else{
        console.log(err.message);
      }
    }
  }

 
  return (
  event && 
    <div className="event-visitor"> visitor
        <div className={styles.banner}>
          <img src={event.banner.url} alt="" />
        </div>
        <div className={styles.title}>{event.title}</div>
        <div className={styles.description}>{event.description}</div>
        <div className={styles.venue}>{event.venue}</div>
        <div className={styles.date}>{event.startDate}</div>
        <div className={styles.date}>{event.endDate}</div>
        <div className={styles.status}>{event.status}</div>
        {isRegistered 
            ? <button onClick={()=>{setOverlay(true)}}>View Registration details</button> 
            : <button onClick={registerToEvent}>Register</button> 
        }
        {overlay && <Registration registration={registration} setOverlay={setOverlay} setIsRegistered={setIsRegistered}/>}
    </div>
);
}

export default VisitorEventDetails;