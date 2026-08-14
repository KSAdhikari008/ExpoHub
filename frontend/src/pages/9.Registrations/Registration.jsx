import axios from 'axios';
import styles from './Registration.module.css'
import { format } from "date-fns"

function Registration({registration, setOverlay, setIsRegistered}) {
 

  async function unregister(){
    try{
      const res = await axios.delete(`/api/registrations/${registration._id}`);
      alert(res.data.message);
      setIsRegistered(false);
      setOverlay(false);
    }catch(err){
      if(err.response){
        alert(err.response.data.message);
      }else{
        console.log(err.message);
      }
    }
  }
  
  console.log(registration)

  return (
    <div className={styles.overlay}>
      <div className={styles.registration}>
        <h1 className={styles.cardHeading}>Registration Successful</h1>
        <div className={styles.eventDetails}>
          <div className={styles.banner}>
            <img src={registration.event.banner.thumbnailUrl} alt="" />
          </div>
          <div className={styles.details}>
            <div className={styles.titleContainer}>
              <h3 className={styles.title}>{registration.event.title}</h3>
            </div>
            <div className={styles.desc}><span>Description:</span> {registration.event.description}</div>
            <div className={styles.time}><span>Time:</span> {format(new Date(registration.event.startDate),"dd MMM, yyyy")} - {format(new Date(registration.event.endDate),"dd MMM, yyyy")}</div>
            <div className={styles.status}><span>Status:</span> {registration.event.status}</div>
          </div>
        </div>
        <div className={styles.visitorDetails}>        
            <div className={styles.name}><span>User: </span>&nbsp;{registration.visitor.username} </div>
            <div className={styles.regDate}><span>Registration Date: </span>&nbsp;{ format(new Date(registration.createdAt),"EEEE, dd MMMM, yyyy • hh:mm a") }</div>
        </div>
        <button className={styles.unregisterBtn} onClick={unregister}>Unregister</button>
        <button className={styles.overlayBtn} onClick={()=>{setOverlay(false)}}>X</button>
      </div>
    </div>
  );
}

export default Registration;