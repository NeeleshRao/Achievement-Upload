import React from "react";

function Bar({handleOpenModel}) {
  const handleAdd = () => {handleOpenModel((prev)=>!prev)};
  return (
    <div className="flex w-full justify-center items-center">
      <div className="text-2xl p-2">Internship</div>
      <button
        onClick={handleAdd}
        className="bg-purple-600 pl-4 h-fit ml-auto mr-10 text-white py-2 px-4 rounded-lg border-none hover:bg-purple-800"
      >
        Add Internship
      </button>
    </div>
  );
}

export default Bar;
