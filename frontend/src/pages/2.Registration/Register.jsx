import { NavLink, useNavigate } from "react-router-dom";
import heroImage from "./../../assets/registerHero3.jpg";
import styles from "./Register.module.css";
import axios from 'axios'

function Register() {

  const navigate = useNavigate();

  async function handleSubmit(e){
    
    e.preventDefault();
    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData);
    
    try{
      await axios.post('/api/auth/register',jsonData,);
      navigate('/');
    }catch(err){
      //  a 4xx or 5xx status code res is treated as error by Axios.is accessed by err.response.
      if(err.response){ 

        if(Array.isArray(err.response.data.message)){ // input validation err's are in an array.
           let errorMessage = '';
           err.response.data.message.forEach((m, index) => errorMessage += (index+1) + '. ' + m.msg + '\n');
           alert(errorMessage);
        }else{
          alert(err.response.data.message);
        }
        
      }else if(err.request){ // req error , when no res to req.
         alert("Unable to connect to the server.");
         console.error("No response received:", err.message);

      }else{
      // if no response from the server (network,server down, etc).Then error is accessed throught err directly.
         alert("Something went wrong.");
         console.error("Request setup error:", err.message);
      }
    }
    
  }

  return (
    <div className={styles.registrationPage}>
      <div className={styles.header}>
        <div className={styles["left-section"]}>
          <span className={styles.brandMark}>E</span>
          <h1>EXPO<span>HUB</span></h1>
        </div>
        <div className={styles["right-section"]}>
          <span>Already a member?</span>
          <NavLink to="/login" className={styles.login}>
            Login
          </NavLink>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.displayPanel}>
            <img src={heroImage} alt="A busy exhibition event" />
            <div className={styles.imageShade} />
          <div className={styles.heroSection}>
              <p className={styles.eyebrow}>YOUR NEXT CONNECTION STARTS HERE</p>
              <h2>Bring your<br />curiosity with you.</h2>
              <p>One place to find events, meet people, and turn inspiration into action.</p>
          </div>
        </div>
          <div className={styles.registrationPanel}>
            <div className={styles.registrationFormContainer}>
              <div className={styles.title}>
                <p className={styles.formEyebrow}>JOIN EXPOHUB</p>
                <h3>Create your account</h3>
                <p>Choose how you would like to take part.</p>
            </div>

              <form onSubmit={handleSubmit} className={styles.registrationForm}>
                <label htmlFor="name">Username</label>
              <input type="text" name="username" id="name"  required 
                  />
                <label htmlFor="email">Email address</label>
              <input type="email" name="email" id="email" placeholder="you@example.com" required 
                  />
                <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder="Enter your password" required 
                  />
                <label htmlFor="role">I am joining as</label>
              <select name="role" id="role" defaultValue=""  required 
                  >
                <option value="" disabled >Select</option>
                <option value="Visitor">Visitor</option>
                <option value="Exhibitor">Exhibitor</option>
                <option value="Admin">Admin</option>
              </select>              
                    <button type="submit">Create account <span aria-hidden="true">→</span></button>
            </form>
              {/*Controlled vs Uncontrolled <select>
              Uncontrolled (<select> without a value prop):
              - The browser manages the selected option.
              - If the first option is disabled, the browser skips it and selects the first enabled option.

              Controlled (<select value={formData.role}>):
              - React manages the selected option.
              - React displays the option whose value matches formData.role.
              - If formData.role === "", React displays the <option value=""> even if it's disabled.
              - The disabled attribute only prevents the user from selecting that option after the initial render; it does not stop React from displaying it as the current value.

              This is the standard way to create a placeholder for a controlled <select>.*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
