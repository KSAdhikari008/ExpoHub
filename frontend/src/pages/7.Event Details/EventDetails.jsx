import styles from './EventDetails.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ExhibitorEventDetails from '../../components/ExhibitorEventDetails';
import VisitorEventDetails from '../../components/VisitorEventDetails';
import AdminEventDetails from '../../components/AdminEventDetails';
import GuestEventDetails from '../../components/GuestEventDetails';
import { useParams } from 'react-router-dom';

function EventDetails() {

  const [role, setRole] = useState('Guest');
  
  const {eventId} = useParams();

  useEffect(()=>{
    async function getEvent() {
      try{

        const response = await axios.get('/api/auth/me');
        setRole(response.data.role);

      }catch(err){
        if(err.response){
          console.log(err.response.data.message);
          // setRole('Guest');
        }else{
          console.log(err.message);
        }
      }
    }

    getEvent();
  
  },[]);


  return (
    <div className={styles.event}>
        {role === "Visitor" 
          ? <VisitorEventDetails eventId={eventId}/>
          : role === "Exhibitor" 
            ? <ExhibitorEventDetails/>
            : role === "Admin" 
              ? <AdminEventDetails/>
              : <GuestEventDetails/>
        }
      </div>
  );
}

export default EventDetails;