import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


function Booking() {

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
 
  return (
    <div className="book-Booth">
             <div className="bookBooth">
                <div className="registration-form">Some details to be filled or something.</div>
              </div>  
    </div>
  );
}

export default Booking;