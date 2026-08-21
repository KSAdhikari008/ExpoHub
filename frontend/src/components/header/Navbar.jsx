import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeHook";
import { useIsUser } from "../../context/UserHook";
import axios from "axios";
import './Navbar.css'
function Navbar() {
 
    const {theme,toggleTheme} = useTheme();
    const {isUser, setIsUser} = useIsUser();
    const navigate = useNavigate();

      function toggleLog() {
        try {
          axios.post("/api/auth/logout");
          navigate("/login");
          setIsUser(false);
        } catch (err) {
          console.log(err.response.data.message);
        }
      }
 
  return (
    <header className="home-header">
        <button className="brand-block" onClick={()=>{navigate('/')}}>
          <span className="brand-mark">EXPO</span>
          <span className="brand-name">HUB</span>
        </button>

        <div className="header-actions">
          {isUser && (
            <button type="button" className="dashboard-btn">Dashboard</button>
          )}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
            <button type="button" className="logout-btn" onClick={toggleLog}>
              {isUser ? "Logout" : "Login"}
            </button>
        </div>
      </header>
  );
}

export default Navbar;