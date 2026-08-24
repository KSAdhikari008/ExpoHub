import { useEffect, useState } from 'react';
import styles from './ExhibitorEventDetails.module.css'
import axios from 'axios'; 
import { useIsUser } from '../context/UserHook';
import { formatEventDate } from '../utils/formatDate';
import { useTheme } from '../context/ThemeHook';
import Booking from '../pages/10.Booking/Booking';

 function ExhibitorEventDetails({eventId}) {

  const { theme } = useTheme();
  const [event, setEvent] = useState();
  const {isUser} = useIsUser();
  const [booths, setBooths] = useState([]);
  const [isBooked, setIsBooked] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState(null);
  const [overlay, setOverlay] = useState(false);



  useEffect(()=>{
    async function getEvent() {
      try{
        const response = await axios.get(`/api/events/${eventId}`);
        setEvent(response.data.event);

        if (!isUser) return;

        const eventBooths = (await axios.get(`/api/booths/${eventId}`)).data.booths;
        setBooths(eventBooths);

        const booth = eventBooths.find(booth =>
          booth.exhibitor && String(booth.exhibitor) === String(isUser.id)
        );
        if(booth){
          setIsBooked(booth);
          setSelectedBooth(booth);
        }
      }catch(err){
        if(err.response){
          if(err.response.data.message !== 'Registration not found'){
            alert(err.response.data.message);
          }
        }else{
          console.log(err.message);
        }
      }
    }

    getEvent();
  },[eventId, isUser]);

  async function bookBooth(){
    if (!selectedBooth) return;

    try{
      const res = await axios.patch(`/api/booths/booking/${selectedBooth._id}`);
      setSelectedBooth(res.data.booth);
      setIsBooked(res.data.booth);
      setOverlay(true);
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
        </div>

      {isBooked 
        ? <button className={styles.booking} onClick={()=>{setSelectedBooth(isBooked); setOverlay(true)}}>booking details</button>
        : <div className={styles.boothsContainer}>
            <div className={styles.boothList}>
              {booths.length > 0 ? booths.map(booth =>
                <button
                  className={`${styles.boothOption} ${selectedBooth?._id === booth._id ? styles.selectedBooth : ''}`}
                  key={booth._id}
                  onClick={()=>{setSelectedBooth(booth)}}
                  disabled={booth.status !== 'Available'}
                >
                  <span>{booth.boothName}</span>
                  <small>{booth.size} · {booth.status}</small>
                </button>
              ) : <p className={styles.emptyBooths}>No booths are available for this event.</p>}
            </div>
            <button className={styles.booking} onClick={bookBooth}>Book Booth</button>
          </div>
      }
      {overlay && <Booking  setOverlay={setOverlay} setIsBooked={setIsBooked} booth={selectedBooth}/> }
    </div>
  );
 }
 
 export default ExhibitorEventDetails;

 