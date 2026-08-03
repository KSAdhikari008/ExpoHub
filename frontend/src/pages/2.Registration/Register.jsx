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

      const response = await axios.post('/api/auth/register',jsonData,{ withCredentials: true});
      console.log(response.data);
      navigate('/');
      // navigate(`/${response.data.role}-dashboard`);
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
    <div className={styles.registrationPage}>
      <div className={styles.header}>
        <div className={styles["left-section"]}>
          <h1>EXPOHUB</h1>
        </div>
        <div className={styles["right-section"]}>
          <NavLink to="/login" className={styles["login"]}>
            Login
          </NavLink>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.displayPanel}>
          <img src={heroImage} alt="" />
          <div className={styles.heroSection}>
            <h1>Connecting people.</h1>
            <p>Discover exhibitions, connect with exhibitors...</p>
          </div>
        </div>
        <div className={`${styles.registrationPanel} flex justify-center items-center `}>
          <div className={`${styles['registration-form-container']} border-4 border-blue-600 flex flex-col justify-center items-center h-9/10 w-9/10 p-7  `}>
            <div className={`${styles.title} border-2 border-blue-400 basis-1/10`}>
              <h3 className="text-3xl font-medium  ">Welcome Back</h3>
              <p>Sign in to continue to your account</p>
            </div>

            <form onSubmit={handleSubmit}  
                  className={`${styles["registration-form"]} border-2 border-blue-400 basis-9/10 flex flex-col justify-center items-center w-8/10  `}>
              <label htmlFor="name" className="text-left w-2/4 ">Enter User name:
              </label>
              <input type="text" name="username" id="name"  required 
                      className="border rounded mt-2 mb-7 px-4 pb-1 h-1/12 w-2/4" />
              <label htmlFor="email" className="text-left w-2/4 ">Enter Address
              </label>
              <input type="email" name="email" id="email" placeholder="you@example.com" required 
                      className="border rounded mt-2 mb-7 px-7 pb-1 h-1/12 w-2/4" />
              <label htmlFor="password" className="w-2/4 text-left">Password
              </label>
              <input type="password" name="password" id="password" placeholder="Enter your password" required 
                      className="border rounded mt-2 mb-7 px-7 pb-1 h-1/12 w-2/4" />
              <label htmlFor="role" className="w-2/4 text-left">Role
              </label>
              <select name="role" id="role" defaultValue=""  required 
                      className="border rounded mt-2 mb-7 px-3 pb-1 h-1/12 w-2/4" >
                <option value="" disabled >Select</option>
                <option value="Visitor">Visitor</option>
                <option value="Exhibitor">Exhibitor</option>
                <option value="Admin">Admin</option>
              </select>              
              <button type="submit"  
                      className="border w-20 h-8 pb-1 rounded">Register</button>
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
