import Login from "./pages/1.login/Login";
import Register from "./pages/2.Registration/Register";
import Home from "./pages/3.Home/Home";
import {Routes, Route} from 'react-router-dom'
import EventDetails from "./pages/7.Event Details/EventDetails";
import Booking from "./pages/10.Booking/Booking";
import EditEvent from "./pages/8.Edit Event/EditEvent";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Registrations from "./pages/9.Registrations/Registrations";
import Registration from "./pages/9.Registrations/Registration";
import {ThemeProvider} from "./context/ThemeContext";

function App() {

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} /> 
        <Route path="/register" element={<Register/>} />
        <Route path="/event/:eventId" element={<EventDetails/>} />
        <Route path="/registrations" element={<Registrations/>} />
        <Route path="/registration/:registrationId" element={<Registration/>} />
        <Route path="/booking/:boothId" element={<Booking/>} />
        <Route path="/event/:eventId/edit" element={<EditEvent/>} />
        <Route path="/unauthorized" element={<Unauthorized/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;