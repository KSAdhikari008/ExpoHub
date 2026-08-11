// import { useEffect, useState } from 'react';
// import styles from './ExhibitorEventDetails.module.css'
// import axios from 'axios'; 
// import { useNavigate } from 'react-router-dom';

 function ExhibitorEventDetails() {


  // const [booths, setBooths] = useState();
  // const [isBooked, setIsBooked] = useState(false);
  // const [boothId, setBoothId] = useState();

  // const navigate = useNavigate();

  // useEffect(()=>{
  
  //   async function getEvent(){

  //     const boothRes = await axios.get(`/api/booths/${eventId}`);
  //     const booth = boothRes.data.booths.find(booth => booth.exhibitor === userRes.data.id);
  //     if(booth){
  //       setIsBooked({booth: booth, id: booth._id});
  //     }else{
  //       setBooths(boothRes.data.booths);
  //     }
  //   }

  //   getEvent();
      
  // });
 
// async function bookBooth(){
//   if(isBooked){
//         navigate(`/booking/${isBooked.id}`);
//       }
//     try{
//       const response = await axios.post(`/api/booths/booking/${boothId}`);
//       console.log(response.data);
//       navigate(`/booking/${boothId}`)
//     }catch(err){
//       if(err.response){
//         console.log(err.response.data.message);
//       }else{
//         console.log(err.message);
//       }
//     }
//   }

   return (
    <div className="event-exhibitor">exhibitor
                {/* <div className={styles.banner}>
                  <img src={event.banner.url} alt="" />
                </div>
                <div className={styles.title}>{event.title}</div>
                <div className={styles.description}>{event.description}</div>
                <div className={styles.venue}>{event.venue}</div>
                <div className={styles.date}>{event.startDate}</div>
                <div className={styles.date}>{event.endDate}</div>
                <div className={styles.status}>{event.status}</div>
                {booths && booths.map(booth => (
                  <button className="booth" key={booth._id} onClick={()=>{setBoothId(booth._id);console.log(booth._id)}}>{booth.boothName} {booth.size} {booth.status}</button>
                ))}
                <button onClick={bookBooth}>{isBooked ? 'View bookind detials' : 'Book Booth'}</button> */}
    </div>
   );
 }
 
 export default ExhibitorEventDetails;

 