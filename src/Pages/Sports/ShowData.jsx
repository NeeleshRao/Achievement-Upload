import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useIntern } from "../../Context/SportsContext";

function ShowData() {
  const { user } = useAuth();
  const { interns, setInterns } = useIntern();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // Reference to the user's projects subcollection
          const userDocRef = doc(db, "sport", user.uid);
          const projectsCollectionRef = collection(userDocRef, "sports");

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
          console.error("Error fetching sports: ", err);
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-purple-600">{intern.SportName}</h2>
            <p className="text-gray-600 mb-1">
              <strong className="font-bold">Coach Name:</strong> {intern.CoachName}
            </p>
            <p className="text-gray-600 mb-1">
              <strong className="font-bold">Date:</strong> {intern.Date}
            </p>
            <p className="text-gray-600 mb-1">
              <strong className="font-bold">Location:</strong> {intern.Location}
            </p>
            <p className="text-gray-600 mb-1">
              <strong className="font-bold">Level of Competition:</strong> {intern.LevelOfCompetition}
            </p>
            <p className="text-gray-600 mb-1">
              <strong className="font-bold">Tournament Name:</strong> {intern.TournamentName}
            </p>
            {intern.UploadLink && (
              <p className="text-gray-600 mb-1">
                <strong className="font-bold">Certificate:</strong>{" "}
                <a href={intern.UploadLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View Certificate
                </a>
              </p>
            )}
          </div>
        ))
      ) : (
        <p>No Sports found.</p>
      )}
    </div>
  );
}

export default ShowData;
