import { useEffect, useState } from "react";
import axios from 'axios'
import './Home.css'
import { Link, useNavigate } from "react-router-dom";

function Home() {
 
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
            if(err.response.data.message !== 'Authentication token is missing or invalid'){ 
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

  return (<>
    <div className="event-container">
      {isUser && <button onClick={logoutUser}>Logout</button>}

      {events.length > 0 && events.map(event => {
 return <Link to={`/event/${event._id}`} className="event" key={event._id} >
          <div className="banner">
            <img src={event.banner.url} alt="" />
          </div>
          <div className="title">{event.title}</div>
          <div className="description">{event.description}</div>
          <div className="venue">{event.venue}</div>
          <div className="date">{event.startDate}</div>
          <div className="date">{event.endDate}</div>
          <div className="status">{event.status}</div>
        </Link>
})}
    </div>

</>  );
}

export default Home;