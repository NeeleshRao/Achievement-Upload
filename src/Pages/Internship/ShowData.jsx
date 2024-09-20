import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useIntern } from "../../Context/InternContext";

function ShowData() {
  const { user } = useAuth();
  const { interns, setInterns } = useIntern();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // Reference to the user's internships subcollection
          const userDocRef = doc(db, "internship", user.uid);
          const internshipsCollectionRef = collection(userDocRef, "internships");

          // Fetch all documents in the internships subcollection
          const querySnapshot = await getDocs(internshipsCollectionRef);

          // Map through the documents and set the interns state
          const internshipsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setInterns(internshipsList);
        } catch (err) {
          console.error("Error fetching internships: ", err);
        }
      }
    };

    fetchData();
  }, [user, setInterns]);

  return (
    <div className="m-4 mt-4 h-[85%] border rounded-lg p-10 bg-white overflow-scroll overflow-x-hidden shadow-lg">
      <div className=" border-2 border-gray-200 rounded-lg mt-4 p-2">
        <h1 className="font-bold">Internships</h1>
      </div>
      {user && interns?.length > 0 ? (
        interns.map((intern) => (
          <div key={intern.id} className="border-2 border-gray-200 rounded-lg mt-4 p-4 bg-white shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-purple-600">{intern.designation}</h2>
            <p className="text-gray-600 mb-1"><strong className="font-bold">Organisation:</strong> {intern.organisation}</p>
            <p className="text-gray-600 mb-1"><strong className="font-bold">Internship Type:</strong> {intern.internshipType}</p>
            <p className="text-gray-600 mb-1"><strong className="font-bold">From:</strong> {intern.fromDate}</p>
            <p className="text-gray-600 mb-1"><strong className="font-bold">To:</strong> {intern.toDate}</p>
            <p className="text-gray-600 mb-1"><strong className="font-bold">Industry Sector:</strong> {intern.industry}</p>
            <p className="text-gray-600 mb-1"><strong className="font-bold">Company:</strong> {intern.company}</p>
            <p className="text-gray-600 mb-1"><strong className="font-bold">Phone:</strong> {intern.phone}</p>
            {intern.certificate && (
              <p className="text-gray-600 mt-2"><strong className="font-bold">Certificate:</strong> <a href={intern.certificate} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Certificate</a></p>
            )}
          </div>
        ))
      ) : (
        <p>No internships found.</p>
      )}
    </div>
  );
}

export default ShowData;
