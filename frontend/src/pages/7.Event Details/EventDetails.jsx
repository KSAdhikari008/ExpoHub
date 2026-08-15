import styles from './EventDetails.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ExhibitorEventDetails from '../../components/ExhibitorEventDetails';
import VisitorEventDetails from '../../components/VisitorEventDetails';
import AdminEventDetails from '../../components/AdminEventDetails';
import GuestEventDetails from '../../components/GuestEventDetails';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeHook';

function EventDetails() {

  const { theme, toggleTheme } = useTheme();
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
    <div className={`${styles.page} ${theme === 'light' ? styles.lightMode : ''}`}>
      <header className={styles.topbar}>
        <div className={styles.brandBlock}>
          <span className={styles.brandMark}>EXPO</span>
          <span className={styles.brandName}>HUB</span>
        </div>

        <div className={styles.headerActions}>
          <button type="button" className={styles.dashboardBtn}>Dashboard</button>
          <button
            type="button"
            className={styles.themeToggleBtn}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <button type="button" className={styles.logoutBtn}>Logout</button>
        </div>
      </header>

      <main className={styles.content}>
        {role === "Visitor" 
          ? <VisitorEventDetails eventId={eventId}/>
          : role === "Exhibitor" 
            ? <ExhibitorEventDetails/>
            : role === "Admin" 
              ? <AdminEventDetails/>
              : <GuestEventDetails/>
        }
      </main>
    </div>
  );
}

export default EventDetails;