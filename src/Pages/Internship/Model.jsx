import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { db, storage } from "../../firebase";
import { addDoc, doc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
    certificate: null, // Added state for file upload
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "certificate") {
      setFormData((prev) => ({
        ...prev,
        certificate: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to submit the form.");
      return;
    }

    try {
      // Upload certificate if it exists
      let certificateUrl = "";
      if (formData.certificate) {
        const fileRef = ref(storage, `internships/${user.uid}/${formData.certificate.name}`);
        await uploadBytes(fileRef, formData.certificate);
        certificateUrl = await getDownloadURL(fileRef);
      }

      // Prepare form data with certificate URL
      const formDataWithCertificate = {
        ...formData,
        certificate: certificateUrl,
      };

      // Create a reference to the user's document in the "internship" collection
      const userDocRef = doc(db, "internship", user.uid);
      // Create a subcollection for the internships under the user's document
      const internshipsCollectionRef = collection(userDocRef, "internships");
      // Add a new document to the "internships" subcollection with the formData
      const newDocRef = await addDoc(internshipsCollectionRef, formDataWithCertificate);

      // Update the local interns state with the new internship data
      setInterns((prevInterns) => [
        ...prevInterns,
        { id: newDocRef.id, ...formDataWithCertificate },
      ]);

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
    <div className="absolute bg-white z-20 rounded-lg h-[85%] w-2/3 p-10 text-3xl top-0">
      <h1>Add Internship</h1>

      <form onSubmit={handleSubmit} className="relative grid-cols-2 mx-auto mt-3">
        <div className="flex-wrap overflow-x-hidden overflow-scroll h-[50vh] mr-3">
          {/* Existing input fields */}
          <div className="relative z-0 w-full mb-5 mt-2 group">
            <input
              type="text"
              name="designation"
              id="designation"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.designation}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="designation"
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.organisation}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="organisation"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Organisation
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="internshipType"
              id="internshipType"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.internshipType}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="internshipType"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Internship Type
            </label>
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

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="industry"
              id="industry"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.industry}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="industry"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Industry
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="company"
              id="company"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.company}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="company"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Company
            </label>
          </div>

          {/* Certificate Upload */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="file"
              name="certificate"
              id="certificate"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleChange}
              accept=".pdf, .doc, .docx, .jpg, .jpeg, .png" // Adjust accepted file types as needed
            />
            <label
              htmlFor="certificate"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Upload Certificate
            </label>
          </div>
        </div>

        <div className="flex gap-4 mt-3">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default Model;
