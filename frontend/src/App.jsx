// import { useEffect, useState } from "react";
import Login from "./pages/1.login/Login";
import Register from "./pages/2.Registration/Register";
import Home from "./pages/3.Home/Home";
import {Routes, Route} from 'react-router-dom'
import EventDetails from "./pages/7.Event Details/EventDetails";
import Registration from "./pages/9.Registration/Registration";
import Booking from "./pages/10.Booking/Booking";
import EditEvent from "./pages/8.Edit Event/EditEvent";
import Unauthorized from "./pages/unauthorized";
function App() {
 
//  const [theme, setTheme] = useState('light');

//  useEffect(()=>{
 
//    document.body.className = theme;
 
//  },[theme]);

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} /> 
      <Route path="/register" element={<Register/>} />
      <Route path="/event/:eventId" element={<EventDetails/>} />
      <Route path="/registration" element={<Registration/>} />
      <Route path="/booth-booking" element={<Booking/>} />
      <Route path="/event/:eventId/edit" element={<EditEvent/>} />
      <Route path="/unauthorized" element={<Unauthorized/>} />
    </Routes>
  );
}

export default App;