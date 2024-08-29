import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useIntern } from "../../Context/InternContext";

function ShowData() {
  const { user } = useAuth();
  const {interns,setInterns}=useIntern();
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // Reference to the user's internships subcollection
          const userDocRef = doc(db, "internship", user.uid);
          const internshipsCollectionRef = collection(
            userDocRef,
            "internships"
          );

          // Fetch all documents in the internships subcollection
          const querySnapshot = await getDocs(internshipsCollectionRef);

          // Map through the documents and set the interns state
          const internshipsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(internshipsList)
          setInterns(internshipsList);
        } catch (err) {
          console.error("Error fetching internships: ", err);
        }
      }
    };

    fetchData();
  }, []);
  return (
    <div className="m-4 mt-4 h-[85%] border rounded-lg p-10 bg-white overflow-scroll overflow-x-hidden">
      <div className=" border-2 border-gray-200 rounded-lg mt-4 p-2">
        Hellow
      </div>
      <div className=" border-2 border-gray-200 rounded-lg mt-4 p-2">
        Hellow
      </div>
      {user && interns?.length > 0 ? (
        interns.map((intern) => (
          <div key={intern.id} className="border-2 border-gray-200 rounded-lg mt-4 p-2">
            <h2 className="text-xl font-semibold">{intern.designation}</h2>
            <p><strong>Organisation:</strong> {intern.organisation}</p>
            <p><strong>Internship Type:</strong> {intern.internshipType}</p>
            <p><strong>From:</strong> {intern.fromDate}</p>
            <p><strong>To:</strong> {intern.toDate}</p>
            <p><strong>Industry Sector:</strong> {intern.industrySector}</p>
            <p><strong>Company:</strong> {intern.company}</p>
            <p><strong>Phone:</strong> {intern.phone}</p>
          </div>
        ))
      ) : (
        <p>No internships found.</p>
      )}
    </div>
  );
}

export default ShowData;
