import { useEffect, useState } from "react";
import { useRef } from "react";
import { firestore } from "../../firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SubmitUsn from "./SubmitUsn";

function Home() {
  const usnRef = useRef();
  const [usnStatus, setUsnStatus] = useState(false);
  const ref = collection(firestore, "usnmapping");
  const navigate = useNavigate();
  const { logOut, user } = useAuth();

  // useEffect(()=>{
  //   console.log("user",user)
  //   if(user)
  //     navigate('/')
  // },[user])

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const onPageReload = async () => {
      const q = query(ref, where("user_id", "==", user.uid));

      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.size);
      if (querySnapshot.size == 0) {
        setUsnStatus(false);
      } else {
        setUsnStatus(true);
      }
    };
    onPageReload();
  });

  return (
    <div>
      <h1>{user?.displayName}</h1>

      <button onClick={handleLogout}>Logout</button>
      <SubmitUsn usnStatus={usnStatus} />
    </div>
  );
}

export default Home;
