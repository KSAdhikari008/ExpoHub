import { useEffect, useState } from "react";
import axios from 'axios'
import './Home.css'
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeHook";
import { formatEventDate } from "../../utils/formatDate";

function Home() {
 
  const { theme, toggleTheme } = useTheme();
  const [events, setEvents] = useState([]);
  const [isUser, setIsUser] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
  
    async function getEvents() {
      try{
        const response = await axios.get('/api/events');
        setEvents(response.data.events);
        const authRes = await axios.get('/api/auth/me');
        setIsUser(authRes.data.role);
      }catch(err){
        if(err.response){
            // if the error is not due to authentication, log it
            if(err.response.data.message !== 'Authentication token is missing'){ 
              console.log(err.response.data.message);
            }
        }else{
          console.log(err.message);
        }
      }
    }

    getEvents();
  
  },[]);


  function logoutUser(){
    try{
      axios.post('/api/auth/logout');
      setIsUser(false);
      navigate('/login');
    } catch (err) {
      console.log(err.response.data.message);
    }
  }

 

  return (
    <div className={`home-page ${theme === 'light' ? 'light-mode' : ''}`}>
      <header className="home-header">
        <button className="brand-block" onClick={()=>{navigate('/')}}>
          <span className="brand-mark">EXPO</span>
          <span className="brand-name">HUB</span>
        </button>

        <div className="header-actions">
          <button type="button" className="dashboard-btn">Dashboard</button>
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          {isUser && (
            <button type="button" className="logout-btn" onClick={logoutUser}>Logout</button>
          )}
        </div>
      </header>

      <main className="home-main">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">Explore. Connect. Experience.</span>
            <h1>Discover standout events built for real conversations.</h1>
            <p>
              From industry showcases to community meetups, EXPOHUB helps visitors,
              exhibitors, and organizers discover the perfect event experience.
            </p>
          </div>

          <div className="hero-panel">
            <div className="stat-card">
              <span className="stat-label">Live events</span>
              <strong>{events.length || 0}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Participants</span>
              <strong>12k+</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Avg. engagement</span>
              <strong>94%</strong>
            </div>
          </div>
        </section>

        <section className="events-section">
          <div className="section-heading">
            <span>Featured Events</span>
          </div>

          <div className="event-container">
            {events.length > 0 && events.map(event => (
              <Link to={`/event/${event._id}`} className="event" key={event._id}>
                <div className="banner">
                  <img src={event.banner.url} alt={event.title} />
                </div>
                <div className="event-body">
                  <div className="title">{event.title}</div>
                  <div className="description">{event.description}</div>
                  <div className="meta-row">
                    <span className="venue">{event.venue}</span>
                    <span className="status">{event.status}</span>
                  </div>
                  <div className="dates">
                    <span>
                      <strong>Starts:</strong> {formatEventDate(event.startDate, "dd MMM, yyyy")}
                    </span>
                    <span>
                      <strong>Ends:</strong> {formatEventDate(event.endDate, "dd MMM, yyyy")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;