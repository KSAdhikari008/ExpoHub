import { useEffect, useState} from 'react';
import styles from './VisitorEventDetails.module.css'
import axios from 'axios';
import Registration from '../pages/9.Registrations/Registration';

function VisitorEventDetails({eventId}) {

  
  const [event, setEvent] = useState();
  const [regCard, setRegCard] = useState();
  const [overlay, setOverlay] = useState(false);

  

  useEffect(()=>{
  
    async function getEvent() {

      const response = await axios.get(`/api/events/${eventId}`);
      setEvent(response.data.event); 
    }

    getEvent()
  
  },[eventId]);

  async function registerToEvent(){
    try{
      const response = await axios.post(`/api/registrations/${eventId}`);
      // navigate(`/registration/${response.data.registration._id}`);
      console.log(response.data.registration)

      const res = await axios.get(`/api/registrations/${response.data.registration._id}`);
      // console.log(res.data);
      setRegCard(res.data.registration);
      setOverlay(true);

    }catch(err){
      if(err.response){
        alert(err.response.data.message);
      }else{
        console.log(err.message);
      }
    }
  }

  async function unRegisterToEvent(){

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
        <button onClick={registerToEvent}>Register</button> 
        <button onClick={unRegisterToEvent}>Unregister</button> 
        {overlay && <Registration registration={regCard} setOverlay={setOverlay}/>}
    </div>
);
}

export default VisitorEventDetails;