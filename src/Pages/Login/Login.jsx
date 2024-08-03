import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const {googleLogin,user}=useAuth();
    const navigate=useNavigate();
  const handleLogin =async () => {
    try {
        await googleLogin();
        console.log("Success")
    } catch (err) {
        console.log("hello",err)
    }
  };

  useEffect(()=>{
    console.log(user)
    if(user!=null)
      navigate('/home')
  },[user])

  return (
    <div>
      <button onClick={handleLogin}>LOGIN</button>
    </div>
  );
}
