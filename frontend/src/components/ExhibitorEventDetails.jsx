import { useEffect, useState } from 'react';
import styles from './ExhibitorEventDetails.module.css'
import axios from 'axios'; 
import { useIsUser } from '../context/UserHook';
import { formatEventDate } from '../utils/formatDate';
import { useTheme } from '../context/ThemeHook';
// import Booking from '../pages/10.Booking/Booking';

 function ExhibitorEventDetails({eventId}) {

  const { theme } = useTheme();
  const [event, setEvent] = useState();
  const {isUser} = useIsUser();
  // const [booths, setBooths] = useState();
  // const [isBooked, setIsBooked] = useState(false);
  // const [boothId, setBoothId] = useState();
  // const [overlay, setOverlay] = useState(false);



  useEffect(()=>{
  
    async function getEvent() {
      try{

        // > Get Event.
        const response = await axios.get(`/api/events/${eventId}`);
        setEvent(response.data.event); 
        const boothRes = await axios.get(`/api/booths/${eventId}`);
        const booth = boothRes.data.booths.find(booth => booth.exhibitor === isUser._id);
        // console.log(boothRes)
        // console.log(booth)
        if(booth){
          // setIsBooked({booth: booth, id: booth._id});
        }else{
          // setBooths(boothRes.data.booths);
        }
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

    getEvent();

      
  },[eventId,isUser._id]);
 
// async function bookBooth(){
//     try{ 
//       console.log('booth');
//     }catch(err){
//       if(err.response){
//         console.log(err.response.data.message);
//       }else{
//         console.log(err.message);
//       }
//     }
//   }

   return (
  event &&
    <div className={`${styles.eventCard} ${theme === 'light' ? styles.lightMod : ''}`}>
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
          
        </div>
    </div>
  );
 }

 {/* {!isBooked && 
      <div className="booths">
        {booths && booths.map(booth => (
          <button className="booth" key={booth._id} 
          onClick={()=>{setBoothId(booth._id)}}>
                    {booth.boothName} {booth.size} {booth.status}
          </button>
          ))}
      </div>} */}
      {/* {isBooked 
          ? <button className={styles.primaryBtn} onClick={()=>{setOverlay(true)}}>View Booking details</button> 
          : <button className={styles.primaryBtn} onClick={bookBooth}>Book Booth</button> 
      } */}
  {/* {overlay && <Booking  setOverlay={setOverlay} setIsBooked={setIsBooked}/> } */}

 
 export default ExhibitorEventDetails;

 