import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

function Navbar({option}) {
  const { user, logOut } = useAuth();
  // const [option,setOption]=useState("Internship")
  return (
    <>
    <div className="flex overflow-hidden bg-white">
    <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r border-gray-200">
                <div className="flex flex-col items-center flex-shrink-0 px-4">
                    <button className="hidden rounded-lg focus:outline-none focus:shadow-outline">
                        <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col flex-grow px-4 mt-5">
                    <nav className="flex-1 space-y-1 bg-white">
                        <ul>
                            <li>
                                <Link to={"/internship"} className={option==="Internship"?"inline-flex items-center w-full px-4 py-2 mt-1 text-base text-slate-200 transition duration-100 ease-in-out transform rounded-lg bg-purple-500 focus:shadow-outline":"inline-flex items-center w-full px-4 py-2 mt-1 text-base text-gray-900 transition duration-100 ease-in-out transform rounded-lg hover:bg-gray-50 focus:shadow-outline"} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                    </svg>
                                    <span className="ml-4"> Internship</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/project"} className={option==="Project"?"inline-flex items-center w-full px-4 py-2 mt-1 text-base text-slate-200 transition duration-100 ease-in-out transform rounded-lg bg-purple-500 focus:shadow-outline":"inline-flex items-center w-full px-4 py-2 mt-1 text-base text-gray-900 transition duration-100 ease-in-out transform rounded-lg hover:bg-gray-50 focus:shadow-outline"} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                    </svg>
                                    <span className="ml-4">Project</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/publication"} className={option==="Publication"?"inline-flex items-center w-full px-4 py-2 mt-1 text-base text-slate-200 transition duration-100 ease-in-out transform rounded-lg bg-purple-500 focus:shadow-outline":"inline-flex items-center w-full px-4 py-2 mt-1 text-base text-gray-900 transition duration-100 ease-in-out transform rounded-lg hover:bg-gray-50 focus:shadow-outline"} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    <span className="ml-4">Publication</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/sports"} className={option==="Sports"?"inline-flex items-center w-full px-4 py-2 mt-1 text-base text-slate-200 transition duration-100 ease-in-out transform rounded-lg bg-purple-500 focus:shadow-outline":"inline-flex items-center w-full px-4 py-2 mt-1 text-base text-gray-900 transition duration-100 ease-in-out transform rounded-lg hover:bg-gray-50 focus:shadow-outline"} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <span className="ml-4">Sports</span></Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  );
}

export default Navbar;
