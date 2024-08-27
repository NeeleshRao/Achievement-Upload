import React, { useEffect } from "react";
import { useRef } from "react";
import { firestore } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const messageRef = useRef();
  const ref = collection(firestore, "messages");
  const navigate=useNavigate();
  const {logOut,user}=useAuth();

  useEffect(()=>{
    console.log("user",user)
    // if(user)
    //   navigate('/')
  },[user])

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(messageRef.current.value);

    let data = {
      message: messageRef.current.value,
    };

    try {
      addDoc(ref, data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout=async()=>{
      try{
        await logOut();
      }catch(err){
        console.log(err)
      }
  }
  return (
    <div>
      <h1>{user?.displayName}</h1>
      {user.photoURL && <img src={user?.photoURL} className="w-10 rounded-full"></img>}
      <form onSubmit={handleSave}>
        <label>Enter Message</label>
        <input type="text" ref={messageRef} />
        <button type="submit">Save</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
