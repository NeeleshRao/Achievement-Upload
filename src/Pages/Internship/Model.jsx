import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { db } from "../../firebase";
import { addDoc, doc, collection } from "firebase/firestore";
import { useIntern } from "../../Context/InternContext";

function Model() {
  const { setOpenModel, setInterns } = useIntern();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    designation: "",
    organisation: "",
    internshipType: "",
    fromDate: "",
    toDate: "",
    industry: "",
    phone: "",
    company: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.log(user);
      alert("You must be logged in to submit the form.");
      return;
    }

    try {
      // Create a reference to the user's document in the "internship" collection
      const userDocRef = doc(db, "internship", user.uid);
      // Create a subcollection for the internships under the user's document
      const internshipsCollectionRef = collection(userDocRef, "internships");
      // Add a new document to the "internships" subcollection with the formData
      const newDocRef = await addDoc(internshipsCollectionRef, formData);

      // Update the local interns state with the new internship data
      setInterns((prevInterns) => [
        ...prevInterns,
        { id: newDocRef.id, ...formData },
      ]);

      console.log(formData);
      alert("Internship added successfully!");

      // Close the modal after successful submission
      setOpenModel((prev) => !prev);
    } catch (err) {
      console.error("Error adding document: ", err);
      alert("Failed to add internship. Please try again.");
    }
  };

  const handleClose = () => setOpenModel((prev) => !prev);
  return (
    <div className="absolute bg-white z-20 rounded-lg  h-[85%] w-2/3 p-10 text-3xl top-0">
      <h1>Add Internship</h1>

      <form
        onSubmit={handleSubmit}
        className="relative grid-cols-2 mx-auto mt-3"
      >
        <div className="flex-wrap overflow-x-hidden overflow-scroll h-[50vh] mr-3">
          {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt nemo, possimus, doloremque reprehenderit cupiditate quae voluptatem, minima voluptates alias culpa provident? Porro beatae, atque ratione ipsam delectus, perferendis obcaecati optio velit odio culpa cum ipsa, esse id! Nisi ad in vero aliquid, obcaecati officiis alias fugiat! Fuga incidunt est quae, ducimus laboriosam molestias nemo! */}
          <div className="relative z-0 w-full mb-5 mt-2 group">
            <input
              type="text_designation"
              name="designation"
              id="designation"
              // autoComplete="off"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.designation}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="floating_text_designation"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Designation
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="organisation"
              id="organisation"
              // autoComplete="off"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.organisation}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="floating_organisation"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Organisation
            </label>
          </div>
          <div className="grid md:grid-cols-3 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm text-gray-900 dark:text-white"
              >
                Internship Type
              </label>
              <select
                id="countries"
                // autoComplete="off"
                name="internshipType"
                value={formData.internshipType}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm text-gray-900 dark:text-white"
              >
                From Date
              </label>
              <input
                id="default-datepicker"
                // autoComplete="off"
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="From date"
              />
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm text-gray-900 dark:text-white"
              >
                To Date
              </label>
              <input
                id="default-datepicker"
                type="date"
                // autoComplete="off"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="From date"
              />
            </div>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="industry"
              id="industry"
              // autoComplete="off"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.industry}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="floating_repeat_industry"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Industry Sector
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                pattern="[0-9]{10}"
                name="phone"
                id="phone"
                // autoComplete="off"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="company"
                id="company"
                // autoComplete="off"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.company}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Company (Ex. Google)
              </label>
            </div>
          </div>
        </div>
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
