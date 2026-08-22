import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Booking.css'


function Booking({setIsBooked, setOverlay}) {

  // const [isExhibitor, setIsExhibitor] = useState();
  const {boothId} =  useParams();
  const navigate = useNavigate();
  
  useEffect(()=>{
  
    async function checkRole(){
        const response = await axios.get('/api/auth/me');
        if(response.data.role === "Exhibitor"){
            // setIsExhibitor(true);
            const response = await axios.get(`/api/booths/${boothId}`)
            console.log(response.data);
        }else{ 
            navigate('/unauthorized');
        }
    }
  
    checkRole();

  },[boothId,navigate]);

  async function unbook(){
    try{
      await axios.patch(`/api/booths/removeBooking/${boothId}`);
      setIsBooked?.(false);
      setOverlay?.(false);
    }catch(err){
      console.log(err);
    }
  }
 
  return (
    <div className="overlay">
             <div className="booking-container">
                <div className="registration-form">Some details to be filled or something.</div>
                <button onClick={unbook}>unbook</button>
                <button onClick={()=>{setOverlay(false)}}>exit</button>
              </div>  
    </div>
  );
}

export default Booking;