import React from "react";
import { useAuth } from "../../Context/AuthContext";
import VNavbar from "../../Components/VNavbar";
import HNavbar from "../../Components/HNavbar";

function Internship() {
  const { logOut, user } = useAuth();
  return (
    <>
      <HNavbar />
      {/* <VNavbar /> */}
    </>
  );
}

export default Internship;
