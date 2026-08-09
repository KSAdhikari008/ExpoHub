import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration() {

  const [isVisitor, setIsVisitor] = useState();
  const navigate = useNavigate();
  
  useEffect(()=>{
  
    async function checkRole(){
        const response = await axios.get('/api/auth/me');
        if(response.data.role === "Visitor"){
            setIsVisitor(true);
        }else{
          navigate('/unauthorized')
        }

    }
  
    checkRole();

  });
 
  return (
    <div className="registratioin">
        {isVisitor && 
             <div className="registration">
                <div className="registration-form">Some details to be filled or something.</div>
            </div>  
        }
    </div>
  );
}

export default Registration;