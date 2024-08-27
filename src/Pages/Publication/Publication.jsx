import React from "react";
import { useAuth } from "../../Context/AuthContext";
import HNavbar from "../../Components/HNavbar";
import VNavbar from "../../Components/VNavbar";
import Content from "./Content";

export default function Publication() {
  const { logOut, user } = useAuth();
  return (
    <>
      <HNavbar />
      <div className="flex absolute top-[100px] left-0 right-0 bottom-0">
        <VNavbar option="Publication" />
        <Content/>
      </div>
    </>
  );
}
