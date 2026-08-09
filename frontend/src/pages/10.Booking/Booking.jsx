import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Booking() {

  const [isExhibitor, setIsExhibitor] = useState();
  const navigate = useNavigate();
  
  useEffect(()=>{
  
    async function checkRole(){
        const response = await axios.get('/api/auth/me');
        if(response.data.role === "Exhibitor"){
            setIsExhibitor(true);
        }else{
          navigate('/unauthorized');
        }
    }
  
    checkRole();

  });
 
  return (
    <div className="book-Booth">
        {isExhibitor && 
             <div className="bookBooth">
                <div className="registration-form">Some details to be filled or something.</div>
              </div>  
        }
    </div>
  );
}

export default Booking;