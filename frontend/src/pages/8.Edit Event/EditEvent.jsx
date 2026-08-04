import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditEvent() {

 const [isAdmin, setIsAdmin] = useState();
 const navigate = useNavigate();
  
  useEffect(()=>{
  
    async function checkRole(){
        const response = await axios.get('/api/auth/me');
        if(response.data.role === "Admin"){
            setIsAdmin(true);
        }else{
            navigate('/unauthorized');
        }
    }
  
    checkRole();

  });
 
  return (
    <div className="admin">
        {isAdmin 
            ? <div className="editevent">
                <button>Edit Event</button>
              </div> 
            : <h1 className="not visitor">403 Unauthorized</h1> 
        }
    </div>
  );
}

export default EditEvent;