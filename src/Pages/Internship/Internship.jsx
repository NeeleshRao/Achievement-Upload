import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import Navbar from '../../Components/Navbar';

function Internship() {
    const {logOut,user}=useAuth();
  return (
    <>
        <Navbar/>
        HelloWorld
    </>
  )
}

export default Internship
