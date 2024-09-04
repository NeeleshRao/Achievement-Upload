import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { db } from "../../firebase";
import { addDoc, doc, collection } from "firebase/firestore";
import { useIntern } from "../../Context/SportsContext";
import { ref } from "firebase/storage";
import { storage } from "../../firebase";
import { uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

function Model() {
  const { setOpenModel, setInterns } = useIntern();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    SportName: "",
    CoachName: "",
    LevelOfCompetition: "",
    DateTournament: "",
    TournamentName: "",
    Location: "",
    Award:""
  });

  const [skills, setSkills] = useState([]);
  const [certificate, setCertificate] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setCertificate(e.target.files[0]);
    }
  };


  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  

  const handleSubmit = async (e) => {
    e.preventDefault();



    if (!user) {
      alert("You must be logged in to submit the form.");
      return;
    }

    try {

      let certificateURL = "";

  if (certificate) {
    const storageRef = ref(storage, `sports/${user.uid}/${certificate.name}`);
    const uploadTask = uploadBytesResumable(storageRef, certificate);

    try {
      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              certificateURL = downloadURL;
              resolve();
              console.log(certificateURL);
              
            });
          }
        );
      });
      setInterns((prevInterns) => [
        ...prevInterns,
        { UploadLink: certificateURL,...formData},
      ]);
    } catch (err) {
      console.error("Error uploading certificate: ", err);
      alert("Failed to upload the certificate. Please try again.");
      return;
    }
    alert("success");
  }
      // Create a reference to the user's document in the "internship" collection
      const userDocRef = doc(db, "sport", user.uid);
      // Create a subcollection for the internships under the user's document
      const internshipsCollectionRef = collection(userDocRef, "sports");
      // Add a new document to the "internships" subcollection with the formData and skills
      const newDocRef = await addDoc(internshipsCollectionRef, {
        ...formData , UploadLink: certificateURL
      });

      

      // Update the local interns state with the new internship data
      

      // Close the modal after successful submission
      setOpenModel((prev) => !prev);
    } catch (err) {
      console.error("Error adding document: ", err);
      alert("Failed to add Sports. Please try again.");
    }
  };

  const handleClose = () => setOpenModel((prev) => !prev);

  const [skillInput, setSkillInput] = useState("");

  return (
    <div className="absolute bg-white z-20 rounded-lg h-[85%] w-2/3 p-10 text-3xl top-0">
      <h1>Add Sport</h1>

      <form onSubmit={handleSubmit} className="relative grid-cols-2 mx-auto mt-3">
        <div className="flex-wrap overflow-x-hidden overflow-scroll h-[50vh] mr-3">
          
          <div className="relative z-0 w-full mb-5 mt-2 group">
            <input
              type="text"
              name="SportName"
              id="projecttitle"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.SportName}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="projecttitle"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Sport Name
            </label>
          </div>
        
          
          <div className="grid md:grid-cols-3 md:gap-6">

            <div className="relative z-0 w-full group mt-auto mb-auto">
            <input
              type="text"
              name="CoachName"
              id="CoachName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.CoachName}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="CoachName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Coach Name
            </label>
          </div>
            
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="Date"
                className="block mb-2 text-sm text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                id="Date"
                type="date"
                name="Date"
                value={formData.Date}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="From date"
              />
            </div>


            <div className="relative z-0 w-full mt-auto mb-auto group">
            <input
              type="text"
              name="Location"
              id="Location"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.Location}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="Location"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Location
            </label>
          </div>
            
          </div>
          
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="LevelOfCompetition"
              id="LevelOfCompetition"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.LevelOfCompetition}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="LevelOfCompetition"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Level Of Competition (eg: District , State , National)
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="TournamentName"
              id="TournamentName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.TournamentName}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="TournamentName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tournament Name
            </label>
          </div>


          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="Award"
              id="Award"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.Award}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="Award"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Award
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="certificate" className="block mb-2 text-sm text-gray-900 dark:text-white">
              Certificate (PDF or PNG)
            </label>
            <input
              type="file"
              id="certificate"
              accept=".pdf,.png"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300  cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>

          
        </div>
        {/* Submit and Cancel Buttons */}
        <button
          onClick={handleClose}
          className="border border-gray-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center m-4 ml-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-4 ml-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Model;
