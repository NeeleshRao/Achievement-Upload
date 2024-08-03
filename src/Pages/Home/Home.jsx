import React, { useEffect } from "react";
import { useRef } from "react";
import { firestore } from "../../firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const usnRef = useRef();
  const ref = collection(firestore, "usnmapping");
  const navigate = useNavigate();
  const { logOut, user } = useAuth();

  // useEffect(()=>{
  //   console.log("user",user)
  //   if(user)
  //     navigate('/')
  // },[user])

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(usnRef.current.value);
    const the_usn = usnRef.current.value;
    const q = query(ref, where("user_id", "==", user.uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size == 0) {
      let data = {
        user_id: user.uid,
        usn: usnRef.current.value,
      };

      try {
        addDoc(ref, data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("USN already entered!");
    }
  };
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>{user?.displayName}</h1>
      <form onSubmit={handleSave}>
        <label>Enter USN</label>
        <input type="text" ref={usnRef} />
        <button type="submit">Save</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
