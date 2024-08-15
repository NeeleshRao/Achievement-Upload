import React, { useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { googleLogin, user } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await googleLogin();
      console.log("Success");
    } catch (err) {
      console.log("hello", err);
    }
  };

  useEffect(() => {
    console.log(user);
    // if (user != null) navigate("/home");
    if (user != null) navigate("/internship");
  }, [user]);

  return (
    <div>
      <button
        onClick={handleLogin}
        className="px-5 py-4 text-center font-semibold text-1xl text-white transition duration-500 ease-in-out transform bg-blue-600 lg:px-10  hover:bg-blue-700 focus:outline-none min-w-80"
      >
        Log in
      </button>
    </div>
  );
}
