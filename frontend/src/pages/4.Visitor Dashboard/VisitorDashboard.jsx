import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function VisitorDashboard() {

    const [user, setUser] = useState();
 
useEffect(()=>{
 
   async function getVisitor() {
    try{
        const response = await axios.get('/api/user/');
        console.log(response.data);
        setUser(response.data.user);
    }catch(err){
        console.log(err);
    }
   }

   getVisitor();
 
 },[]);

  return (
    <div className="visitor">
      <h1>Visitor Dashboard</h1>
      <div className="user">{user?.username} {user?.email} <br /> {user?.role}</div>
    </div>
  );
}

export default VisitorDashboard;