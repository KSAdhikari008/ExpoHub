import axios from "axios";
import { createContext, useEffect, useState,  } from "react";

const UserContext = createContext();

export function UserContextProvider({children}) {
    
  const [isUser, setIsUser] = useState(false);    

  useEffect(()=>{
    
    async function getUserStatus() {
      try{
        // const response = await axios.get('/api/events');
        // setEvents(response.data.events);
        const authRes = await axios.get('/api/auth/me');
        setIsUser(authRes.data.role);
      }catch(err){
        if(err.response){
            // if the error is not due to authentication, log it
            if(err.response.data.message !== 'Authentication token is missing'){ 
              console.log(err.response.data.message);
            }
        }else{
          console.log(err.message);
        }
      }
    }

    getUserStatus();
    
  },[]);
 
  const value = {
    isUser,
    setIsUser
  }
  return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
  );
}

export  {UserContext};