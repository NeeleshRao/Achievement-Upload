import React from "react";
import HNavbar from "../../Components/HNavbar";
import VNavbar from "../../Components/VNavbar";
import Content from "./Content";
import ShowAllInternships from "./ShowAllInternships";

function Profile() {
  return (
    <>
      {/* <HNavbar />
      <div className="flex absolute top-[100px] left-0 right-0 bottom-0 bg-gray-200">
        <VNavbar />
        <Content />
      </div> */}
      <ShowAllInternships/>
    </>
  );
}

export default Profile;
