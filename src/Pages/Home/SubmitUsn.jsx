import React, { useEffect } from "react";
import { useRef } from "react";
import { firestore } from "../../firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const SubmitUsn = (props) => {
  const status = props.usnStatus;
  const usnRef = useRef();
  const ref = collection(firestore, "usnmapping");
  const { logOut, user } = useAuth();

  const handleSave = async (e) => {
    e.preventDefault();

    console.log(usnRef.current.value);
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

  if (status) {
    return <div></div>;
  } else {
    return (
      <div>
        <form onSubmit={handleSave}>
          <label>Enter USN</label>
          <input type="text" ref={usnRef} />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
};

export default SubmitUsn;
