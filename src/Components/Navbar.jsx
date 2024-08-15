import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logOut } = useAuth();
  const [option,setOption]=useState("Internship")
  return (
    <>
      <div className="flex overflow-hidden rounded-lg absolute bottom-1 top-10 border-black border-x-4">
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r border-gray-50">
              <div className="flex flex-col flex-grow px-4 mt-5">
                <nav className="flex-1 space-y-1 bg-white">
                  <p className="px-4 pt-4 font-medium text-gray-900 uppercase">
                    Shortcuts
                  </p>
                  <ul>
                    <li>
                      <Link
                        className={ (option==="Internship") ? "text-white inline-flex items-center w-full px-4 py-2 mt-1 text-base transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline bg-purple-600"  :"inline-flex items-center w-full px-4 py-2 mt-1 text-base text-gray-900 transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100"}
                        white=""
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          ></path>
                        </svg>
                        <span className="ml-4"> Internship</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-base text-gray-900 transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100"
                        white=""
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path>
                        </svg>
                        <span className="ml-4"> Reports</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-base text-gray-900 transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100"
                        white=""
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                          ></path>
                        </svg>
                        <span className="ml-4"> Dashboard</span>
                      </Link>
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
