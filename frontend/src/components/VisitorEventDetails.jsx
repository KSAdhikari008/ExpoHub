import { useEffect, useState} from 'react';
import styles from './VisitorEventDetails.module.css'
import axios from 'axios';
import Registration from '../pages/9.Registrations/Registration';
import { useTheme } from '../context/ThemeHook';
import { formatEventDate } from '../utils/formatDate';

function VisitorEventDetails({eventId}) {

  const { theme } = useTheme();
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
    <div className={`${styles.eventCard} ${theme === 'light' ? styles.lightMode : ''}`}>
        <div className={styles.banner}>
          <img src={event.banner.url} alt={event.title} />
        </div>

        <div className={styles.content}>
          <div className={styles.title}>{event.title}</div>
          <div className={styles.description}>{event.description}</div>

          <div className={styles.detailRows}>
            <div className={styles.metaItem}>
              <span className={styles.label}>Venue</span>
              <span>{event.venue}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.label}>Status</span>
              <span className={styles.status}>{event.status}</span>
            </div>
          </div>

          <div className={styles.dateBlock}>
            <div className={styles.dateItem}>
              <span className={styles.label}>Starts</span>
              <span>{formatEventDate(event.startDate,"dd MMM, yyyy")}</span>
            </div>
            <div className={styles.dateItem}>
              <span className={styles.label}>Ends</span>
              <span>{formatEventDate(event.endDate,"dd MMM, yyyy")}</span>
            </div>
          </div>

          {isRegistered 
              ? <button className={styles.primaryBtn} onClick={()=>{setOverlay(true)}}>View Registration details</button> 
              : <button className={styles.primaryBtn} onClick={registerToEvent}>Register</button> 
          }
        </div>
        {overlay && <Registration registration={registration} setOverlay={setOverlay} setIsRegistered={setIsRegistered}/>}
    </div>
);
}

export default VisitorEventDetails;