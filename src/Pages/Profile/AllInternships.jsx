import React, { useEffect, useState } from "react";
import { collection, doc, getDocs,collectionGroup,getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Import your Firebase configuration here
import { useAuth } from "../../Context/AuthContext";

function AllInternships() {
  const [internships, setInternships] = useState([]);
  const {user}=useAuth();
  useEffect(() => {
    const fetchAllInternships = async () => {
        try {
          const internshipCollectionRef = doc(db, "internship",user.uid);
          const internshipsCollectionRef = collection(
            db,"internship"
          );
          // Retrieve all documents from the internships subcollection
          const querySnapshot = await getDocs(internshipsCollectionRef);
          
          console.log(querySnapshot.docs)
          // Iterate through the documents and extract formData
          // querySnapshot.forEach((doc) => {
          //   const formData = doc.data().internships; // Assuming 'internships' is the field containing formData
          //   console.log(formData);
          // });
        } catch (err) {
            console.log("Error fetching all internships: ", err);
        }
    };

    fetchAllInternships();
}, []);

  return (
    <div className="m-4 mt-4 h-[85%] border rounded-lg p-10 bg-white overflow-scroll overflow-x-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student UID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Designation
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Organization
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duration
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {internships.map((internship, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{internship.uid}</td>
              <td className="px-6 py-4 whitespace-nowrap">{internship.designation}</td>
              <td className="px-6 py-4 whitespace-nowrap">{internship.organisation}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {internship.fromDate} to {internship.toDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllInternships;