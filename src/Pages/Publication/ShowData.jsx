import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useIntern } from "../../Context/PublicationContext";

function ShowData() {
  const { user } = useAuth();
  const { interns, setInterns } = useIntern();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // Reference to the user's projects subcollection
          const userDocRef = doc(db, "publication", user.uid);
          const projectsCollectionRef = collection(userDocRef, "publications");

          // Fetch all documents in the projects subcollection
          const querySnapshot = await getDocs(projectsCollectionRef);

          // Map through the documents and set the interns state
          const projectsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(projectsList);
          setInterns(projectsList);
        } catch (err) {
          console.error("Error fetching publications: ", err);
        }
      }
    };

    fetchData();
  }, [user, setInterns]);

  return (
    <div className="m-4 mt-4 h-[85%] border rounded-lg p-10 bg-white overflow-scroll overflow-x-hidden shadow-lg">
      {user && interns?.length > 0 ? (
        interns.map((intern) => (
          <div key={intern.id} className="border-2 border-gray-200 rounded-lg mt-4 p-4 bg-white shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-purple-600">{intern.PublicationName}</h2>
            <p className="text-gray-600 mb-1">
              <strong className="font-bold">Project Link:</strong> <a href={intern.PublicationLink} target="_blank" rel="noopener noreferrer">{intern.ProjectLink}</a>
            </p>
            <p className="text-gray-600 mb-1">
              <strong className="font-bold">Mentor Name:</strong> {intern.MentorName}
            </p>
            <p className="text-gray-600 mb-1">
              <strong className="font-bold">Date:</strong> {intern.Date}
            </p>
            <p className="text-gray-600 mb-1">
              <strong className="font-bold">Description:</strong> {intern.Description}
            </p>
            <p className="text-gray-600 mb-1">
              <strong className="font-bold">No.of authors:</strong> {intern.TeamSize}
            </p>
            <div className="text-gray-600 mb-1">
              <strong className="font-bold">Skills:</strong>
              <div className="flex flex-wrap mt-2">
                {intern.skills && intern.skills.length > 0 ? (
                  intern.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-400 bg-gray-100"
                    >
                      {skill} <button className="text-red-600 ml-1">×</button>
                    </span>
                  ))
                ) : (
                  <span className="text-gray-600">No skills added.</span>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No publications found.</p>
      )}
    </div>
  );
}

export default ShowData;
