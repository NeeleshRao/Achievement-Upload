import React from "react";
import Model from "./Model";

function Outlay({handleOpenModel}) {
  return (
    <>
      <div className="absolute -top-[100px] bottom-0 right-0 left-0 bg-gray-700 opacity-50 z-10"></div>
      <Model handleOpenModel={handleOpenModel}/>
    </>
  );
}

export default Outlay;
