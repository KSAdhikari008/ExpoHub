import styles from './Registration.module.css'

function Registration({registration, setOverlay}) {
 

    
  return (
    <div className={styles.registration}>
      <h1 className={styles.title}>REGISTRATION</h1>
      <h2>{registration._id} {registration.visitor}</h2>
      <button onClick={()=>{setOverlay(false)}}>X</button>
    </div>
  );
}

export default Registration;