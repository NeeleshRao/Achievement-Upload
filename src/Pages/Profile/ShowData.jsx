import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../../Context/AuthContext";
import { db } from "../../firebase";

function ShowData() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    USN: "",
    Course: "",
    PrimarySpecialization: "",
    Gender: "",
    DOB: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        try {
          const profileDocRef = doc(db, "profile", user.uid);
          const profileSnapshot = await getDoc(profileDocRef);

          if (profileSnapshot.exists()) {
            setFormData(profileSnapshot.data());
          } else {
            console.log("No profile data found, please enter your details.");
          }
        } catch (error) {
          console.error("Error fetching profile: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfileData();
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const profileDocRef = doc(db, "profile", user.uid);
        await setDoc(profileDocRef, {
          name: user.displayName,
          ...formData,
        });
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile: ", error);
        alert("Failed to update profile.");
      }
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="m-4 mt-0 h-[85%] border rounded-lg p-10 bg-white overflow-scroll overflow-x-hidden shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="relative grid-cols-2 mx-auto mt-3"
      >
        <div className="flex-wrap overflow-x-hidden overflow-scroll h-[50vh] mr-3">
          {/* Display Name */}
          <div className="relative z-0 w-full mb-5 mt-2 group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={user.displayName}
              readOnly
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>

          {/* USN Field */}
          <div className="relative z-0 w-full mb-5 mt-2 group">
            <input
              type="text"
              name="USN"
              id="USN"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={formData.USN}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="USN"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              USN (Roll No)
            </label>
          </div>

          {/* Course Field */}
          <div className="relative z-0 w-full mb-5 mt-2 group">
            <input
              type="text"
              name="Course"
              id="Course"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={formData.Course}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="Course"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Course
            </label>
          </div>

          {/* Primary Specialization Field */}
          <div className="relative z-0 w-full mb-5 mt-2 group">
            <input
              type="text"
              name="PrimarySpecialization"
              id="PrimarySpecialization"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={formData.PrimarySpecialization}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="PrimarySpecialization"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Primary Specialization
            </label>
          </div>

          {/* Gender Field */}
          <div className="relative z-0 w-full mb-5 mt-2 group">
            <input
              type="text"
              name="Gender"
              id="Gender"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={formData.Gender}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="Gender"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Gender
            </label>
          </div>

          {/* DOB Field */}
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="DOB"
              className="block mb-2 text-sm text-gray-900 dark:text-white"
            >
              Date of Birth
            </label>
            <input
              id="DOB"
              name="DOB"
              type="date"
              value={formData.DOB}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="DOB"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default ShowData;
