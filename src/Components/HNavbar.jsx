import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

function HNavbar() {
  const { user, logOut } = useAuth();
  const [drop,setDrop]=useState(false);
  const handleLogout=async()=>{
    try{
      await logOut();
    }catch(err){
      console.log(err)
    }
}
  return (
    <div>
      <nav className="flex items-center mt-5 pl-5 pr-5 shadow-md">
        <img src="/RVCE.jpeg" className="h-[70px] mr-10 mb-1 mt-1" />
        <h1 className="font-semibold text-[1.1rem]">R. V. College Of Engineering</h1>

        <div className="relative inline-block text-left ml-auto">
          <div>
            <button
            onClick={()=>{setDrop((prev)=>!prev);console.log("click")}}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              {user.photoURL && (
                <img
                  src={user?.photoURL}
                  className="w-8 rounded-full ml-auto outline-none focus:outline-none"
                ></img>
              )}
              <h1 className="mt-auto mb-auto text-[1.1rem]">{user?.displayName}</h1>

              <svg
                className="-mr-1 h-5 w-5 text-gray-400 mt-auto mb-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {drop && <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div className="py-1" role="none">
              <a
                href="#"
                className="block px-4 py-2 text-sm font-semibold text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="menu-item-0"
              >
                Profile
              </a>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="menu-item-3"
              >
                Sign out
              </button>
            </div>
          </div>}
        </div>
      </nav>
    </div>
  );
}

export default HNavbar;
