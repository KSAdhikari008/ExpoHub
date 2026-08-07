import { useEffect, useState } from "react";
import axios from 'axios'
import './Home.css'
import { Link } from "react-router-dom";

function Home() {
 
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState();


  useEffect(()=>{
  
    async function getEvents() {
      try{
        const response = await axios.get('/api/event');
        setEvents(response.data.events);
        setUser(response.data.user);
      }catch(err){
        console.log(err.response.data.message);
      }
    }

    getEvents();
  
  },[]);

  return (<>
      <h1>{user?.email}</h1>
    <div className="event-container">
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