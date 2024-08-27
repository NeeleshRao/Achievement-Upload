import React from 'react'
import HNavbar from '../../Components/HNavbar';
import VNavbar from "../../Components/VNavbar";
import Content from './Content';
import { useAuth } from '../../Context/AuthContext';
function Project() {
    const { logOut, user } = useAuth();
    return (
      <>
        <HNavbar />
        <div className="flex absolute top-[100px] left-0 right-0 bottom-0">
          <VNavbar option="Project" />
          <Content />
        </div>
      </>
    );
}

export default Project
