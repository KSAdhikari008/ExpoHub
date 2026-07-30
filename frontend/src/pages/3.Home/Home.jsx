import { useEffect, useState } from "react";
import axios from 'axios'
import './Home.css'
import { Link } from "react-router-dom";

function Home() {
 
  const [events, setEvents] = useState([]);

  useEffect(()=>{
  
    async function getEvents() {
      try{
        const response = await axios.get('api/events');
        setEvents(response.data.events);
      }catch(err){
        console.log(err);
      }
    }

    getEvents();
  
  },[]);

  return (
    <div className="event-container">
      {events.length > 0 && events.map(event => {
 return <Link to={`/event/:${event._id}`} className="event" key={event._id} >
          <div className="banner">
            <img src={event.banner.url} alt="" />
          </div>
          <div className="title">{event.title}</div>
          <div className="discription">{event.discription}</div>
          <div className="venue">{event.venue}</div>
          <div className="date">{event.startDate}</div>
          <div className="date">{event.endDate}</div>
          <div className="status">{event.status}</div>
        </Link>
})}
    </div>

  );
}

export default Home;