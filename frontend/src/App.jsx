// import { useEffect, useState } from "react";
import Login from "./pages/1.login/Login";
import Register from "./pages/2.Registration/Register";
import Home from "./pages/4.Home/Home";
import {Routes, Route} from 'react-router-dom'
function App() {
 
//  const [theme, setTheme] = useState('light');
  
//  useEffect(()=>{
 
//    document.body.className = theme;
 
//  },[theme]);

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
  );
}

export default App;