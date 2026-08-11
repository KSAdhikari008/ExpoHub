// import { useEffect, useState } from 'react';
// import styles from './VisitorEventDetails.module.css'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

function VisitorEventDetails({eventId}) {

  
  // const [event, setEvent] = useState();

  // const navigate = useNavigate();

  // useEffect(()=>{
  
  //   async function getEvent() {
        
  //     const userRes = await axios.get('/api/auth/me');
  //     if(userRes.data.role !== 'Visitor'){
  //       navigate('/unauthorized');
  //     }

  //     const eventRes = await axios.get(`/api/events/${eventId}`);
  //     setEvent(eventRes.data.event); 
        

  //   }

  //   getEvent()
  
  // });

  // async function registerToEvent(){
  //   try{
  //   const response = await axios.post(`/api/registrations/${eventId}`);
  //   console.log(response.data);
  //   navigate('/registration')
  //   }catch(err){
  //   if(err.response){
  //       console.log(err.response.data.message);
  //   }else{
  //       console.log(err.message);
  //   }
  //   }
  // }

  console.log(eventId);
 
  return (
      <div className="event-visitor"> visitor
                     {/* <div className={styles.banner}>
                       <img src={event.banner.url} alt="" />
                     </div>
                     <div className={styles.title}>{event.title}</div>
                     <div className={styles.description}>{event.description}</div>
                     <div className={styles.venue}>{event.venue}</div>
                     <div className={styles.date}>{event.startDate}</div>
                     <div className={styles.date}>{event.endDate}</div>
                     <div className={styles.status}>{event.status}</div>
                     <button onClick={registerToEvent}>Register</button> */}
            </div>
  );
}

export default VisitorEventDetails;