
import React from "react";
import { useAuth } from "../../Context/AuthContext";
import VNavbar from "../../Components/VNavbar";
import HNavbar from "../../Components/HNavbar";
import Content from "./Content";
import { InternProvider } from "../../Context/PublicationContext";

function Publication() {
  const { logOut, user } = useAuth();
  return (
    <>
      <HNavbar />
      <div className="flex absolute top-[100px] left-0 right-0 bottom-0 bg-gray-200 ">
        <VNavbar option="Publication"/>
        <InternProvider>
          <Content />
        </InternProvider>
      </div>
    </>
  );
}

export default Publication;
