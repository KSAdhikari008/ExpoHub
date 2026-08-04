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
        {isVisitor 
            ? <div className="registration">
                <button>registration</button>
            </div>  
            : <h1 className="not visitor">403 Unauthorized</h1> 
        }
    </div>
  );
}

export default Registration;