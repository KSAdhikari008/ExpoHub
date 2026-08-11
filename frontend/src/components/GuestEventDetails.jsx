import { useNavigate } from 'react-router-dom';
// import styles from './GuestEventDetails.module.css'


function GuestEventDetails() {
 
    const navigate = useNavigate();


 
  return (
    <div className="event-guest">guest
    <button onClick={()=>{navigate('/login')}} >login</button>
            {/* <div className={styles.banner}>
              <img src={event.banner.url} alt="" />
            </div>
            <div className={styles.title}>{event.title}</div>
            <div className={styles.description}>{event.description}</div>
            <div className={styles.venue}>{event.venue}</div>
            <div className={styles.date}>{event.startDate}</div>
            <div className={styles.date}>{event.endDate}</div>
            <div className={styles.status}>{event.status}</div>
            <button onClick={()=>{navigate('/login')}}>Login</button> */}
          </div>
 );
}

export default GuestEventDetails;