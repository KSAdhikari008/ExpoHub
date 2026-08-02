import axios from "axios";
// import { useState } from "react";
import { useEffect } from "react";

function VisitorDashboard() {

    // const [user, setUser] = useState();
 
 useEffect(()=>{
 
   async function getVisitor() {
    try{
        const response = await axios.get('/api/user/',{withCredentials: true});
        console.log(response.data);
        // setUser(response.data.user);
    }catch(err){
        console.log(err);
    }
   }

   getVisitor();
 
 });

  return (
    <div className="visitor">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae laborum, cumque earum veritatis ipsam debitis architecto facilis ullam iusto perferendis similique cupiditate dolor dolores rerum qui reprehenderit soluta autem magnam!
        </p>
    </div>
  );
}

export default VisitorDashboard;