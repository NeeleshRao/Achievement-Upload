import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { db } from "../../firebase";
import { addDoc, doc, collection } from "firebase/firestore";
import { useIntern } from "../../Context/ProjectContext";

function Model() {
  const { setOpenModel, setInterns } = useIntern();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    ProjectTitle: "",
    ProjectLink: "",
    MentorName: "",
    fromDate: "",
    toDate: "",
    TeamSize: "",
    Description: "",
    Organization: "",
  });

  const [skills, setSkills] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() === "") return;
    setSkills((prev) => [...prev, skillInput]);
    setSkillInput(""); // Clear the input field after adding
  };

  const handleRemoveSkill = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to submit the form.");
      return;
    }

    try {
      // Create a reference to the user's document in the "internship" collection
      const userDocRef = doc(db, "project", user.uid);
      // Create a subcollection for the internships under the user's document
      const internshipsCollectionRef = collection(userDocRef, "projects");
      // Add a new document to the "internships" subcollection with the formData and skills
      const newDocRef = await addDoc(internshipsCollectionRef, {
        ...formData,
        skills,
      });

      // Update the local interns state with the new internship data
      setInterns((prevInterns) => [
        ...prevInterns,
        { id: newDocRef.id, ...formData, skills },
      ]);

      alert("Project added successfully!");

      // Close the modal after successful submission
      setOpenModel((prev) => !prev);
    } catch (err) {
      console.error("Error adding document: ", err);
      alert("Failed to add Project. Please try again.");
    }
  };

  const handleClose = () => setOpenModel((prev) => !prev);

  const [skillInput, setSkillInput] = useState("");

  return (
    <div className="absolute bg-white z-20 rounded-lg h-[85%] w-2/3 p-10 text-3xl top-0">
      <h1>Add Project</h1>

      <form onSubmit={handleSubmit} className="relative grid-cols-2 mx-auto mt-3">
        <div className="flex-wrap overflow-x-hidden overflow-scroll h-[50vh] mr-3">
          
          <div className="relative z-0 w-full mb-5 mt-2 group">
            <input
              type="text"
              name="ProjectTitle"
              id="projecttitle"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.ProjectTitle}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="projecttitle"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Project Title
            </label>
          </div>
         
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="ProjectLink"
              id="projectlink"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.ProjectLink}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="projectlink"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Project Link
            </label>
          </div>
          
          <div className="grid md:grid-cols-3 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="teamSize"
                className="block mb-2 text-sm text-gray-900 dark:text-white"
              >
                Team Size
              </label>
              <select
                id="teamSize"
                name="TeamSize"
                value={formData.TeamSize}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="fromDate"
                className="block mb-2 text-sm text-gray-900 dark:text-white"
              >
                From Date
              </label>
              <input
                id="fromDate"
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="From date"
              />
            </div>
            
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="toDate"
                className="block mb-2 text-sm text-gray-900 dark:text-white"
              >
                To Date
              </label>
              <input
                id="toDate"
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="To date"
              />
            </div>
          </div>
          
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="MentorName"
              id="MentorName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.MentorName}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="MentorName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mentor Name
            </label>
          </div>
          
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="Organization"
              id="Organization"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.Organization}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="Organization"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Organization
            </label>
          </div>
          
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              name="Description"
              id="Description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-200 rounded-lg dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-2"
              placeholder=" "
              value={formData.Description}
              onChange={handleChange}
              required
            ></textarea>
            <label
              htmlFor="Description"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 left-2 z-10 origin-[0] peer-focus:left-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
          </div>

          
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="SkillInput"
              className="block mb-2 text-sm text-gray-900 dark:text-white"
            >
              Key Skills
            </label>
            <div className="flex items-center mb-3">
              <input
                type="text"
                id="SkillInput"
                value={skillInput}
                onChange={handleSkillInputChange}
                className="border border-gray-300 text-sm rounded-lg p-2 w-full mr-2"
                placeholder="Enter skill"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-sm text-gray-800 py-1 px-3 rounded-lg inline-flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="text-red-500 ml-2"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
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
