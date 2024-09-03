import React from "react";
import { useIntern } from "../../Context/ProjectContext";

function Bar() {
  const {setOpenModel}=useIntern();
  const handleAdd = () => {setOpenModel((prev)=>!prev)};
  return (
    <div className="flex w-full justify-center items-center pl-4 mt-2">
      <div className="text-2xl p-2 font-semibold">Projects</div>
      <button
        onClick={handleAdd}
        className="bg-purple-600 pl-4 h-fit ml-auto mr-10 text-white py-2 px-4 rounded-lg border-none hover:bg-purple-800"
      >
        Add Project
      </button>
    </div>
  );
}

export default Bar;
