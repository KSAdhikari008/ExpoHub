import { useEffect, useState } from 'react';
import styles from './ExhibitorEventDetails.module.css'
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { useIsUser } from '../context/UserHook';
import { formatEventDate } from '../utils/formatDate';
import { useTheme } from '../context/ThemeHook';
import Booking from '../pages/10.Booking/Booking';

 function ExhibitorEventDetails({eventId}) {

  const { theme } = useTheme();
  const [booths, setBooths] = useState();
  const [event, setEvent] = useState();
  const [isBooked, setIsBooked] = useState(false);
  const [boothId, setBoothId] = useState();
  const {isUser} = useIsUser();
  const [overlay, setOverlay] = useState(false);


  const navigate = useNavigate();

  useEffect(()=>{
  
    async function getEvent() {
      try{

        // > Get Event.
        const response = await axios.get(`/api/events/${eventId}`);
        setEvent(response.data.event); 
        const boothRes = await axios.get(`/api/booths/${eventId}`);
        const booth = boothRes.data.booths.find(booth => booth.exhibitor === isUser._id);
        console.log(boothRes)
        console.log(booth)
        if(booth){
          setIsBooked({booth: booth, id: booth._id});
        }else{
          setBooths(boothRes.data.booths);
        }
        
        // // > CHECK IF ALREADY REGISTERD.
        // const regRes = await axios.get(`/api/registrations/${eventId}`);
        // setRegistration(regRes.data.registration)
        // setIsRegistered(true);

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
 
async function bookBooth(){
    try{
          console.log(boothId);

      const response = await axios.post(`/api/booths/booking/${boothId}`);
      console.log(response.data);
      navigate(`/booking/${boothId}`)
    }catch(err){
      if(err.response){
        console.log(err.response.data.message);
      }else{
        console.log(err.message);
      }
    }
  }

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
          <div className="booths">
            {booths && booths.map(booth => (
              <button className="booth" key={booth._id} 
              onClick={()=>{setBoothId(booth._id);console.log(booth._id)}}>
                        {booth.boothName} {booth.size} {booth.status}
              </button>
              ))}
          </div>
          {isBooked 
              ? <button className={styles.primaryBtn} onClick={()=>{setOverlay(true)}}>View Booking details</button> 
              : <button className={styles.primaryBtn} onClick={bookBooth}>Book Booth</button> 
          }
        </div>
        {overlay && <Booking booth={isBooked} setOverlay={setOverlay} setIsBooked={setIsBooked}/> }
    </div>
  );
 }
 
 
 export default ExhibitorEventDetails;

 