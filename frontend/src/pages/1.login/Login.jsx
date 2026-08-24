import { NavLink, useNavigate } from "react-router-dom";
import heroImage from "./../../assets/loginHero.jpg";
import styles from "./Login.module.css";
import axios from "axios";
import { useIsUser } from "../../context/UserHook";

function Login() {

  const {setIsUser} = useIsUser();
  const navigate = useNavigate();

  async function handleSubmit(e){
    
    e.preventDefault();
    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData);
    
    try{
      await axios.post('/api/auth/login',jsonData);
      const user = await axios.get('/api/auth/me');
      setIsUser(user.data);
      console.log(user);
      navigate('/');
    }catch(err){
      //  a 4xx or 5xx status code res is treated as error by Axios.is accessed by err.response.
      if(err.response){ 
        console.error(err.response.data.message);
      }else{
      // if no response from the server (network,server down, etc).Then error is accessed throught err directly.
        console.error(err.message);
      }
    }
    
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.header}>
        <div className={styles["left-section"]}>
          <span className={styles.brandMark}>E</span>
          <h1>EXPO<span>HUB</span></h1>
        </div>
        <div className={styles["right-section"]}>
          <span>New here?</span>
          <NavLink to="/register" className={styles.register}>
            Create account
          </NavLink>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.displayPanel}>
          <img src={heroImage} alt="Visitors exploring an exhibition hall" />
          <div className={styles.imageShade} />
          <div className={styles.heroSection}>
            <p className={styles.eyebrow}>THE EXHIBITION COMMUNITY</p>
            <h2>Where ideas<br />meet opportunity.</h2>
            <p>Discover exhibitions, connect with exhibitors, and make your next visit count.</p>
          </div>
        </div>
        <div className={styles.loginPanel}>
          <div className={styles.loginFormContainer}>
            <div className={styles.title}>
              <p className={styles.formEyebrow}>WELCOME BACK</p>
              <h3>Sign in to ExpoHub</h3>
              <p>Sign in to continue to your account</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <label htmlFor="identifier">Email or username</label>
              <input type="text" name="identifier" id="identifier" placeholder="email or username" required 
                      />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder="Enter your password" required 
                      />
              <button type="submit">Login <span aria-hidden="true">→</span></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
