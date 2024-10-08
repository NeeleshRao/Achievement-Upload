import React from "react";
import VNavbar from "../../Components/VNavbar";
import HNavbar from "../../Components/HNavbar";
import Content from "./Content";

function Profile() {
  return (
    <>
      <HNavbar />
      <div className="flex absolute top-[100px] left-0 right-0 bottom-0 bg-gray-200">
        <VNavbar />
        <Content />
      </div>
    </>
  );
}

export default Profile;
