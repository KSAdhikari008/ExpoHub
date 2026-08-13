import axios from 'axios';
import styles from './Registration.module.css'

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
    
  return (
    <div className={styles.registration}>
      <h1 className={styles.title}>REGISTRATION</h1>
      <h2>{registration._id} {registration.visitor}</h2>
      <button onClick={unregister}>Unregister</button>
      <button onClick={()=>{setOverlay(false)}}>X</button>
    </div>
  );
}

export default Registration;