// import { useEffect, useState } from "react";
import Login from "./pages/1.login/Login";
import Register from "./pages/2.Registration/Register";
import Home from "./pages/3.Home/Home";
import {Routes, Route} from 'react-router-dom'
import CreateEvent from "./pages/6.Admin Dashboard/CreateEvent";
import EventDetails from "./pages/7.Visitor Event Details/EventDetails";
function App() {
 
//  const [theme, setTheme] = useState('light');

//  useEffect(()=>{
 
//    document.body.className = theme;
 
//  },[theme]);

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/event/:eventId" element={<EventDetails/>} />
      <Route path="/create-event" element={<CreateEvent/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
  );
}

export default App;