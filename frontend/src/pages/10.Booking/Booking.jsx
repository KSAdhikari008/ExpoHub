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
    <div className="registratioin">
        {isExhibitor 
            ? <div className="bookBooth">
                <button>Book booth</button>
              </div>  
            : <h1 className="not visitor">403 Unauthorized</h1> 
        }
    </div>
  );
}

export default Booking;