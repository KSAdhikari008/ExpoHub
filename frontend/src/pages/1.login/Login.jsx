import { NavLink, useNavigate } from "react-router-dom";
import heroImage from "./../../assets/loginHero.jpg";
import styles from "./Login.module.css";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  async function handleSubmit(e){
    
    e.preventDefault();
    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData);
    
    try{

      const response = await axios.post('/api/auth/login',jsonData,{ withCredentials: true});
      console.log(response.data);
      navigate('/');
      // navigate(`/${response.data.role}-dashboard/`);
    }catch(err){
      console.log(err);
    }
    
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.header}>
        <div className={styles["left-section"]}>
          <h1>EXPOHUB</h1>
        </div>
        <div className={styles["right-section"]}>
          <NavLink to="/register" className={styles["register"]}>
            Register
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
        <div className={`${styles.loginPanel} flex justify-center items-center `}>
          <div className={`${styles['login-form-container']} border-4 border-blue-600 flex flex-col justify-center items-center h-9/10 w-9/10 p-7  `}>
            <div className={`${styles.title} border-2 border-blue-400 basis-1/10`}>
              <h3 className="text-3xl font-medium  ">Welcome Back</h3>
              <p>Sign in to continue to your account</p>
            </div>
            <form onSubmit={handleSubmit} className={`${styles["login-form"]} border-2 border-blue-400 basis-9/10 flex flex-col justify-center items-center w-8/10  `}>
              <label htmlFor="email" className="text-left w-2/4 ">Enter Address</label>
              <input type="email" name="email" id="email" placeholder="you@example.com" required 
                      className="border rounded mt-2 mb-7 pl-7 pb-1 h-1/12 w-2/4" />
              <label htmlFor="password" className="w-2/4 text-left">Password</label>
              <input type="password" name="password" id="password" placeholder="Enter your password" required 
                      className="border rounded mt-2 mb-7 pl-7 pb-1 h-1/12 w-2/4" />
              <button type="submit" 
                      className="border w-16 h-7 rounded">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
